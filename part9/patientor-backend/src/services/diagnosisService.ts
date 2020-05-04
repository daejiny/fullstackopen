import diagnosisData from '../../data/diagnoses.json';

import { Diagnosis } from '../types';

// const diagnoses:  Array<Diagnose> = diagnoseData;

const getEntries = (): Diagnosis[] => {
  return diagnosisData;
};

const addEntry = () => {
  return null;
};

export default {
  getEntries,
  addEntry
};