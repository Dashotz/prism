import { supabase } from 'src/lib/supabase';

export interface RegistrationData {
  firstName: string;
  lastName: string;
  mobileNumber: string;
  email: string;
  company: string;
  position: string;
}

export interface Registration {
  id: number;
  first_name: string;
  last_name: string;
  mobile_number: string;
  email: string;
  company: string;
  position: string;
  created_at: string;
}

export interface RegistrationResponse {
  success: boolean;
  data?: Registration;
  error?: string;
}

export interface RegistrationsListResponse {
  success: boolean;
  data?: Registration[];
  error?: string;
}

export const registrationService = {
  /**
   * Submit a new registration using Supabase
   */
  async createRegistration(data: RegistrationData): Promise<RegistrationResponse> {
    try {
      console.log('Creating registration with data:', data);
      
      const { data: result, error } = await supabase
        .from('registrations')
        .insert({
          first_name: data.firstName,
          last_name: data.lastName,
          mobile_number: data.mobileNumber,
          email: data.email,
          company: data.company,
          position: data.position,
        })
        .select()
        .single();

      console.log('Supabase response - data:', result);
      console.log('Supabase response - error:', error);

      if (error) {
        console.error('Supabase error details:', {
          code: error.code,
          message: error.message,
          details: error.details,
          hint: error.hint,
        });
        
        // Handle duplicate email error
        if (error.code === '23505') {
          return {
            success: false,
            error: 'Email already registered',
          };
        }
        
        // Handle missing table error
        if (error.code === '42P01' || error.message?.includes('does not exist')) {
          return {
            success: false,
            error: 'Database table not found. Please create the "registrations" table in Supabase.',
          };
        }
        
        // Handle RLS (Row Level Security) error
        if (error.code === '42501' || error.message?.includes('permission denied')) {
          return {
            success: false,
            error: 'Permission denied. Please check your Supabase Row Level Security policies.',
          };
        }
        
        return {
          success: false,
          error: error.message || 'Failed to submit registration',
        };
      }

      if (!result) {
        console.warn('No data returned from Supabase insert');
        return {
          success: false,
          error: 'Registration submitted but no confirmation received',
        };
      }

      console.log('Registration successful:', result);
      return {
        success: true,
        data: result,
      };
    } catch (error: unknown) {
      console.error('Registration service error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to submit registration';
      return {
        success: false,
        error: errorMessage,
      };
    }
  },

  /**
   * Get registration by email
   */
  async getRegistrationByEmail(email: string): Promise<RegistrationResponse> {
    try {
      const { data, error } = await supabase
        .from('registrations')
        .select('*')
        .eq('email', email)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          // No rows returned
          return {
            success: false,
            error: 'Email not found. Please check your email address.',
          };
        }
        return {
          success: false,
          error: error.message || 'Failed to fetch registration',
        };
      }

      if (!data) {
        return {
          success: false,
          error: 'Email not found. Please check your email address.',
        };
      }

      return {
        success: true,
        data: data as Registration,
      };
    } catch (error: unknown) {
      console.error('Fetch by email error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch registration';
      return {
        success: false,
        error: errorMessage,
      };
    }
  },

  /**
   * Get all registrations (for admin purposes)
   */
  async getAllRegistrations(): Promise<RegistrationsListResponse> {
    try {
      const { data, error } = await supabase
        .from('registrations')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        return {
          success: false,
          error: error.message || 'Failed to fetch registrations',
        };
      }

      return {
        success: true,
        data: data as Registration[],
      };
    } catch (error: unknown) {
      console.error('Fetch error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch registrations';
      return {
        success: false,
        error: errorMessage,
      };
    }
  },
};

