import { api } from 'boot/axios';

export interface RegistrationData {
  firstName: string;
  lastName: string;
  mobileNumber: string;
  email: string;
  company: string;
  position: string;
}

export interface RegistrationResponse {
  success: boolean;
  data?: {
    id: number;
    first_name: string;
    last_name: string;
    mobile_number: string;
    email: string;
    company: string;
    position: string;
    created_at: string;
  };
  error?: string;
}

export const registrationService = {
  /**
   * Submit a new registration
   */
  async createRegistration(data: RegistrationData): Promise<RegistrationResponse> {
    try {
      const response = await api.post<RegistrationResponse>('/registrations', {
        firstName: data.firstName,
        lastName: data.lastName,
        mobileNumber: data.mobileNumber,
        email: data.email,
        company: data.company,
        position: data.position,
      });
      return response.data;
    } catch (error: any) {
      console.error('Registration error:', error);
      return {
        success: false,
        error: error.response?.data?.error || 'Failed to submit registration',
      };
    }
  },

  /**
   * Get all registrations (for admin purposes)
   */
  async getAllRegistrations(): Promise<RegistrationResponse> {
    try {
      const response = await api.get<RegistrationResponse>('/registrations');
      return response.data;
    } catch (error: any) {
      console.error('Fetch error:', error);
      return {
        success: false,
        error: error.response?.data?.error || 'Failed to fetch registrations',
      };
    }
  },
};

