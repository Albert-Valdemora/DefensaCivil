import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { FontAwesome } from "@expo/vector-icons"

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Inicio',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: 'Historia',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="history.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="info"
        options={{
          title: 'Acerca de...',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="info.bubble.fill.rtl" color={color} />,
        }}
      />
       <Tabs.Screen
        name="medidas"
        options={{
          title: "Medidas Preventivas",
          tabBarLabel: "Medidas",
          tabBarIcon: ({ color }) => <FontAwesome name="shield" size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="miembros"
        options={{
          title: "Miembros",
          tabBarLabel: "Miembros",
          tabBarIcon: ({ color }) => <FontAwesome name="users" size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="voluntario"
        options={{
          title: "Ser Voluntario",
          tabBarLabel: "Voluntario",
          tabBarIcon: ({ color }) => <FontAwesome name="hand-paper-o" size={28} color={color} />,
        }}
      />
    </Tabs>
  );
}
