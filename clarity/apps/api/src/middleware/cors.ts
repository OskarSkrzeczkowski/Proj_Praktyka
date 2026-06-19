import cors from 'cors';

export const corsMiddleware = cors({
    origin: 'http://localhost:4200', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
});