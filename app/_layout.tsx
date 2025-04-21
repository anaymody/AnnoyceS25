// app/_layout.js
import React from 'react';
import { ThemeProvider, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { useColorScheme } from 'react-native';
import { Tabs } from 'expo-router';
import { MaterialIcons,  MaterialCommunityIcons } from '@expo/vector-icons';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: '#1A1A1D',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: {
            backgroundColor: '#FF7518',  // ← your tab‑bar bg color here
            borderTopWidth: 0,            // optional: remove top border
          },
        }}
      >
        <Tabs.Screen
          name="(tabs)/index"
          options={{
            title: 'Home',
            
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="home" color={color} size={size} />
            ),
            
          }}
        />
        <Tabs.Screen
          name="(tabs)/TrickOrTreat"
          options={{
            title: 'TrickOrTreat',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons  name="ghost" color={color} size={size} />
            ),
          }}
        />
        <Tabs.Screen
          name="(tabs)/sounds"
          options={{
            title: 'Sounds',
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="music-note" color={color} size={size} />
            ),
          }}
        />
      </Tabs>
    </ThemeProvider>
  );
}
