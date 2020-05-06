import express from 'express';

import patientService from '../services/patientService';
import { toNewEntry } from '../utils';

const router = express.Router();

router.post('/:id/entries', (req, res) => {
  const patient = patientService.findById(req.params.id);
  if (patient) {
    const updatedPatient = patientService.addEntry(patient, toNewEntry(req.body));
    res.json(updatedPatient);
  } else {
    res.status(404);
  }
});

router.get('/:id', (req, res) => {
  const patient = patientService.findById(req.params.id);

  if (patient) {
    res.json(patient);
  } else {
    res.status(404);
  }
});

router.get('/', (_req, res) => {
  res.json(patientService.getProtectedPatients());
});

router.post('/', (req, res) => {
  const { name, ssn, gender, occupation, dateOfBirth, entries } = req.body;
  const newPatient = patientService.addPatient({
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