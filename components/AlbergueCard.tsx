// components/AlbergueCard.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Albergues } from '../types/albergues';
import { Link } from 'expo-router';

interface Props {
    albergue: Albergues;
}

const AlbergueCard: React.FC<Props> = ({ albergue }) => {
    return (
        <Link href={`/albergues/${albergue.id}`} asChild>
            <TouchableOpacity style={styles.card}>
                <Text style={styles.nombre}>{albergue.nombre}</Text>
                <Text style={styles.direccion}>{albergue.direccion}</Text>
                {albergue.telefono && <Text style={styles.telefono}>Teléfono: {albergue.telefono}</Text>}
            </TouchableOpacity>
        </Link>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        padding: 15,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    nombre: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    direccion: {
        fontSize: 14,
        color: '#555',
        marginBottom: 3,
    },
    telefono: {
        fontSize: 14,
        color: '#777',
    },
});

export default AlbergueCard;