import api from "../axios";

/**
 * User Service
 * Handles all user-related API calls
 * Professional standard: Clean, reusable, and well-documented
 */

export type User = {
  id: number;
  name: string;
  email: string;
  role: string;
  is_active: boolean;
  created_at: string;
};

export interface UserResponse {
  success: boolean;
  message: string;
  data?: User | User[];
}

/**
 * Fetch all users (Admin only)
 * @returns Promise containing array of users
 */
export const getUsers = async (): Promise<User[]> => {
  try {
    const response = await api.get<UserResponse>("/users");
    if (response.data?.success && Array.isArray(response.data?.data)) {
      return response.data.data;
    }
    return [];
  } catch (error: any) {
    console.error("Failed to fetch users:", error.response?.status);
    throw error;
  }
};

/**
 * Fetch a single user by ID (Admin only)
 * @param userId - ID of the user to fetch
 * @returns Promise containing the user
 */
export const getUserById = async (userId: number): Promise<User | null> => {
  try {
    const response = await api.get<UserResponse>(`/users/${userId}`);
    if (response.data?.success && response.data?.data) {
      return response.data.data as User;
    }
    return null;
  } catch (error: any) {
    console.error(`Failed to fetch user ${userId}:`, error.response?.status);
    throw error;
  }
};

/**
 * Create a new user (Admin only)
 * @param userData - User data (name, email, password)
 * @returns Promise containing the created user
 */
export const createUser = async (userData: {
  name: string;
  email: string;
  password: string;
  role?: string;
}): Promise<User> => {
  try {
    const response = await api.post<UserResponse>("/users", userData);
    if (response.data?.success && response.data?.data) {
      return response.data.data as User;
    }
    throw new Error("Failed to create user");
  } catch (error: any) {
    console.error("Failed to create user:", error.response?.data);
    throw error;
  }
};

/**
 * Update an existing user (Admin only)
 * @param userId - ID of the user to update
 * @param userData - Updated user data
 * @returns Promise containing the updated user
 */
export const updateUser = async (
  userId: number,
  userData: {
    name?: string;
    email?: string;
    password?: string;
    role?: string;
    is_active?: boolean;
  },
): Promise<void> => {
  try {
    const response = await api.put<UserResponse>(`/users/${userId}`, userData);

    // Only throw if success is explicitly false
    if (response.data?.success === false) {
      throw new Error(response.data?.message || "Failed to update user");
    }

    // ✅ Success — do nothing, return normally
    return;
  } catch (err: any) {
    // Only log real errors
    const message =
      err.response?.data?.message || // Axios error format
      err.message ||                  // generic JS error
      "Failed to update user";

    console.error(`❌ Failed to update user ${userId}:`, message);
    throw new Error(message);
  }
};



/**
 * Delete a user (Admin only)
 * @param userId - ID of the user to delete
 * @returns Promise
 */
export const deleteUser = async (userId: number): Promise<void> => {
  try {
    await api.delete(`/users/${userId}`);
  } catch (error: any) {
    console.error(`Failed to delete user ${userId}:`, error.response?.data);
    throw error;
  }
};
