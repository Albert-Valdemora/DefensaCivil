import useAuthStore from '@/store/useAuthStore';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Image } from 'react-native';

interface Noticia {
  id: string;
  titulo: string;
  contenido: string;
  fecha: string;
  foto: string;
}

export default function NoticiasScreen() {
  const [noticias, setNoticias] = useState<Noticia[]>([]);
  const [loading, setLoading] = useState(true);
  const token = useAuthStore((state) => state.token);

  useEffect(() => {
    fetchNoticias();
  }, []);

  const fetchNoticias = async () => {
    try {
      const response = await fetch('https://adamix.net/defensa_civil/def/noticias.php');
      const data = await response.json();
      if (data.exito) {
        setNoticias(data.datos);
      }
    } catch (error) {
      console.error('Error al cargar noticias:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }: { item: Noticia }) => (
    <View style={styles.noticiaContainer}>
      <Text style={styles.titulo}>{item.titulo}</Text>
      <Text style={styles.fecha}>{item.fecha}</Text>
      <Image source={{ uri: item.foto }} style={styles.memberImage} resizeMode="cover" />
      <Text style={styles.descripcion}>{item.contenido}</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0a7ea4" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={noticias}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 80
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    padding: 16,
  },
  noticiaContainer: {
    backgroundColor: '#f8f8f8',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  fecha: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  descripcion: {
    fontSize: 16,
    color: '#444',
    lineHeight: 24,
  },
  memberImage: {
    width: "100%",
    height: 150,
    backgroundColor: "#e0e0e0",
  }
}); 