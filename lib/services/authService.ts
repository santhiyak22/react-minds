import api from "../axios";

export interface AuthResponse {
  success: boolean;
  message: string;
  user?: {
    id: number;
    name: string;
    email: string;
    role: string;
    is_active: boolean;
  };
  token?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupCredentials {
  name: string;
  email: string;
  password: string;
}

export const loginUser = async (
  credentials: LoginCredentials,
): Promise<AuthResponse> => {
  try {
    const response = await api.post<AuthResponse>("/auth/login", credentials);
    return response.data;
  } catch (error: any) {
    console.error("Login failed:", error.response?.data);
    throw new Error(
      error.response?.data?.message ||
        "Login failed. Please check your credentials.",
    );
  }
};

export const signupUser = async (
  credentials: SignupCredentials,
): Promise<AuthResponse> => {
  try {
    const response = await api.post<AuthResponse>("/auth/signup", credentials);
    return response.data;
  } catch (error: any) {
    console.error("Signup failed:", error.response?.data);
    throw new Error(
      error.response?.data?.message || "Signup failed. Please try again.",
    );
  }
};

export const logoutUser = async (): Promise<AuthResponse> => {
  try {
    const response = await api.post<AuthResponse>("/auth/logout");
    return response.data;
  } catch (error: any) {
    console.error("Logout failed:", error.response?.data);
    throw new Error(
      error.response?.data?.message || "Logout failed. Please try again.",
    );
  }
};
