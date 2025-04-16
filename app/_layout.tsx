import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { useColorScheme } from 'react-native'; // For system theme detection
import { Stack } from 'expo-router';

export default function RootLayout() {
  const colorScheme = useColorScheme(); // Detect the system's color scheme

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <StatusBar style="auto" /> {/* Automatically adjusts the status bar style */}

      {/* Stack is automatically inferred from the file structure */}
      <Stack />
    </ThemeProvider>
  );
}
