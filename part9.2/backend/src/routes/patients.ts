import { Response } from 'express';
import { PublicPatient } from '../types';
import express from 'express';
import patientService from '../services/patientService';

const router = express.Router();

router.get('/', (_req, res: Response<PublicPatient[]>) => {
  res.send(patientService.getPatients());
});

export default router;
