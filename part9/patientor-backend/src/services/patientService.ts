import { v4 as uuid } from 'uuid';
import data from '../../data/patients';

import { Patient, PublicPatient, NewPatient, NewEntry } from '../types';
import { toNewPatient } from '../utils';

const patientData: Patient[] = data.map(obj => {
  const object = toNewPatient(obj) as Patient;
  object.id = obj.id;
  return object;
});

const getPatients = (): Patient[] => {
  return patientData;
};

const getProtectedPatients = (): PublicPatient[] => {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
    entries,
  }));
};

const findById = (id: string): Patient | undefined => {
  const foundPatient = patientData.find(patient => patient.id === id);
  if (foundPatient) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // const { ssn, ...filteredPatient } = foundPatient;
    // return filteredPatient;
    return foundPatient;
  }
  return undefined;
};

const addPatient = (entry: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    ...entry
  };
  patientData.push(newPatient);
  return newPatient;
};

const addEntry = (patient: Patient, entry: NewEntry): Patient => {
  const newEntry = {
    id: uuid(),
    ...entry
  };
  // patientData = patientData.map(p => p.id === patient.id ? {...patient, entries: {...patient.entries, newEntry}})
  patient.entries.push(newEntry);
  return patient;
};

export default {
  getPatients,
  getProtectedPatients,
  findById,
  addEntry,
  addPatient
};