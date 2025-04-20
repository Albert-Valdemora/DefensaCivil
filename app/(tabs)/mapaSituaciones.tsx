import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, Alert, StyleSheet, Image, TouchableOpacity } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import useAuthStore from '@/store/useAuthStore';

interface SituacionItem {
  id: string;
  titulo: string;
  descripcion: string;
  fecha: string;
  estado: string;
  latitud?: string;
  longitud?: string;
  foto?: string;
}

export default function MapaSituacionesScreen() {
  const token = useAuthStore(state => state.token);
  const [situaciones, setSituaciones] = useState<SituacionItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMarker, setSelectedMarker] = useState<SituacionItem | null>(null);

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

  if (loading) return <ActivityIndicator style={{ marginTop: 50 }} size="large" color="#0a7ea4" />;

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={StyleSheet.absoluteFillObject}
        initialRegion={{
          latitude: 18.5,
          longitude: -69.9,
          latitudeDelta: 0.5,
          longitudeDelta: 0.5,
        }}
      >
        {situaciones.map((item) => (
          item.latitud && item.longitud && (
            <Marker
              key={item.id}
              coordinate={{ 
                latitude: parseFloat(item.latitud), 
                longitude: parseFloat(item.longitud) 
              }}
              onPress={() => setSelectedMarker(item)}
            >
              <View style={styles.markerContainer}>
                <View style={[
                  styles.markerPin,
                  { backgroundColor: item.estado === 'Resuelto' ? '#2ecc71' : '#e74c3c' }
                ]}>
                  <Text style={styles.markerText}>!</Text>
                </View>
                <View style={styles.markerPointer} />
              </View>
            </Marker>
          )
        ))}
      </MapView>

      {selectedMarker && (
        <View style={styles.calloutContainer}>
          <View style={styles.calloutContent}>
            <Text style={styles.calloutTitle}>{selectedMarker.titulo}</Text>
            
            <View style={styles.statusContainer}>
              <View style={[
                styles.statusIndicator,
                { backgroundColor: selectedMarker.estado === 'Resuelto' ? '#2ecc71' : '#e74c3c' }
              ]} />
              <Text style={styles.calloutStatus}>{selectedMarker.estado}</Text>
            </View>
            
            <Text style={styles.calloutDescription}>{selectedMarker.descripcion}</Text>
            <Text style={styles.calloutDate}>{selectedMarker.fecha}</Text>
            
            {selectedMarker.foto && (
              <Image 
                source={{ uri: `data:image/jpeg;base64,${selectedMarker.foto}` }}
                style={styles.calloutImage}
                resizeMode="cover"
              />
            )}
            
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={() => setSelectedMarker(null)}
            >
              <Text style={styles.closeButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  markerContainer: {
    alignItems: 'center',
  },
  markerPin: {
    padding: 10,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  markerPointer: {
    width: 10,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderBottomWidth: 16,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'white',
    transform: [{ rotate: '180deg' }],
    marginTop: -6,
  },
  markerText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  calloutContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  calloutContent: {
    padding: 10,
  },
  calloutTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0a7ea4',
    marginBottom: 5,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 6,
  },
  calloutStatus: {
    fontSize: 14,
    color: '#666',
  },
  calloutDescription: {
    fontSize: 14,
    color: '#333',
    marginBottom: 10,
    lineHeight: 20,
  },
  calloutDate: {
    fontSize: 12,
    color: '#999',
    marginBottom: 10,
  },
  calloutImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 10,
  },
  closeButton: {
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