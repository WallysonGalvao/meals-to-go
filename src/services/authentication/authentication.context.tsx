import React, { useState, createContext, useContext, useCallback } from 'react';
import firebase, { User, auth } from 'firebase';

import { loginRequest } from './authentication.service';

export type UserProps = User; // | auth.UserCredential;

type AuthenticationContextData = {
  isAuthenticated: boolean;
  user: UserProps;
  isLoading: boolean;
  error: string;
  onLogin: (email: string, password: string) => void;
  onLogout: () => void;
  onRegister: (
    email: string,
    password: string,
    repeatedPassword: string,
  ) => void;
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
  const [error, setError] = useState('');
  /* const [user, setUser] = useState<firebase.auth.UserCredential>(
    {} as firebase.auth.UserCredential,
  ); */
  const [user, setUser] = useState<UserProps>({} as UserProps);

  firebase.auth().onAuthStateChanged(usr => {
    if (usr) {
      setUser(usr);
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  });

  const onLogin = useCallback((email: string, password: string): void => {
    setIsLoading(true);
    loginRequest(email, password)
      .then(u => {
        setUser(u);
        setError('');
        setIsLoading(false);
      })
      .catch(e => {
        setIsLoading(false);
        setError(e.toString());
      });
  }, []);

  const onRegister = (
    email: string,
    password: string,
    repeatedPassword: string,
  ): void => {
    if (password !== repeatedPassword) {
      setError('Error: Passwords do not match');
      return;
    }
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(u => {
        setUser(u);
        setError('');
        setIsLoading(false);
      })
      .catch(e => {
        setIsLoading(false);
        setError(e.toString());
      });
  };

  const onLogout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        setUser({} as UserProps);
        setError('');
      });
  };

  return (
    <AuthenticationContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        isLoading,
        error,
        onLogin,
        onLogout,
        onRegister,
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
