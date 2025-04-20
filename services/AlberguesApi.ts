// services/api.ts
import { Albergues } from '../types/albergues';

const API_URL = 'https://adamix.net/defensa_civil/def/albergues.php';

export const fetchAlbergues = async (): Promise<Albergues[]> => {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        // Verifica que la estructura de 'data' coincida con lo esperado
        if (data.exito && Array.isArray(data.datos)) {
            return data.datos as Albergues[];
        } else {
            throw new Error('Estructura de datos inesperada');
        }
    } catch (error: unknown) {
        // Manejo del error de tipo 'unknown'
        if (error instanceof Error) {
            console.error('Error fetching albergues:', error.message);
        } else {
            console.error('Error desconocido');
        }
        return [];
    }
};
