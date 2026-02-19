import patientData from '../../data/patients';
import { Patient, PublicPatient } from '../types';

const patients: Patient[] = patientData;

const getPatients = (): PublicPatient[] => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return patients.map(({ ssn, ...rest }) => rest);
};

export default {
  getPatients,
};
