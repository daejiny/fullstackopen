import { HealthCheckRating } from '../types';
/* eslint-disable @typescript-eslint/no-explicit-any */

export const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const requiredError = "Field is required";
const malformattedError = "Field has invalid values";

export const parseString = (input: any): string | null => {
  if (!input) {
    return requiredError;
  }
  if (!isString(input)) {
    return malformattedError;
  }
  return null;
};

export const parseDate = (requiredDate: any): string | null => {
  if (!requiredDate) {
    return requiredError;
  }
  if (!isDate(requiredDate)) {
    return malformattedError;
  }
  return null;
};

const isHealthCheckRating = (param: any): boolean => {
  return Object.values(HealthCheckRating).includes(param);
};

export const parseHealthCheckRating = (healthCheckRating: any): string | null => {
  if (!isHealthCheckRating(healthCheckRating)) {
    return malformattedError;
  }
  return null;
};