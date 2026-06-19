import express from 'express';
import { corsMiddleware } from './middleware/cors';
import sessionsRouter from './routes/sessions';

const app = express();

app.use(express.json()); 
app.use(corsMiddleware);

app.use('/api/sessions', sessionsRouter);

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
    console.log(`API działa na adresie http://localhost:${port}/api`);
});

server.on('error', console.error);