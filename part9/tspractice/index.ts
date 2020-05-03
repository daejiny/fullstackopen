import express = require('express');
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  try {
    res.json({
      weight: Number(req.query.weight),
      height: Number(req.query.height),
      bmi: calculateBmi(Number(req.query.height), Number(req.query.weight))
    });
  } catch (e) {
    res.status(400).json({ error: 'malformatted params' });
  }
});

app.post('/exercises', (req, res) => {
  const schedule = req.body.daily_exercises;
  const target = req.body.target;
  try {
    if (!schedule || !target) throw new Error('missing params');
    if (isNaN(target) || schedule.some(isNaN)) throw new Error('malformatted params');
    res.json(calculateExercises(schedule.map((n: number) => Number(n)), Number(target)));
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});