import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";

import { TextField, SelectField, TypeOption, DiagnosisSelection, NumberField } from "./FormField";
import { FormEntry } from "../types";
import { useStateValue } from "../state";
import { parseString, parseDate, parseHealthCheckRating } from "./entryUtils";

export type EntryFormValues = FormEntry;

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const typeOptions: TypeOption[] = [
  { value: 'Hospital', label: 'Hospital' },
  { value: 'OccupationalHealthcare', label: 'Occupational Healthcare' },
  { value: 'HealthCheck', label: 'Health Check' }
];

export const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <Formik
      initialValues={{
        type: "HealthCheck",
        date: "",
        description: "",
        specialist: "",
        diagnosisCodes: undefined,
        healthCheckRating: 0,
        discharge: {
          date: '',
          criteria: ''
        },
        employerName: '',
        sickLeave: {
          startDate: '',
          endDate: ''
        }
      }}
      onSubmit={onSubmit}
      validate={values => {
        // disable warning as we will be validating each line anyways
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const errors: { [field: string]: any } = {};
        errors.type = parseString(values.type);
        errors.date = parseDate(values.date);
        errors.description = parseString(values.description);
        errors.specialist = parseString(values.specialist);
        if (values.type === 'OccupationalHealthcare') {
          errors.sickLeave = { startDate: null, endDate: null };
          if (values.sickLeave?.startDate || values.sickLeave?.endDate) {
            errors.sickLeave.startDate = parseDate(values.sickLeave?.startDate);
            errors.sickLeave.endDate = parseDate(values.sickLeave?.endDate);
          }
          if (Object.values(errors.sickLeave).every(error => error === null)) errors.sickLeave = null;
          if (values.employerName) errors.employerName = parseString(values.employerName);
        }
        if (values.type === 'Hospital') {
          errors.discharge = { date: null, criteria: null };
          if (values.sickLeave?.startDate || values.sickLeave?.endDate) {
            errors.discharge.date = parseDate(values.discharge?.date);
            errors.discharge.criteria = parseString(values.discharge?.criteria);
          }
          if (Object.values(errors.discharge).every(error => error === null)) errors.discharge = null;
        }
        if (values.type === 'HealthCheck') {
          errors.healthCheckRating = parseHealthCheckRating(values.healthCheckRating);
        }
        if (Object.values(errors).every(error => error === null)) return;
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched, values }) => {
        return (
          <Form className="form ui">
            <SelectField
              label="Entry Type"
              name="type"
              options={typeOptions}
            />
            <Field
              label="Date of Visit"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Description"
              placeholder="Patient is too icy"
              name="description"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Dr. Gucci"
              name="specialist"
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            {values.type === 'HealthCheck' &&
              <Field
                label="Health Check Rating"
                name="healthCheckRating"
                component={NumberField}
                min={0}
                max={3}
              />
            }
            {values.type === 'Hospital' && (
              <>
                <Field
                  label="Discharge Date"
                  placeholder="2020-04-20"
                  name="discharge.date"
                  component={TextField}
                />
                <Field
                  label="Discharge Critera"
                  placeholder="Fumbled the bag"
                  name="discharge.criteria"
                  component={TextField}
                />
              </>
            )}
            {values.type === 'OccupationalHealthcare' && (
              <>
                <Field
                  label="Employer Name"
                  placeholder="1017"
                  name="employerName"
                  component={TextField}
                />
                <Field
                  label="Sick Leave (start date)"
                  placeholder="1969-06-09"
                  name="sickLeave.startDate"
                  component={TextField}
                />
                <Field
                  label="Sick Leave (end date)"
                  placeholder="2020-04-20"
                  name="sickLeave.endDate"
                  component={TextField}
                />
              </>
            )}
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;
