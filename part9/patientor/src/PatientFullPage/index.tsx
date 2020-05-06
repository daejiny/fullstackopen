import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Header, Icon, Item, List, Button } from "semantic-ui-react";

import { Patient, Entry, Diagnosis } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue, updatePatient } from "../state";
import { useParams } from "react-router-dom";
import HealthRatingBar from "../components/HealthRatingBar";
import { EntryFormValues } from "../AddEntryModal/AddEntryForm";
import AddEntryModal from "../AddEntryModal";

const PatientFullPage: React.FC = () => {
  const [{ patients, diagnoses }, dispatch] = useStateValue();
  const [patient, setPatient] = useState<Patient>();

  const { id } = useParams<{ id: string }>();

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const getPatient = async () => {
    if (!Object.keys(patients).includes(id)) {
      const { data: newPatient } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
      setPatient(newPatient);
    } else {
      setPatient(patients[id]);
    }
  };

  useEffect(() => {
    getPatient();
  });

  const submitNewEntry = async (values: EntryFormValues) => {
    if (!patient) return null;
    try {
      const { data: updatedPatient } = await axios.post<Patient>(
        `${apiBaseUrl}/patients/${patient.id}/entries`,
        values
      );
      dispatch(updatePatient(updatedPatient));
      closeModal();
    } catch (e) {
      console.error(e.response.data);
      setError(e.response.data.error);
    }
  };

  if (!patient) {
    return <Header as='h2'>Person not found</Header>;
  }

  const GenderIcon: React.FC = () => {
    switch (patient.gender) {
      case 'male':
        return <Icon name='mars' />;
      case 'female':
        return <Icon name='venus' />;
      case 'other':
        return <Icon name='genderless' />;
      default:
        return <Icon name='transgender' />;
    }
  };

  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
    switch (entry.type) {
      case 'Hospital': {
        return (
          <Item>
            <Item.Content>
              <Item.Header as='h3'>{entry.date} <Icon name='hospital' /></Item.Header>
              <Item.Meta>Discharged {entry.discharge.date}: {entry.discharge.criteria}</Item.Meta>
              <Item.Description>{entry.description}</Item.Description>
              <Item.Extra>{entry.diagnosisCodes && <DiagnosesList dinput={entry.diagnosisCodes} />}</Item.Extra>
            </Item.Content>
          </Item>
        );
      }
      case 'OccupationalHealthcare': {
        return (
          <Item>
            <Item.Content>
              <Item.Header as='h3'>{entry.date} <Icon name='user md' /></Item.Header>
              {entry.employerName && <Item.Meta>Employer: {entry.employerName}</Item.Meta>}
              {entry.sickLeave && <Item.Meta>Sick leave from {entry.sickLeave.startDate} to {entry.sickLeave.endDate}</Item.Meta>}
              <Item.Description>{entry.description}</Item.Description>
              <Item.Extra>{entry.diagnosisCodes && <DiagnosesList dinput={entry.diagnosisCodes} />}</Item.Extra>
            </Item.Content>
          </Item>
        );
      }
      case 'HealthCheck': {
        return (
          <Item>
            <Item.Content>
              <Item.Header as='h3'>{entry.date} <Icon name='stethoscope' /></Item.Header>
              <Item.Description>{entry.description}</Item.Description>
              <Item.Extra><HealthRatingBar rating={entry.healthCheckRating} showText={true} /></Item.Extra>
            </Item.Content>
          </Item>
        );
      }
      default:
        return assertNever(entry);
    }
  };

  const DiagnosesList: React.FC<{ dinput: Array<Diagnosis['code']> }> = ({ dinput }) => {
    if (!dinput) return <p>no diagnoses</p>;
    return (
      <List bulleted>
        {dinput.map((diagnosis, i) => {
          if (!diagnoses[diagnosis]) return <List.Item key={i}>loading diagnoses</List.Item>;
          return (
            <List.Item key={i}>{diagnosis} {diagnoses[diagnosis].name}</List.Item>
          );
        })}
      </List>
    );
  };

  const EntryList: React.FC<{ entries: Entry[] }> = ({ entries }) => {
    if (!entries.length) return <p>no entries</p>;
    return (
      <Item.Group divided>
        {entries.map(entry => {
          return (
            <EntryDetails key={entry.id} entry={entry} />
          );
        })}
      </Item.Group>
    );
  };

  return (
    <div className="App">
      <Container textAlign="left">
        <Header as='h1'>{patient.name} <GenderIcon /></Header>
        <p>occupation: {patient.occupation}</p>
        <Header as='h2'>entries</Header>
        <AddEntryModal
          modalOpen={modalOpen}
          onSubmit={submitNewEntry}
          error={error}
          onClose={closeModal}
        />
        <Button onClick={() => openModal()}>Add Entry</Button>
        <EntryList entries={patient.entries} />
      </Container>

    </div>
  );
};

export default PatientFullPage;
