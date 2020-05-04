import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Header, Icon, Item, List } from "semantic-ui-react";

import { Patient, Entry, Diagnosis } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue } from "../state";
import { useParams } from "react-router-dom";
import HealthRatingBar from "../components/HealthRatingBar";

const PatientFullPage: React.FC = () => {
  // const [{ patients }, dispatch] = useStateValue();
  const [{ patients, diagnoses }] = useStateValue();
  const [patient, setPatient] = useState<Patient>();

  const { id } = useParams<{ id: string }>();

  // const [error, setError] = React.useState<string | undefined>();

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
              {/* <Item.Extra>{entry.diagnosisCodes && <DiagnosesList dinput={entry.diagnosisCodes} />}</Item.Extra> */}
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
        <EntryList entries={patient.entries} />
      </Container>

    </div>
  );
};

export default PatientFullPage;
