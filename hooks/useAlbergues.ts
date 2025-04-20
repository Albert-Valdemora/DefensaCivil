// hooks/useAlbergues.ts
import { useState, useEffect } from 'react';
import { fetchAlbergues } from '../services/AlberguesApi';
import { Albergues } from '../types/albergues';

const useAlbergues = () => {
    const [albergues, setAlbergues] = useState<Albergues[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getAlbergues = async () => {
            try {
                const data = await fetchAlbergues();
                setAlbergues(data);
            } catch (err: unknown) {
                if (err instanceof Error) {
                    setError(err.message);  // Si el error es una instancia de Error, accede a 'message'
                } else {
                    setError('Error desconocido');
                }
            } finally {
                setLoading(false);
            }
        };

        getAlbergues();
    }, []);

    return { albergues, loading, error };
};

export default useAlbergues;
