/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Response } from 'express';
import { PublicPatient } from '../types';
import express from 'express';
import patientService from '../services/patientService';

const router = express.Router();

router.get('/', (_req, res: Response<PublicPatient[]>) => {
  res.send(patientService.getPatients());
});

router.post('/', (req, res) => {
  const { name, dateOfBirth, ssn, gender, occupation } = req.body;
  const addedEntry = patientService.addPatient(
    name,
    dateOfBirth,
    ssn,
    gender,
    occupation,
  );
  res.json(addedEntry);
});

export default router;
