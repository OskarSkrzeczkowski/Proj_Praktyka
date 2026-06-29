import axios from 'axios';
import type { StroopResult } from '@clarity/types';

const API_URL = 'http://localhost:3333/api';

export const sessionsApi = {
    saveStroop: (data: Partial<Omit<StroopResult, 'id' | 'date'>>) => 
        axios.post(`${API_URL}/sessions`, { ...data, gameType: 'stroop' }),

    getStroop: () =>
        axios.get<StroopResult[]>(`${API_URL}/sessions/stroop`),

    clearStroop: () =>
        axios.delete(`${API_URL}/sessions/stroop`),
};