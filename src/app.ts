import swaggerUi from 'swagger-ui-express';
import { specs } from './config/swagger';
import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes';
import patientRoutes from './routes/patient.routes';

const app = express();

// Middleware
//app.use(cors());

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));

app.use(express.json());
app.use('/api/patients', patientRoutes);

// Routes
app.use('/api/auth', authRoutes);

// Health check route
app.get('/', (_req, res) => {
    res.json({ status: 'API is running' });
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

export { app };
