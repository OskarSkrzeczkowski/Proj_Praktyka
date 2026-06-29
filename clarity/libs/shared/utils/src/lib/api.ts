import axios from 'axios';

const API_URL = 'http://localhost:3333/api';

export const saveGameSession = async (gameType: string, stats: any) => {
  try {
    const response = await axios.post(`${API_URL}/sessions`, {
      gameType: gameType,
      duration: stats.duration || 0,
      ...stats
    });
    console.log('Wynik zapisany na serwerze:', response.data);
    return response.data;
  } catch (error) {
    console.error('Nie udało się zapisać wyniku:', error);
    return null;
  }
};

export const fetchGameResults = async (gameType: string) => {
    try {
        const response = await axios.get(`${API_URL}/sessions/${gameType}`);
        return response.data;
    } catch (error) {
        console.error('Błąd pobierania danych:', error);
        return [];
    }
};