import api from "../axios";

/**
 * Portfolio Service
 * Handles all portfolio-related API calls
 * Professional standard: Clean, reusable, and well-documented
 */

export type Portfolio = {
  id: number;
  title: string;
  category: string;
  image?: string;
  image_url?: string;
  description?: string;
  project_url?: string;
  created_at: string;
};

export interface PortfolioResponse {
  success: boolean;
  message: string;
  data?: Portfolio | Portfolio[];
}

/**
 * Fetch all portfolios (Public)
 * @returns Promise containing array of portfolios
 */
export const getPortfolios = async (): Promise<Portfolio[]> => {
  try {
    const response = await api.get<PortfolioResponse>("/portfolios");

    if (response.data?.success && Array.isArray(response.data?.data)) {
      return response.data.data;
    }

    // Fallback if API returns direct array
    if (Array.isArray(response.data)) {
      return response.data;
    }

    return [];
  } catch (error: any) {
    console.error("Failed to fetch portfolios:", error.response?.status);
    throw error;
  }
};

/**
 * Fetch a single portfolio by ID (Public)
 * @param portfolioId - ID of the portfolio to fetch
 * @returns Promise containing the portfolio
 */
export const getPortfolioById = async (
  portfolioId: number,
): Promise<Portfolio | null> => {
  try {
    const response = await api.get<PortfolioResponse>(
      `/portfolios/${portfolioId}`,
    );
    if (response.data?.success && response.data?.data) {
      return response.data.data as Portfolio;
    }
    return null;
  } catch (error: any) {
    console.error(
      `Failed to fetch portfolio ${portfolioId}:`,
      error.response?.status,
    );
    throw error;
  }
};

/**
 * Create a new portfolio with FormData (Admin only)
 * @param portfolioData - Portfolio FormData containing title, category, image
 * @returns Promise containing the created portfolio
 */
export const createPortfolio = async (
  portfolioData: FormData,
): Promise<Portfolio> => {
  try {
    const response = await api.post<PortfolioResponse>(
      "/portfolios",
      portfolioData,
    );
    if (response.data?.success && response.data?.data) {
      return response.data.data as Portfolio;
    }
    throw new Error("Failed to create portfolio");
  } catch (error: any) {
    console.error("Failed to create portfolio:", error.response?.data);
    throw error;
  }
};

/**
 * Update a portfolio with FormData (Admin only)
 * @param portfolioId - ID of the portfolio to update
 * @param portfolioData - Updated portfolio FormData
 * @returns Promise containing the updated portfolio
 */
export const updatePortfolio = async (
  portfolioId: number,
  portfolioData: FormData,
): Promise<Portfolio> => {
  try {
    const response = await api.put<PortfolioResponse>(
      `/portfolios/${portfolioId}`,
      portfolioData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    if (response.data?.success && response.data?.data) {
      return response.data.data as Portfolio;
    }
    throw new Error("Failed to update portfolio");
  } catch (error: any) {
    console.error(
      `Failed to update portfolio ${portfolioId}:`,
      error.response?.data,
    );
    throw error;
  }
};

/**
 * Delete a portfolio (Admin only)
 * @param portfolioId - ID of the portfolio to delete
 * @returns Promise
 */
export const deletePortfolio = async (portfolioId: number): Promise<void> => {
  try {
    await api.delete(`/portfolios/${portfolioId}`);
  } catch (error: any) {
    console.error(
      `Failed to delete portfolio ${portfolioId}:`,
      error.response?.data,
    );
    throw error;
  }
};
