import { v1 as uuid } from 'uuid';
import patientData from '../../data/patients';
import { NewPatientEntry, Patient, PublicPatient } from '../types';

const patients: Patient[] = patientData;

const getPatients = (): PublicPatient[] => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return patients.map(({ ssn, ...rest }) => rest);
};

const getPatientById = (id: string): Patient | undefined => {
  return patients.find((patient) => patient.id === id);
};

const addPatient = (entry: NewPatientEntry): Patient => {
  const newPatientEntry = {
    id: uuid(),
    ...entry,
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  getPatients,
  getPatientById,
  addPatient,
};
