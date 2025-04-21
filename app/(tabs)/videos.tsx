import * as React from 'react';
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, Modal, Pressable } from 'react-native';
import { Card } from 'react-native-paper';
import { WebView } from 'react-native-webview';



interface Video {
  id: string;
  titulo: string;
  fecha: string;
  descripcion: string;
  link: string;
}

export default function Servicios() {
  const [valores, setvalores] = useState<Video[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [videoLink, setVideoLink] = useState("");

  useEffect(() => {
    async function getServicios() {
      try {
        const response = await fetch('https://adamix.net/defensa_civil/def/videos.php');
        const datos = await response.json();
        setvalores(datos.datos);
      } catch (error) {
        console.log(error);
      }
    }
    getServicios();
  }, []);

  const openModal = (link: string) => {
    setVideoLink(`https://www.youtube.com/embed/${link}`);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={valores}
        renderItem={({ item }) => (
          <Pressable onPress={() => openModal(item.link)}>
            <Card style={styles.card}>
              <Card.Title
                title={item.titulo}
                subtitle={item.fecha}
                titleStyle={styles.cardTitle}
              />
              <Card.Content style={styles.cardContent}>
                <Image
                  style={styles.logo}
                  source={{ uri: `https://img.youtube.com/vi/${item.link}/hqdefault.jpg` }}
                />
                <Text style={styles.descripcion}>{item.descripcion}</Text>
              </Card.Content>
            </Card>
          </Pressable>
        )}
        keyExtractor={item => item.id}
      />

      {/* Modal para mostrar el video */}
      <Modal
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <WebView
            source={{ uri: videoLink }}
            style={{ flex: 1 }}
            allowsFullscreenVideo
          />
          <Pressable style={styles.closeButton} onPress={() => setModalVisible(false)}>
            <Text style={styles.closeText}>Cerrar Video</Text>
          </Pressable>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: "#f4f4f4",
      marginTop: 80
    },
    card: {
      marginBottom: 16,
      borderRadius: 12,
      elevation: 4,
      backgroundColor: '#fff',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
    },
    cardTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#333',
    },
    cardContent: {
      alignItems: "center",
      paddingVertical: 10,
      backgroundColor: '#eaf4f4',
      borderBottomLeftRadius: 12,
      borderBottomRightRadius: 12,
    },
    logo: {
      width: '100%',
      height: 200,
      marginBottom: 10,
      borderRadius: 8,
    },
    descripcion: {
      textAlign: 'center',
      fontSize: 14,
      color: '#444',
      paddingHorizontal: 10,
    },
    modalContainer: {
      flex: 1,
      backgroundColor: "#000",
    },
    closeButton: {
      padding: 15,
      backgroundColor: "#f44336",
      alignItems: 'center',
    },
    closeText: {
      color: "#fff",
      fontWeight: 'bold',
    },
  });
  
