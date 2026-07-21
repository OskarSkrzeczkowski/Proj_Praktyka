import axios from 'axios';
import { CreateSessionPayload } from '@clarity/types';

const API_URL = process.env['VITE_API_URL'] ?? 'http://localhost:3333/api';

export const sessionsApi = {
    save: (data: CreateSessionPayload) => 
        axios.post(`${API_URL}/sessions`, data),

    get: (gameType: string) =>
        axios.get(`${API_URL}/sessions/${gameType}`),

    clear: (gameType: string) =>
        axios.delete(`${API_URL}/sessions/${gameType}`),
};