import React from "react";
import { View, Image, Linking, StyleSheet } from "react-native";
import PagerView from "react-native-pager-view";
import { Title, Text, Card } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView, TouchableOpacity } from "react-native-gesture-handler";

const teamMembers = [
  {
    name: "Albert Valdemora",
    email: "albertvaldemorat@gmail.com",
    phone: "8499183303",
    image: require("../../assets/images/albert.jpg"),
    telegramUser: "AlbertDVSP"
  },
  {
    name: "Diego Díaz",
    email: "diegodiaz300103@gmail.com",
    phone: "8098034952",
    image: require("../../assets/images/diego.jpg"),
    telegramUser: "ddiaaz1"
  },
  {
    name: "David Bueno",
    email: "david03bueno@gmail.com",
    phone: "8096109024",
    image: require("../../assets/images/luis.jpg"),
    telegramUser: "David03Bueno"
  },
  {
    name: "Malvin Jiménez",
    email: "malvinjd09@gmail.com",
    phone: "8296242257",
    image: require("../../assets/images/marvin.jpg"),
    telegramUser: "Malvinjd"
  },
  {
    name: "Ernesto Saviñón",
    email: "ernestonicolas2546@gmail.com",
    phone: "8099638979",
    image: require("../../assets/images/ernesto.jpg"),
    telegramUser: "ErnestoSavinon"
  },
  {
    name: "Geremy Ferran",
    email: "geremy.ferran.cem@gmail.com",
    phone: "8099296594",
    image: require("../../assets/images/geremy.jpg"),
    telegramUser: "g3r0_0"
  },
  {
    name: "Adrian Polanco",
    email: "adferrer0611@gmail.com",
    phone: "8296748857",
    image: require("../../assets/images/adrian.jpg"),
    telegramUser: "apolancof"
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
    Linking.openURL(`https://t.me/${user}`);
  };

  return (
    <GestureHandlerRootView>
        <SafeAreaView style={styles.container}>
        <Title style={styles.title}>Acerca de esta aplicación</Title>

        <PagerView style={styles.pager} initialPage={0} orientation="horizontal">
            {teamMembers.map((teamMember, index) => (
            <View style={styles.page} key={index}>
                <Card style={styles.card}>
                <Card.Content style={styles.cardContent}>
                    <Image source={teamMember.image} style={styles.avatar} />
                    <View style={styles.info}>
                    <Text style={styles.name}>{teamMember.name}</Text>

                    <TouchableOpacity onPress={() => handleEmail(teamMember.email)}>
                        <Text style={styles.link}>📧 {teamMember.email}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => handleCall(teamMember.phone)}>
                        <Text style={styles.link}>📞 {teamMember.phone}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => handleTelegram(teamMember.telegramUser)}>
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
