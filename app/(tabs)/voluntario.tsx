"use client"

import { useState } from "react"
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native"

// Definir un tipo para los campos del formulario
type FormField = "cedula" | "nombre" | "apellido" | "clave" | "correo" | "telefono"

// Definir un tipo para el estado del formulario
interface FormState {
  cedula: string
  nombre: string
  apellido: string
  clave: string
  correo: string
  telefono: string
}

export default function VoluntarioScreen() {
  const [formData, setFormData] = useState<FormState>({
    cedula: "",
    nombre: "",
    apellido: "",
    clave: "",
    correo: "",
    telefono: "",
  })

  const [errors, setErrors] = useState<FormState>({
    cedula: "",
    nombre: "",
    apellido: "",
    clave: "",
    correo: "",
    telefono: "",
  })

  const [loading, setLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")

  const validateForm = () => {
    let isValid = true
    const newErrors: FormState = {
      cedula: "",
      nombre: "",
      apellido: "",
      clave: "",
      correo: "",
      telefono: "",
    }

    // Validar cédula (solo números y longitud adecuada)
    if (!formData.cedula.trim()) {
      newErrors.cedula = "La cédula es requerida"
      isValid = false
    } else if (!/^\d+$/.test(formData.cedula)) {
      newErrors.cedula = "La cédula debe contener solo números"
      isValid = false
    }

    // Validar nombre
    if (!formData.nombre.trim()) {
      newErrors.nombre = "El nombre es requerido"
      isValid = false
    }

    // Validar apellido
    if (!formData.apellido.trim()) {
      newErrors.apellido = "El apellido es requerido"
      isValid = false
    }

    // Validar contraseña (mínimo 6 caracteres)
    if (!formData.clave.trim()) {
      newErrors.clave = "La contraseña es requerida"
      isValid = false
    } else if (formData.clave.length < 6) {
      newErrors.clave = "La contraseña debe tener al menos 6 caracteres"
      isValid = false
    }

    // Validar correo electrónico
    if (!formData.correo.trim()) {
      newErrors.correo = "El correo electrónico es requerido"
      isValid = false
    } else if (!/\S+@\S+\.\S+/.test(formData.correo)) {
      newErrors.correo = "El correo electrónico no es válido"
      isValid = false
    }

    // Validar teléfono (solo números)
    if (!formData.telefono.trim()) {
      newErrors.telefono = "El teléfono es requerido"
      isValid = false
    } else if (!/^\d+$/.test(formData.telefono)) {
      newErrors.telefono = "El teléfono debe contener solo números"
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = async () => {
    if (!validateForm()) {
      return
    }

    setLoading(true)
    setSuccessMessage("")

    try {
      const formDataObj = new FormData()
      formDataObj.append("cedula", formData.cedula)
      formDataObj.append("nombre", formData.nombre)
      formDataObj.append("apellido", formData.apellido)
      formDataObj.append("clave", formData.clave)
      formDataObj.append("correo", formData.correo)
      formDataObj.append("telefono", formData.telefono)

      const response = await fetch("https://adamix.net/defensa_civil/def/registro.php", {
        method: "POST",
        body: formDataObj,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })

      const result = await response.json()

      if (result.exito) {
        setSuccessMessage(result.mensaje)
        // Limpiar el formulario después de un registro exitoso
        setFormData({
          cedula: "",
          nombre: "",
          apellido: "",
          clave: "",
          correo: "",
          telefono: "",
        })
      } else {
        Alert.alert("Error", result.mensaje || "Ocurrió un error al registrar el voluntario")
      }
    } catch (error) {
      console.error("Error al enviar el formulario:", error)
      Alert.alert("Error", "Ocurrió un error al conectar con el servidor")
    } finally {
      setLoading(false)
    }
  }

  // Corregir la función handleChange con tipos adecuados
  const handleChange = (field: FormField, value: string) => {
    setFormData({
      ...formData,
      [field]: value,
    })
    // Limpiar el error cuando el usuario comienza a escribir
    if (errors[field]) {
      setErrors({
        ...errors,
        [field]: "",
      })
    }
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Quiero ser voluntario</Text>

        <View style={styles.requirementsContainer}>
          <Text style={styles.requirementsTitle}>Requisitos para ser voluntario:</Text>
          <Text style={styles.requirementItem}>• Ser mayor de edad</Text>
          <Text style={styles.requirementItem}>• Tener disponibilidad para servir</Text>
          <Text style={styles.requirementItem}>• Estar dispuesto a recibir capacitación</Text>
          <Text style={styles.requirementItem}>• Tener vocación de servicio</Text>
          <Text style={styles.requirementItem}>• Compromiso con la comunidad</Text>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.formTitle}>Formulario de registro</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Cédula</Text>
            <TextInput
              style={[styles.input, errors.cedula ? styles.inputError : null]}
              placeholder="Ingrese su número de cédula"
              value={formData.cedula}
              onChangeText={(text) => handleChange("cedula", text)}
              keyboardType="numeric"
            />
            {errors.cedula ? <Text style={styles.errorText}>{errors.cedula}</Text> : null}
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nombre</Text>
            <TextInput
              style={[styles.input, errors.nombre ? styles.inputError : null]}
              placeholder="Ingrese su nombre"
              value={formData.nombre}
              onChangeText={(text) => handleChange("nombre", text)}
            />
            {errors.nombre ? <Text style={styles.errorText}>{errors.nombre}</Text> : null}
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Apellido</Text>
            <TextInput
              style={[styles.input, errors.apellido ? styles.inputError : null]}
              placeholder="Ingrese su apellido"
              value={formData.apellido}
              onChangeText={(text) => handleChange("apellido", text)}
            />
            {errors.apellido ? <Text style={styles.errorText}>{errors.apellido}</Text> : null}
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Contraseña</Text>
            <TextInput
              style={[styles.input, errors.clave ? styles.inputError : null]}
              placeholder="Ingrese una contraseña"
              value={formData.clave}
              onChangeText={(text) => handleChange("clave", text)}
              secureTextEntry
            />
            {errors.clave ? <Text style={styles.errorText}>{errors.clave}</Text> : null}
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Correo electrónico</Text>
            <TextInput
              style={[styles.input, errors.correo ? styles.inputError : null]}
              placeholder="Ingrese su correo electrónico"
              value={formData.correo}
              onChangeText={(text) => handleChange("correo", text)}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {errors.correo ? <Text style={styles.errorText}>{errors.correo}</Text> : null}
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Teléfono</Text>
            <TextInput
              style={[styles.input, errors.telefono ? styles.inputError : null]}
              placeholder="Ingrese su número de teléfono"
              value={formData.telefono}
              onChangeText={(text) => handleChange("telefono", text)}
              keyboardType="phone-pad"
            />
            {errors.telefono ? <Text style={styles.errorText}>{errors.telefono}</Text> : null}
          </View>

          {successMessage ? <Text style={styles.successMessage}>{successMessage}</Text> : null}

          <TouchableOpacity
            style={[styles.submitButton, loading ? styles.submitButtonDisabled : null]}
            onPress={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <Text style={styles.submitButtonText}>Enviar solicitud</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 16,
    marginTop: 30
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
    color: "#0066CC",
  },
  requirementsContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  requirementsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  requirementItem: {
    fontSize: 16,
    marginBottom: 8,
    color: "#555",
  },
  formContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
    marginBottom: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#333",
    textAlign: "center",
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: "#333",
    fontWeight: "500",
  },
  input: {
    backgroundColor: "#f9f9f9",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  inputError: {
    borderColor: "#ff3b30",
  },
  errorText: {
    color: "#ff3b30",
    fontSize: 14,
    marginTop: 4,
  },
  successMessage: {
    backgroundColor: "#4cd964",
    color: "#fff",
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    textAlign: "center",
    marginBottom: 16,
  },
  submitButton: {
    backgroundColor: "#0066CC",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    marginTop: 8,
  },
  submitButtonDisabled: {
    backgroundColor: "#7fb5e6",
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
})
