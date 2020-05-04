import { v4 as uuid } from 'uuid';
import data from '../../data/patients.json';

import { Patient, ProtectedPatient, NewPatient } from '../types';
import toNewPatient from '../utils';

const patientData: Patient [] = data.map(obj => {
  const object = toNewPatient(obj) as Patient;
  object.id = obj.id;
  return object;
});

const getEntries = (): Patient[] => {
  return patientData;
};

const getProtectedEntries = (): ProtectedPatient[] => {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const findById = (id: string): ProtectedPatient | undefined => {
  const foundPatient = patientData.find(patient => patient.id === id);
  if (foundPatient) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { ssn, ...filteredPatient } = foundPatient;
    return filteredPatient;
  }
  return undefined;
};

const addEntry = ( entry: NewPatient ): Patient => {
  const newPatient = {
    id: uuid(),
    ...entry
  };
  patientData.push(newPatient);
  return newPatient;
};

export default {
  getEntries,
  getProtectedEntries,
  findById,
  addEntry
};