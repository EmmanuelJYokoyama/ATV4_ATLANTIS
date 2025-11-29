import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { router as api } from './routes/index';

const app = express();
app.use(helmet());
app.use(cors({ origin: '*'}));
app.use(express.json());
app.use(morgan('dev'));

app.get('/', (_req, res) => res.json({ name: 'Atlantis API', version: '0.1.0' }));
app.use('/api', api);

export default app;
