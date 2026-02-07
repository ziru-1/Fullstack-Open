import express from 'express';
import { calculateBmi } from './bmiCalculator';

const app = express();
const port = 3003;

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (isNaN(height) || isNaN(weight)) {
    res.status(400).json({
      error: 'malformatted parameters',
    });
    return;
  }

  const bmi = calculateBmi(height, weight);

  res.json({
    height,
    weight,
    bmi,
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
