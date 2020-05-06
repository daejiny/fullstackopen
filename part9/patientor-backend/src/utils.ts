import { NewPatient, Gender, Entry, HospitalEntry, OccupationalHealthcareEntry, HealthCheckRating, NewEntry } from './types';
import diagnosisService from './services/diagnosisService';
/* eslint-disable @typescript-eslint/no-explicit-any */

const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

// const isSsn = (ssn: string): boolean => {
//   const ssnPattern = /^[0-9]{3}-?[0-9]{2}-?[0-9]{4}$/;
//   return ssnPattern.test(ssn);
// };

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseName = (name: any): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name: ' + name);
  }

  return name;
};

const parseDob = (dob: any): string => {
  if (!dob || !isString(dob) || !isDate(dob)) {
    throw new Error('Incorrect or missing date: ' + dob);
  }

  return dob;
};

const parseSsn = (ssn: any): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error('Incorrect or missing ssn: ' + ssn);
  }

  return ssn;
};

const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }

  return gender;
};

const parseOccupation = (occupation: any): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing occupation: ' + occupation);
  }

  return occupation;
};

export const toNewPatient = (object: any): NewPatient => {
  return {
    name: parseName(object.name),
    dateOfBirth: parseDob(object.dateOfBirth),
    ssn: parseSsn(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseOccupation(object.occupation),
    entries: object.entries
  };
};

export const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const parseDate = (date: any): string => {
  if (!date || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }

  return date;
};

const parseSpecialist = (specialist: any): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error('Incorrect or missing specialist: ' + specialist);
  }

  return specialist;
};


const parseDescription = (description: any): string => {
  if (!description || !isString(description)) {
    throw new Error('Incorrect or missing specialist: ' + description);
  }

  return description;
};

const parseDischarge = (discharge: any): HospitalEntry['discharge'] => {
  if (!discharge || !discharge.date || !discharge.criteria || !isDate(discharge.date) || !isString(discharge.criteria)) {
    throw new Error('Incorrectly formatted discharge: ' + discharge);
  }
  return { date: discharge.date, criteria: discharge.criteria };
};

const parseSickLeave = (sickLeave: any): OccupationalHealthcareEntry['sickLeave'] | undefined => {
  if (!sickLeave) return undefined;
  if (!sickLeave.startDate || !sickLeave.endDate || !isDate(sickLeave.startDate) || !isDate(sickLeave.endDate)) {
    throw new Error('Incorrectly formatted sick leave: ' + sickLeave);
  }
  return { startDate: sickLeave.startDate, endDate: sickLeave.endDate };
};

const parseEmployerName = (employerName: any): string | undefined => {
  if (!employerName) return undefined;
  if (!isString(employerName)) {
    throw new Error('Employer name must be a string: ' + employerName);
  }
  return employerName;
};

const isHealthCheckRating = (param: any): boolean => {
  return Object.values(HealthCheckRating).includes(param);
};

const parseHealthCheckRating = (healthCheckRating: any): HealthCheckRating => {
  if (!isHealthCheckRating(healthCheckRating)) {
    throw new Error('Incorrect health check rating: ' + healthCheckRating);
  }

  return healthCheckRating;
};


const parseDiagnosisCodes = (diagnosisCodes: any): string[] | undefined => {
  if (!diagnosisCodes) return undefined;
  const validDiagnosisCodes = diagnosisService.getEntries().map(diagnosis => diagnosis.code);
   if (!diagnosisCodes.every((diagnosisCode: string) => validDiagnosisCodes.includes(diagnosisCode))) {
    throw new Error('Unknown or incorrectly formatted diagnosis codes: ' + diagnosisCodes);
  }

  return diagnosisCodes;
};

export const toNewEntry = (object: Entry): NewEntry => {
  const newBaseEntry = {
    date: parseDate(object.date),
    description: parseDescription(object.description),
    specialist: parseSpecialist(object.specialist),
    diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes)
  };
  switch (object.type) {
    case 'Hospital':
      return {
        ...newBaseEntry,
        type: object.type,
        discharge: parseDischarge(object.discharge)
      };
    case 'HealthCheck':
      return {
        ...newBaseEntry,
        type: object.type,
        healthCheckRating: parseHealthCheckRating(object.healthCheckRating)
      };
    case 'OccupationalHealthcare':
      return {
        ...newBaseEntry,
        type: object.type,
        sickLeave: parseSickLeave(object.sickLeave),
        employerName: parseEmployerName(object.employerName)
      };
    default:
      return assertNever(object);
  }
};