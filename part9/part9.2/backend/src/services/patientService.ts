import { v1 as uuid } from 'uuid';
import patientData from '../../data/patients';
import { NewPatientEntry, Patient, PublicPatient, NewEntry } from '../types';

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

const addEntry = (patientId: string, entry: NewEntry) => {
  const patient = patients.find((p) => p.id === patientId);

  if (!patient) {
    throw new Error('Patient not found');
  }

  const newEntry = {
    id: uuid(),
    ...entry,
  };

  patient.entries.push(newEntry);

  return newEntry;
};

export default {
  getPatients,
  getPatientById,
  addPatient,
  addEntry,
};
