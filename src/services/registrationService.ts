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


export const registrationService = {
  /**
   * Submit a new registration using Supabase
   */
  async createRegistration(data: RegistrationData): Promise<RegistrationResponse> {
    try {
      // Input validation and sanitization
      const sanitizedData = {
        firstName: data.firstName.trim().slice(0, 100),
        lastName: data.lastName.trim().slice(0, 100),
        mobileNumber: data.mobileNumber.trim().slice(0, 20),
        email: data.email.trim().toLowerCase().slice(0, 255),
        company: data.company.trim().slice(0, 200),
        position: data.position.trim().slice(0, 200),
      };
      
      const { data: result, error } = await supabase
        .from('registrations')
        .insert({
          first_name: sanitizedData.firstName,
          last_name: sanitizedData.lastName,
          mobile_number: sanitizedData.mobileNumber,
          email: sanitizedData.email,
          company: sanitizedData.company,
          position: sanitizedData.position,
        })
        .select()
        .single();

      if (error) {
        // Handle duplicate email error
        if (error.code === '23505') {
          return {
            success: false,
            error: 'Email already registered',
          };
        }
        
        // Generic error message to avoid exposing internal details
        return {
          success: false,
          error: 'Failed to submit registration. Please try again.',
        };
      }

      if (!result) {
        return {
          success: false,
          error: 'Registration submitted but no confirmation received',
        };
      }

      return {
        success: true,
        data: result,
      };
    } catch {
      return {
        success: false,
        error: 'Failed to submit registration. Please try again.',
      };
    }
  },

  /**
   * Get registration by email
   */
  async getRegistrationByEmail(email: string): Promise<RegistrationResponse> {
    try {
      // Sanitize email input
      const sanitizedEmail = email.trim().toLowerCase().slice(0, 255);
      
      const { data, error } = await supabase
        .from('registrations')
        .select('*')
        .eq('email', sanitizedEmail)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          // No rows returned
          return {
            success: false,
            error: 'Email not found. Please register first.',
          };
        }
        return {
          success: false,
          error: 'Failed to fetch registration. Please try again.',
        };
      }

      if (!data) {
        return {
          success: false,
          error: 'Email not found. Please register first.',
        };
      }

      return {
        success: true,
        data: data as Registration,
      };
    } catch {
      return {
        success: false,
        error: 'Failed to fetch registration. Please try again.',
      };
    }
  },

};

