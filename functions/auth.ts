import { API_PREFIX } from "@/config";
import axios, { AxiosError } from "axios";

// Custom error types
class AuthError extends Error {
  constructor(message: string, public statusCode?: number) {
    super(message);
    this.name = 'AuthError';
  }
}

class NetworkError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NetworkError';
  }
}

export const loginWithEmailAndPasswordAPI = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_PREFIX.AUTH}/login`, { email, password });
    console.log("loginWithEmailAndPasswordAPI",response.data);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      if (!error.response) {
        throw new NetworkError('Network error occurred. Please check your internet connection.');
      }
      
      const statusCode = error.response.status;
      const errorMessage = error.response.data?.message || 'Login failed';

      switch (statusCode) {
        case 400:
          throw new AuthError('Invalid email or password format', statusCode);
        case 401:
          throw new AuthError('Invalid credentials', statusCode);
        case 404:
          throw new AuthError('User not found', statusCode);
        case 429:
          throw new AuthError('Too many login attempts. Please try again later', statusCode);
        default:
          throw new AuthError(errorMessage, statusCode);
      }
    }
    throw new Error('An unexpected error occurred during login');
  }
};

export const registerWithEmailAndPasswordAPI = async (name: string, email: string, password: string) => {
  try {
    const response = await axios.post(`${API_PREFIX.AUTH}/register`, { name, email, password });
    console.log("registerWithEmailAndPasswordAPI",response.data);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      if (!error.response) {
        throw new NetworkError('Network error occurred. Please check your internet connection.');
      }
      
      const statusCode = error.response.status;
      const errorMessage = error.response.data?.message || 'Registration failed';

      switch (statusCode) {
        case 400:
          throw new AuthError('Invalid email or password format', statusCode);
        case 409:
          throw new AuthError('Email already exists', statusCode);
        case 422:
          throw new AuthError('Password does not meet requirements', statusCode);
        case 429:
          throw new AuthError('Too many registration attempts. Please try again later', statusCode);
        default:
          throw new AuthError(errorMessage, statusCode);
      }
    }
    throw new Error('An unexpected error occurred during registration');
  }
};

