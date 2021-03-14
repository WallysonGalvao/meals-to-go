/* eslint-disable react/style-prop-object */
/* eslint-disable camelcase */
import React from 'react';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import { ThemeProvider } from 'styled-components/native';

import {
  useFonts as useOswald,
  Oswald_400Regular,
} from '@expo-google-fonts/oswald';
import { useFonts as useLato, Lato_400Regular } from '@expo-google-fonts/lato';

import theme from './src/infrastructure/theme';
import Routes from './src/routes';

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
        <Routes />
      </ThemeProvider>
      <ExpoStatusBar style="auto" />
    </>
  );
}
