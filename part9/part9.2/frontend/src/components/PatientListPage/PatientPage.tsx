import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import TransgenderIcon from '@mui/icons-material/Transgender';
import { Card, CardContent, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import patientService from '../../services/patients';
import { Diagnosis, Gender, Patient } from '../../types';
import EntryDetails from './EntryDetails';

interface Props {
  diagnoses: Diagnosis[];
}

const PatientPage = ({ diagnoses }: Props) => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);

  useEffect(() => {
    if (id) {
      patientService.getPatientData(id).then((data) => setPatient(data));
    }
  }, [id]);

  const getDiagnosisName = (code: string): string => {
    const diagnosis = diagnoses.find((d) => d.code === code);
    return diagnosis ? diagnosis.name : '';
  };

  if (!patient) {
    return <div>Loading...</div>;
  }

  return (
    <Card>
      <CardContent>
        <Typography variant='h5'>
          {patient.name}{' '}
          {patient.gender === Gender.Male ? (
            <MaleIcon />
          ) : patient.gender === Gender.Female ? (
            <FemaleIcon />
          ) : (
            <TransgenderIcon />
          )}
        </Typography>
        <Typography>SSN: {patient.ssn}</Typography>
        <Typography>Occupation: {patient.occupation}</Typography>
        <Typography variant='h5'>entries</Typography>
        {patient.entries.map((entry) => (
          <EntryDetails
            key={entry.id}
            entry={entry}
            getDiagnosisName={getDiagnosisName}
          />
        ))}
      </CardContent>
    </Card>
  );
};

export default PatientPage;
