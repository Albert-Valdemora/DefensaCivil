import { Stack } from 'expo-router';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import BurgerMenu from '@/components/BurgerMenu';


export default function TabLayout() {
  return (
    <View style={styles.container}>
      <BurgerMenu />
      <View style={styles.content}>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="index" />
          <Stack.Screen name="history" />
          <Stack.Screen name="info" />
          <Stack.Screen name="medidas" />
          <Stack.Screen name="miembros" />
          <Stack.Screen name="voluntario" />
          <Stack.Screen name="cambiarContrasena" />
          <Stack.Screen name="mapa" />
        </Stack>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  content: {
    flex: 1,
  },
});