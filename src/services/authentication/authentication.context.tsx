import React, { useState, createContext, useContext } from 'react';
import * as firebase from 'firebase';

import { loginRequest } from './authentication.service';

type AuthenticationContextData = {
  user: firebase.auth.UserCredential;
  isLoading: boolean;
  error: string;
  onLogin: (email: string, password: string) => void;
};

type AuthenticationProviderProps = {
  children: React.ReactNode;
};

const AuthenticationContext = createContext<AuthenticationContextData>(
  {} as AuthenticationContextData,
);

export const AuthenticationProvider = ({
  children,
}: AuthenticationProviderProps): JSX.Element => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<firebase.auth.UserCredential>(
    {} as firebase.auth.UserCredential,
  );
  const [error, setError] = useState('');

  const onLogin = (email: string, password: string): void => {
    setIsLoading(true);
    loginRequest(email, password)
      .then(u => {
        setUser(u);
        setIsLoading(false);
      })
      .catch(e => {
        setIsLoading(false);
        setError(e);
      });
  };

  return (
    <AuthenticationContext.Provider
      value={{
        user,
        isLoading,
        error,
        onLogin,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};

export function useAuth(): AuthenticationContextData {
  const context = useContext(AuthenticationContext);

  if (!context)
    throw new Error('useAuth must be used within an AuthenticationProvider');

  return context;
}
