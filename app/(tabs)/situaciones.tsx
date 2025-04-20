import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import useAuthStore from '@/store/useAuthStore';

interface SituacionItem {
  titulo: string;
  descripcion: string;
  fecha: string;
}

export default function situaciones() {
  const token = useAuthStore(state => state.token);
  const [situaciones, setSituaciones] = useState([]);
  const [loading, setLoading] = useState(true);

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
    <View style={styles.card}>
      <Text style={styles.title}>{item.titulo}</Text>
      <Text style={styles.description}>{item.descripcion}</Text>
      <Text style={styles.date}>{item.fecha}</Text>
    </View>
  );

  if (loading) return <ActivityIndicator style={{ marginTop: 50 }} size="large" color="#0a7ea4" />;

  return (
    <View style={styles.container}>
      <FlatList
        data={situaciones}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />
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
    textAlign: 'right',
  },
});
