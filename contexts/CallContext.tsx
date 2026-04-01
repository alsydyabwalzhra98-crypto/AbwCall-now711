import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { CallRecord } from '../types/call';
import { callAPI } from '../lib/api';

interface CallState {
  currentCall: CallRecord | null;
  callHistory: CallRecord[];
  callStatus: 'idle' | 'connecting' | 'ringing' | 'connected' | 'ended';
  loading: boolean;
  error: string | null;
}

interface CallContextType extends CallState {
  makeCall: (phoneNumber: string) => Promise<void>;
  endCall: () => void;
  getCallHistory: () => Promise<void>;
  clearError: () => void;
}

const CallContext = createContext<CallContextType | undefined>(undefined);

type CallAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_CALL_STATUS'; payload: CallState['callStatus'] }
  | { type: 'SET_CURRENT_CALL'; payload: CallRecord }
  | { type: 'END_CALL' }
  | { type: 'SET_CALL_HISTORY'; payload: CallRecord[] }
  | { type: 'SET_ERROR'; payload: string }
  | { type: 'CLEAR_ERROR' };

const callReducer = (state: CallState, action: CallAction): CallState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_CALL_STATUS':
      return { ...state, callStatus: action.payload };
    case 'SET_CURRENT_CALL':
      return {
        ...state,
        currentCall: action.payload,
        loading: false,
        error: null,
      };
    case 'END_CALL':
      return {
        ...state,
        currentCall: null,
        callStatus: 'idle',
      };
    case 'SET_CALL_HISTORY':
      return {
        ...state,
        callHistory: action.payload,
        loading: false,
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    default:
      return state;
  }
};

const initialState: CallState = {
  currentCall: null,
  callHistory: [],
  callStatus: 'idle',
  loading: false,
  error: null,
};

export const CallProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(callReducer, initialState);

  const makeCall = async (phoneNumber: string) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'SET_CALL_STATUS', payload: 'connecting' });

    try {
      const response = await callAPI.makeCall(phoneNumber);
      const call = response.data;
      
      dispatch({ type: 'SET_CURRENT_CALL', payload: call });
      dispatch({ type: 'SET_CALL_STATUS', payload: 'ringing' });
      
      // Simulate call connection
      setTimeout(() => {
        dispatch({ type: 'SET_CALL_STATUS', payload: 'connected' });
      }, 2000);
    } catch (error: any) {
      const message = error.response?.data?.message || 'فشل في إجراء المكالمة';
      dispatch({ type: 'SET_ERROR', payload: message });
      dispatch({ type: 'SET_CALL_STATUS', payload: 'idle' });
      throw error;
    }
  };

  const endCall = () => {
    if (state.currentCall) {
      // Update call record
      const endedCall = {
        ...state.currentCall,
        status: 'completed' as const,
        endedAt: new Date().toISOString(),
      };
      
      dispatch({ type: 'SET_CALL_HISTORY', payload: [endedCall, ...state.callHistory] });
    }
    
    dispatch({ type: 'END_CALL' });
  };

  const getCallHistory = async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const response = await callAPI.getCallHistory();
      dispatch({ type: 'SET_CALL_HISTORY', payload: response.data });
    } catch (error: any) {
      const message = error.response?.data?.message || 'فشل في جلب سجل المكالمات';
      dispatch({ type: 'SET_ERROR', payload: message });
    }
  };

  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  const value: CallContextType = {
    ...state,
    makeCall,
    endCall,
    getCallHistory,
    clearError,
  };

  return <CallContext.Provider value={value}>{children}</CallContext.Provider>;
};

export const useCall = (): CallContextType => {
  const context = useContext(CallContext);
  if (context === undefined) {
    throw new Error('useCall must be used within a CallProvider');
  }
  return context;
};
