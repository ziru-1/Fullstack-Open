import axios from 'axios';
import { Diagnosis } from '../types';

import { apiBaseUrl } from '../constants';

const diagnosesUrl = apiBaseUrl + '/diagnoses';

const getAllDiagnoses = async (): Promise<Diagnosis[]> => {
  const { data } = await axios.get<Diagnosis[]>(`${diagnosesUrl}`);
  return data;
};

export default {
  getAllDiagnoses,
};
