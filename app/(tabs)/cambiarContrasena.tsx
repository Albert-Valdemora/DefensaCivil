import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from "react-native";
import { Link, useRouter } from "expo-router";
import useAuthStore from "@/store/useAuthStore";

export default function CambiarContrasenaScreen() {
  const [contrasenaActual, setContrasenaActual] = useState("");
  const [contrasenaNueva, setContrasenaNueva] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const token = useAuthStore(state => state.token)

  const handleRecuperar = async () => {
    if (!contrasenaActual || !contrasenaNueva) {
      Alert.alert("Error", "Por favor ingrese su cédula");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();

      if (!token) {
        Alert.alert('Error', 'No se encontró el token de autenticación');
        return
      }

      formData.append("token", token);
      formData.append("clave_anterior", contrasenaActual);
      formData.append("clave_nueva", contrasenaNueva);

      const response = await fetch(
        "https://adamix.net/defensa_civil/def/cambiar_clave.php",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      if (data.exito) {
        Alert.alert("Felicidades ✅", data.mensaje);

        router.push("/");
      } else {
        Alert.alert("Error", data.mensaje);
      }
    } catch (error) {
      Alert.alert("Error", "Ocurrió un error al procesar su solicitud");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cambiar Contraseña</Text>

      <TextInput
        style={styles.input}
        placeholder="Contraseña Actual"
        value={contrasenaActual}
        onChangeText={setContrasenaActual}
        secureTextEntry
        placeholderTextColor={"gray"}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña Nueva"
        value={contrasenaNueva}
        onChangeText={setContrasenaNueva}
        secureTextEntry
        placeholderTextColor={"gray"}
      />

    

      <TouchableOpacity
        style={styles.button}
        onPress={handleRecuperar}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Procesando..." : "Cambiando Contraseña"}
        </Text>
      </TouchableOpacity>

      <Link href="/">
        <Text style={styles.backText}>Volver al inicio</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#0a7ea4",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  backText: {
    color: "#0a7ea4",
    textAlign: "center",
    fontSize: 16,
    textDecorationLine: "underline",
  },
});
