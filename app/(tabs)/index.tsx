import { Image, StyleSheet, View, Text, Dimensions } from 'react-native';
import PagerView from 'react-native-pager-view';

const { width, height } = Dimensions.get("window");

export default function HomeScreen() {
  return (
    <View style={styles.container}>
    <Text style={styles.title}>Inicio - Defensa Civil</Text>
    <PagerView style={styles.pager} initialPage={0}>
      <View style={styles.page} key="1">
        <Image
          source={require("../../assets/images/PasionDC.png")}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
      <View style={styles.page} key="2">
        <Image
          source={require("../../assets/images/defensa-civil.jpeg")}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
      <View style={styles.page} key="3">
        <Image
          source={require("../../assets/images/images.png")}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
    </PagerView>
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingTop: 40,
    height: height
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  pager: {
    flex: 1,
  },
  page: {
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: width * 0.9,
    height: height * 0.5,
    borderRadius: 10,
  },
});