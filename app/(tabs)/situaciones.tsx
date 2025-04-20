import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Alert, Modal, TouchableOpacity, Image } from 'react-native';
import useAuthStore from '@/store/useAuthStore';

interface SituacionItem {
  id: string;
  titulo: string;
  descripcion: string;
  fecha: string;
  foto?: string; // Este campo vendrá en Base64
  estado: string;
  comentarios?: string;
}

export default function SituacionesScreen() {
  const token = useAuthStore(state => state.token);
  const [situaciones, setSituaciones] = useState<SituacionItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<SituacionItem | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const obtenerSituaciones = async () => {
    try {
      const formData = new FormData();
      formData.append('token', token || '');

      const response = await fetch('https://adamix.net/defensa_civil/def/situaciones.php', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.exito) {
        setSituaciones(data.datos);
      } else {
        Alert.alert('Error', data.mensaje);
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo obtener la lista de situaciones');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    obtenerSituaciones();
  }, []);

  const renderItem = ({ item }: { item: SituacionItem }) => (
    <TouchableOpacity onPress={() => {
      setSelectedItem(item);
      setModalVisible(true);
    }}>
      <View style={styles.card}>
        <Text style={styles.title}>{item.titulo}</Text>
        <Text style={styles.description} numberOfLines={2}>{item.descripcion}</Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) return <ActivityIndicator style={{ marginTop: 50 }} size="large" color="#0a7ea4" />;

  return (
    <View style={styles.container}>
      <FlatList
        data={situaciones}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {selectedItem && (
              <>
                <Text style={styles.modalTitle}>{selectedItem.titulo}</Text>
                <Text style={styles.modalSubtitle}>ID: {selectedItem.id}</Text>
                <Text style={styles.modalText}>Fecha: {selectedItem.fecha}</Text>
                <Text style={styles.modalText}>Estado: {selectedItem.estado}</Text>
                
                {selectedItem.foto && (
                  <>
                    <Text style={styles.modalSectionTitle}>Foto:</Text>
                    <Image 
                      source={{ uri: `data:image/jpeg;base64,${selectedItem.foto}` }} 
                      style={styles.image} 
                      resizeMode="contain"
                    />
                  </>
                )}
                
                <Text style={styles.modalSectionTitle}>Descripción:</Text>
                <Text style={styles.modalText}>{selectedItem.descripcion}</Text>
                
                {selectedItem.comentarios && (
                  <>
                    <Text style={styles.modalSectionTitle}>Comentarios:</Text>
                    <Text style={styles.modalText}>{selectedItem.comentarios}</Text>
                  </>
                )}
                
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.closeButtonText}>Cerrar</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    marginTop: 85
  },
  card: {
    backgroundColor: '#f4f4f4',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#0a7ea4',
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  date: {
    fontSize: 14,
    color: '#666',
  },
  status: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
    marginTop: 5,
  },
  thumbnail: {
    width: 100,
    height: 100,
    borderRadius: 5,
    marginTop: 10,
    alignSelf: 'center'
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '90%',
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0a7ea4',
    marginBottom: 10,
  },
  modalSubtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
  },
  modalSectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
    color: '#0a7ea4',
  },
  image: {
    width: '100%',
    height: 200,
    marginVertical: 10,
    borderRadius: 5,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#0a7ea4',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});