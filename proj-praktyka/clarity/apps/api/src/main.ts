import express from 'express';
import type { NBackResult } from '@clarity/types'; 

const app = express();

app.get('/api', (req, res) => {
  const mockData: NBackResult[] = [
    {
      id: 'backend-test-1',
      date: Date.now(),
      duration: 60,
      nLevel: 2,
      correct: 15,
      incorrect: 3,
      efficiency: 83.3,
      avgReactionTime: 450,
      bestStreak: 5
    }
  ];

  res.send(mockData);
});

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);