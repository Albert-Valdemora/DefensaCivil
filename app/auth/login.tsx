import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Link, useRouter } from 'expo-router';
import useAuthStore from '@/store/useAuthStore';
import { LoginResponse } from '../types';

export default function LoginScreen() {
  const router = useRouter();
  const [cedula, setCedula] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const login = useAuthStore(state => state.login);

  const handleLogin = async () => {
    try {
      if (!cedula || !password) {
        setError('Por favor ingrese su cédula y contraseña');
        return;
      }

      const formData = new FormData();
      formData.append('cedula', cedula);
      formData.append('clave', password);

      const response = await fetch('https://adamix.net/defensa_civil/def/iniciar_sesion.php', {
        method: 'POST',
        body: formData,
      });

      const data: LoginResponse = await response.json();

      if (data.exito && Array.isArray(data.datos) === false) {
        login(data.datos, data.datos.token);
        Alert.alert(
          'Éxito',
          'Inicio de sesión exitoso',
          [
            {
              text: 'OK',
              onPress: () => router.push('/(tabs)')
            }
          ]
        );
      } else {
        Alert.alert('Error', data.mensaje);
      }
    } catch (error) {
      Alert.alert('Error', 'Ocurrió un error al iniciar sesión');
    }
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>
      
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      
      <TextInput
        style={styles.input}
        placeholder="Cédula"
        value={cedula}
        onChangeText={setCedula}
        keyboardType="numeric"
        autoCapitalize="none"
        placeholderTextColor={'gray'}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholderTextColor={'gray'}
      />
      
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Iniciar Sesión</Text>
      </TouchableOpacity>

      <Link href="/auth/recuperarContrasena">
        <Text style={styles.titleContra}>¿Has olvidado tu contraseña?</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#0a7ea4',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    marginBottom: 15,
    textAlign: 'center',
  },
  titleContra: {
    color: 'blue',
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 500
  }
});
