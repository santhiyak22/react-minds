import api from "../axios";

/**
 * Enquiry Service
 * Handles all enquiry-related API calls
 * Professional standard: Clean, reusable, and well-documented
 */

export type Enquiry = {
  id: number;
  name: string;
  email: string;
  phone: string;
  service_type: string;
  message?: string;
  created_at: string;
};

export interface EnquiryResponse {
  success: boolean;
  message: string;
  data?: Enquiry | Enquiry[];
}

/**
 * Fetch all enquiries (Admin only)
 * @returns Promise containing array of enquiries
 */
export const getEnquiries = async (): Promise<Enquiry[]> => {
  try {
    const response = await api.get<EnquiryResponse>("/enquiries");

    // Handle various response formats from backend
    if (response.data?.success && Array.isArray(response.data?.data)) {
      return response.data.data;
    }

    // Fallback if API returns direct array
    if (Array.isArray(response.data)) {
      return response.data;
    }

    return [];
  } catch (error: any) {
    console.error("Failed to fetch enquiries:", error.response?.status);
    throw error;
  }
};

/**
 * Fetch a single enquiry by ID (Admin only)
 * @param enquiryId - ID of the enquiry to fetch
 * @returns Promise containing the enquiry
 */
export const getEnquiryById = async (
  enquiryId: number,
): Promise<Enquiry | null> => {
  try {
    const response = await api.get<EnquiryResponse>(`/enquiries/${enquiryId}`);
    if (response.data?.success && response.data?.data) {
      return response.data.data as Enquiry;
    }
    return null;
  } catch (error: any) {
    console.error(
      `Failed to fetch enquiry ${enquiryId}:`,
      error.response?.status,
    );
    throw error;
  }
};

/**
 * Create a new enquiry (Public)
 * @param enquiryData - Enquiry data (name, email, phone, service_type, message)
 * @returns Promise containing the created enquiry
 */
export const createEnquiry = async (enquiryData: {
  name: string;
  email: string;
  phone?: string;
  service_type: string;
  message?: string;
}): Promise<Enquiry> => {
  try {
    const response = await api.post<EnquiryResponse>("/enquiries", enquiryData);
    if (response.data?.success && response.data?.data) {
      return response.data.data as Enquiry;
    }
    throw new Error("Failed to create enquiry");
  } catch (error: any) {
    console.error("Failed to create enquiry:", error.response?.data);
    throw error;
  }
};

/**
 * Delete an enquiry (Admin only)
 * @param enquiryId - ID of the enquiry to delete
 * @returns Promise
 */
export const deleteEnquiry = async (enquiryId: number): Promise<void> => {
  try {
    await api.delete(`/enquiries/${enquiryId}`);
  } catch (error: any) {
    console.error(
      `Failed to delete enquiry ${enquiryId}:`,
      error.response?.data,
    );
    throw error;
  }
};
