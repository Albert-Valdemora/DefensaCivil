import React from "react";
import { View, Image, Linking, StyleSheet } from "react-native";
import PagerView from "react-native-pager-view";
import { Title, Text, Card } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView, TouchableOpacity } from "react-native-gesture-handler";

const integrantes = [
  /*{
    nombre: "Diego Díaz",
    correo: "diegodiaz300103@gmail.com",
    telefono: "8098034952",
    imagen: require("../../assets/images/diego.jpg"),
  },
  {
    nombre: "David Bueno",
    correo: "david03bueno@gmail.com",
    telefono: "8096109024",
    imagen: require("../../assets/images/david.jpg"),
  },*/
  {
    nombre: "Malvin Jiménez",
    correo: "malvinjd09@gmail.com",
    telefono: "8296242257",
    imagen: require("../../assets/images/marvin.jpg"),
  },
  {
    nombre: "Ernesto Saviñón",
    correo: "ernestonicolas2546@gmail.com",
    telefono: "8099638979",
    imagen: require("../../assets/images/ernesto.jpg"),
  },
  {
    nombre: "Geremy Ferran",
    correo: "geremy.ferran.cem@gmail.com",
    telefono: "8099296594",
    imagen: require("../../assets/images/geremy.jpg"),
  },
  {
    nombre: "Adrian Polanco",
    correo: "adferrer0611@gmail.com",
    telefono: "8296748857",
    imagen: require("../../assets/images/adrian.jpg"),
  },
];

function Info() {
  const handleCall = (telefono: string) => {
    Linking.openURL(`tel:${telefono}`);
  };

  const handleEmail = (correo: string) => {
    Linking.openURL(`mailto:${correo}`);
  };

  const handleTelegram = (telefono: string) => {
    const user = telefono.replace(/\s/g, "");
    Linking.openURL(`https://t.me/+1${user}`);
  };

  return (
    <GestureHandlerRootView>
        <SafeAreaView style={styles.container}>
        <Title style={styles.title}>Acerca de esta aplicación</Title>

        <PagerView style={styles.pager} initialPage={0} orientation="horizontal">
            {integrantes.map((persona, index) => (
            <View style={styles.page} key={index}>
                <Card style={styles.card}>
                <Card.Content style={styles.cardContent}>
                    <Image source={persona.imagen} style={styles.avatar} />
                    <View style={styles.info}>
                    <Text style={styles.name}>{persona.nombre}</Text>

                    <TouchableOpacity onPress={() => handleEmail(persona.correo)}>
                        <Text style={styles.link}>📧 {persona.correo}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => handleCall(persona.telefono)}>
                        <Text style={styles.link}>📞 {persona.telefono}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => handleTelegram(persona.telefono)}>
                        <Text style={styles.link}>💬 Telegram</Text>
                    </TouchableOpacity>
                    </View>
                </Card.Content>
                </Card>
            </View>
            ))}
        </PagerView>
        </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    marginVertical: 20,
    textAlign: "center",
  },
  pager: {
    flex: 1,
    width: "100%",
  },
  page: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  card: {
    width: "100%",
    borderRadius: 12,
    elevation: 3,
    paddingVertical: 16,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginRight: 16,
    backgroundColor: "#ddd", // por si la imagen falla
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 6,
  },
  link: {
    fontSize: 14,
    color: "#1E90FF",
    marginBottom: 4,
  },
});

export default Info;
