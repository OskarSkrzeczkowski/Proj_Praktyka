import { Router } from 'express';

const sessionsRouter = Router();

const sessions: any[] = []; 

sessionsRouter.post('/', (req, res) => {
    const newSession = req.body;
    sessions.push(newSession);
    res.status(201).json({ message: 'Zapisano', data: newSession });
});

sessionsRouter.get('/:gameType', (req, res) => {
    const { gameType } = req.params;
    const filteredSessions = sessions.filter(s => s.game === gameType);
    res.json(filteredSessions);
});

export default sessionsRouter;