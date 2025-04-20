// app/(tabs)/albergue/[id].tsx
import { useLocalSearchParams } from 'expo-router';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Albergues } from '../../../types/albergues'; // Ajusta si está en otro lado

const AlbergueDetailScreen = () => {
    const { id, albergue } = useLocalSearchParams<{ id?: string; albergue?: string }>();

    if (!albergue) {
        return (
            <View style={styles.centered}>
                <Text>No se encontró información del albergue.</Text>
            </View>
        );
    }

    let albergueData: Albergues;

    try {
        albergueData = JSON.parse(albergue);
    } catch (e) {
        return (
            <View style={styles.centered}>
                <Text>Error al cargar datos del albergue.</Text>
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Datos</Text>
            <Text style={styles.label}>Coordinador:</Text>
            <Text>{albergueData.coordinador}</Text>
            <Text style={styles.label}>Telefono:</Text>
            <Text>{albergueData.telefono}</Text>
            <Text style={styles.label}>Ciudad:</Text>
            <Text>{albergueData.ciudad}</Text>
            <Text style={styles.label}>Edificio:</Text>
            <Text>{albergueData.edificio}</Text>
            <Text style={styles.label}>Capacidad:</Text>
            <Text>{albergueData.capacidad}</Text>
            <Text style={styles.label}>Codigo:</Text>
            <Text>{albergueData.codigo}</Text>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { padding: 20, marginTop: 60 },
    centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10, marginTop: 15, textAlign: 'center' },
    label: { marginTop: 15, fontWeight: 'bold', fontSize: 16, },
});

export default AlbergueDetailScreen;
