import express from 'express';

import patientService from '../services/patientService';

const router = express.Router();

router.get('/:id', (req, res) => {
  const patient = patientService.findById(req.params.id);

  if (patient) {
    res.json(patient);
  } else {
    res.status(404);
  }
});

router.get('/', (_req, res) => {
  res.json(patientService.getProtectedEntries());
});

router.post('/', (req, res) => {
  const { name, ssn, gender, occupation, dateOfBirth, entries } = req.body;
  const newPatient = patientService.addEntry({
    name,
    dateOfBirth,
    ssn,
    gender,
    occupation,
    entries,
  });
  res.json(newPatient);
});

export default router;