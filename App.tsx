/* eslint-disable react/style-prop-object */
import React from 'react';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import { ThemeProvider } from 'styled-components/native';

import {
  useFonts as useOswald,
  Oswald_400Regular,
} from '@expo-google-fonts/oswald';
import { useFonts as useLato, Lato_400Regular } from '@expo-google-fonts/lato';

import AppProvider from './src/services';

import theme from './src/infrastructure/theme';
import Navigation from './src/infrastructure/navigation';

import './src/config/firebase';

export default function App(): JSX.Element | null {
  const [oswaldLoaded] = useOswald({
    Oswald_400Regular,
  });

  const [latoLoaded] = useLato({
    Lato_400Regular,
  });

  if (!oswaldLoaded || !latoLoaded) {
    return null;
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <AppProvider>
          <Navigation />
        </AppProvider>
      </ThemeProvider>
      <ExpoStatusBar style="auto" />
    </>
  );
}
