import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, ActivityIndicator, TouchableOpacity } from 'react-native';
import useAlbergues from '../../hooks/useAlbergues';
import { Albergues } from '../../types/albergues';
import { useRouter } from 'expo-router';

const AlbergueListScreen = () => {
    const { albergues, loading, error } = useAlbergues();
    const [searchText, setSearchText] = useState('');
    const router = useRouter();

    const filteredAlbergues = albergues.filter(albergue =>
        albergue.edificio?.toLowerCase().includes(searchText.toLowerCase()) ||
        albergue.ciudad?.toLowerCase().includes(searchText.toLowerCase())
    );

    const goToDetails = (item: Albergues) => {
        router.push({
            pathname: '/(tabs)/albergue/[id]',
            params: {
                id: item.codigo.toString(),  // Usar 'codigo' como identificador
                albergue: JSON.stringify(item),
            },
        });
    };

    const goToMap = () => {
        router.push({
            pathname: '/(tabs)/mapa',
            params: {
                alberguesData: JSON.stringify(filteredAlbergues),
            },
        });
    };

    if (loading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.centered}>
                <Text>{error}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchInput}
                placeholder="Buscar albergue..."
                value={searchText}
                onChangeText={setSearchText}
            />
            <TouchableOpacity style={styles.mapButton} onPress={goToMap}>
                <Text style={styles.mapButtonText}>Ver en Mapa</Text>
            </TouchableOpacity>
            <FlatList
                data={filteredAlbergues}
                keyExtractor={item => item.codigo.toString()}  // Usamos el 'codigo' como identificador único
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => goToDetails(item)}>
                        <View style={styles.card}>
                            {/* Aseguramos que estos textos estén dentro de componentes <Text> */}
                            <Text style={styles.title}>{item.edificio || 'Edificio no disponible'}</Text>
                            <Text>{item.ciudad || 'Ciudad no disponible'}</Text>
                        </View>
                    </TouchableOpacity>
                )}
                ListEmptyComponent={
                    <View style={styles.centered}>
                        <Text>No se encontraron albergues.</Text>
                    </View>
                }
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, paddingTop: 20, marginTop: 60 },
    centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    searchInput: { margin: 10, padding: 10, borderWidth: 1, borderRadius: 5 },
    mapButton: {
        backgroundColor: 'skyblue',
        marginHorizontal: 10,
        marginBottom: 10,
        padding: 10,
        borderRadius: 5,
        alignItems: 'center'
    },
    mapButtonText: { fontWeight: 'bold' },
    card: { padding: 10, borderBottomWidth: 1 },
    title: { fontWeight: 'bold', fontSize: 16 }
});

export default AlbergueListScreen;
