import express from 'express';
import cors from 'cors';
import diagnosisRouter from './routes/diagnoses';
import patientRotuer from './routes/patients';

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.use('/api/diagnoses', diagnosisRouter);
app.use('/api/patients', patientRotuer);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
