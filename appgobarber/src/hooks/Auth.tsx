import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../services/api';

interface AuthState {
  token: string;
  user: object;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: object;
  loading: boolean;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>({} as AuthState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorageData(): Promise<void> {
      const token = await AsyncStorage.getItem('@GoBarBer:token');
      const user = await AsyncStorage.getItem('@GoBarber:user');

      if (user && token) {
        setData(
          {
            token,
            user: JSON.parse(user)
          }
        );
      }
      // return;
      setLoading(false);
    }
    loadStorageData();
  }, [])

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('sessions', { email, password });
    const { token, user } = response.data;

    await AsyncStorage.multiSet(
      [
        ['@GoBarBer:token', token],
        ['@GoBarber:user', JSON.stringify(user)]
      ]
    )

    setData({ token, user });
  }, []);

  const signOut = useCallback(async () => {

    await AsyncStorage.multiRemove(['@GoBarBer:token', '@GoBarber:user']);

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
