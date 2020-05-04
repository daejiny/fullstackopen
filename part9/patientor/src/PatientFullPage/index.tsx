import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Header, Icon } from "semantic-ui-react";

import { Patient } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue } from "../state";
import { useParams } from "react-router-dom";

const PatientFullPage: React.FC = () => {
  // const [{ patients }, dispatch] = useStateValue();
  const [{ patients }] = useStateValue();
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

  return (
    <div className="App">
      <Container textAlign="left">
        <Header as='h1'>{patient.name} <GenderIcon /></Header>
        <p>occupation: {patient.occupation}</p>
      </Container>

    </div>
  );
};

export default PatientFullPage;
