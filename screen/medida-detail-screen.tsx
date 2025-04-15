import React from "react"
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
} from "react-native"
import type { NativeStackScreenProps } from "@react-navigation/native-stack"
import type { RootStackParamList } from "../app/types"
import { useMedidas } from "../context/medida-context"

type MedidaDetailScreenProps = NativeStackScreenProps<RootStackParamList, "/(tabs)/medidas/[id]">

export default function MedidaDetailScreen({ route, navigation }: MedidaDetailScreenProps) {
  const { id } = route.params
  const { getMedidaById, loading, error } = useMedidas()
  const medida = getMedidaById(id)

  React.useEffect(() => {
    if (medida) {
      navigation.setOptions({ title: medida.titulo })
    }
  }, [medida, navigation])

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0066CC" />
        <Text style={styles.loadingText}>Cargando detalles...</Text>
      </View>
    )
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    )
  }

  if (!medida) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>No se encontró la medida preventiva</Text>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>Volver</Text>
        </TouchableOpacity>
      </View>
    )
  }

  // Format the description with proper paragraph breaks
  const formattedDescription = medida.descripcion.replace(/¿Qué hacer/g, "\n\n¿Qué hacer").replace(/\. /g, ". \n\n")

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: medida.foto }} style={styles.image} resizeMode="contain" />
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.title}>{medida.titulo}</Text>
        <Text style={styles.description}>{formattedDescription}</Text>
      </View>
    </ScrollView>
  )
}

const windowWidth = Dimensions.get("window").width

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#555",
  },
  errorText: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: "#0066CC",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  backButtonText: {
    color: "white",
    fontSize: 16,
  },
  imageContainer: {
    width: "100%",
    height: 200,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: windowWidth,
    height: 200,
  },
  contentContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: "#444",
  },
})
