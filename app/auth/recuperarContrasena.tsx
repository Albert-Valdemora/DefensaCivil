import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Link, useRouter } from 'expo-router';

export default function RecuperarContrasenaScreen() {
  const [cedula, setCedula] = useState('');
  const [correo, setCorreo] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRecuperar = async () => {
    if (!cedula) {
      Alert.alert('Error', 'Por favor ingrese su cédula');
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('cedula', cedula);
      formData.append('correo', correo);


      const response = await fetch('https://adamix.net/defensa_civil/def/recuperar_clave.php', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (data.exito) {
        Alert.alert('Felicidades ✅', data.mensaje);
        router.push('/auth/login');
      } else {
        Alert.alert('Error', data.mensaje);
      }
    } catch (error) {
      Alert.alert('Error', 'Ocurrió un error al procesar su solicitud');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recuperar Contraseña</Text>
      
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
        placeholder="Correo"
        value={correo}
        onChangeText={setCorreo}
        placeholderTextColor={'gray'}
      />
      
      <TouchableOpacity 
        style={styles.button} 
        onPress={handleRecuperar}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Procesando...' : 'Recuperar Contraseña'}
        </Text>
      </TouchableOpacity>

      <Link href="/auth/login">
        <Text style={styles.backText}>Volver al inicio de sesión</Text>
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
    marginBottom: 30,
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
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  backText: {
    color: '#0a7ea4',
    textAlign: 'center',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});
