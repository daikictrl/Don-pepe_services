import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import carsRouter from './routes/cars.js';
import propertiesRouter from './routes/properties.js';
import conciergeRouter from './routes/concierge.js';
import settingsRouter from './routes/settings.js';
import uploadRouter from './routes/upload.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/api/cars', carsRouter);
app.use('/api/properties', propertiesRouter);
app.use('/api/concierge', conciergeRouter);
app.use('/api/settings', settingsRouter);
app.use('/api/upload', uploadRouter);

app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: err.message || 'Internal server error' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on http://0.0.0.0:${PORT}`);
  console.log(`📍 API endpoints: http://0.0.0.0:${PORT}/api/*`);
});
