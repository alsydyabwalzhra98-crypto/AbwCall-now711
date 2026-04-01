import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { User } from '../types/auth';

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateBalance: (newBalance: number) => void;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_USER'; payload: { user: User; token: string } }
  | { type: 'SET_ERROR'; payload: string }
  | { type: 'CLEAR_ERROR' }
  | { type: 'LOGOUT' }
  | { type: 'UPDATE_BALANCE'; payload: number };

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_USER':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        loading: false,
        error: null,
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        token: null,
        loading: false,
        error: null,
      };
    case 'UPDATE_BALANCE':
      return {
        ...state,
        user: state.user ? { ...state.user, balance: action.payload } : null,
      };
    default:
      return state;
  }
};

const initialState: AuthState = {
  user: null,
  token: null,
  loading: true,
  error: null,
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    // Simulate loading from storage
    dispatch({ type: 'SET_LOADING', payload: false });
  }, []);

  const login = async (email: string, password: string) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      // Mock API call
      const mockUser: User = {
        id: '1',
        name: 'محمد أحمد',
        email,
        balance: 50.0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      const mockToken = 'mock-token-' + Math.random().toString(36);
      dispatch({ type: 'SET_USER', payload: { user: mockUser, token: mockToken } });
    } catch (error: any) {
      const message = error.message || 'فشل في تسجيل الدخول';
      dispatch({ type: 'SET_ERROR', payload: message });
      throw error;
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const mockUser: User = {
        id: '1',
        name,
        email,
        balance: 0.0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      const mockToken = 'mock-token-' + Math.random().toString(36);
      dispatch({ type: 'SET_USER', payload: { user: mockUser, token: mockToken } });
    } catch (error: any) {
      const message = error.message || 'فشل في إنشاء الحساب';
      dispatch({ type: 'SET_ERROR', payload: message });
      throw error;
    }
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  const updateBalance = (newBalance: number) => {
    dispatch({ type: 'UPDATE_BALANCE', payload: newBalance });
  };

  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  const value: AuthContextType = {
    ...state,
    login,
    signup,
    logout,
    updateBalance,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthContext };
