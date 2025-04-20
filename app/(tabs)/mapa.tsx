import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useRouter, useLocalSearchParams } from 'expo-router';

interface Albergue {
    codigo: string;
    edificio: string;
    ciudad: string;
    lat: string;
    lng: string;
    coordinador: string;
    telefono: string;
    capacidad: string;
    latitud: string;
    longitud: string;
}

const MapaScreen = () => {
    const router = useRouter();
    const { alberguesData } = useLocalSearchParams();
    const [albergues, setAlbergues] = useState<Albergue[]>([]);
    const [loading, setLoading] = useState(true);
    const [isListVisible, setIsListVisible] = useState(false);

    useEffect(() => {
        if (alberguesData) {
            try {
                const parsedData = JSON.parse(alberguesData as string) as Albergue[];
                const alberguesConCoordenadasCorrectas = parsedData.map(albergue => ({
                    ...albergue,
                    latitude: Number(albergue.lng),
                    longitude: Number(albergue.lat),
                }));
                setAlbergues(alberguesConCoordenadasCorrectas);
            } catch (error) {
                console.error("Error parsing alberguesData:", error);
            } finally {
                setLoading(false);
            }
        } else {
            setLoading(false);
            console.warn("No se recibieron datos de albergues para el mapa.");
        }
    }, [alberguesData]);

    const goToDetails = (item: Albergue) => {
        router.push({
            pathname: '/(tabs)/albergue/[id]',
            params: {
                id: item.codigo.toString(),
                albergue: JSON.stringify(item),
            },
        });
    };

    const toggleListVisibility = () => {
        setIsListVisible(!isListVisible);
    };

    if (loading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: 18.7357,
                    longitude: -70.1627,
                    latitudeDelta: 0.5,
                    longitudeDelta: 0.5,
                }}
            >
                {albergues.map((albergue) => (
                    <Marker
                        key={albergue.codigo}
                        coordinate={{
                            latitude: Number(albergue.lng),
                            longitude: Number(albergue.lat),
                        }}
                        title={albergue.edificio}
                        description={albergue.ciudad}
                        onPress={() => goToDetails(albergue)} // Agregamos el evento onPress
                    />
                ))}
            </MapView>

            <TouchableOpacity style={styles.listButton} onPress={toggleListVisibility}>
                <Text style={styles.listButtonText}>{isListVisible ? 'Ocultar Lista' : 'Mostrar Lista'}</Text>
            </TouchableOpacity>

            {isListVisible && (
                <View style={styles.listContainer}>
                    <FlatList
                        data={albergues}
                        keyExtractor={(item) => item.codigo}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => goToDetails(item)} style={styles.listItem}>
                                <Text style={styles.listItemTitle}>{item.edificio}</Text>
                                <Text style={styles.listItemCity}>{item.ciudad}</Text>
                            </TouchableOpacity>
                        )}
                        ListEmptyComponent={<Text>No hay albergues para mostrar.</Text>}
                    />
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        flex: 1,
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    listButton: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    listButtonText: {
        fontWeight: 'bold',
    },
    listContainer: {
        position: 'absolute',
        bottom: 60,
        left: 20,
        right: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: 5,
        maxHeight: 200,
        padding: 10,
    },
    listItem: {
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    listItemTitle: {
        fontWeight: 'bold',
    },
    listItemCity: {
        color: 'gray',
    },
});

export default MapaScreen;