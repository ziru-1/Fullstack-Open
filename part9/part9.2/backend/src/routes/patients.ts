import express, { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import patientService from '../services/patientService';
import { NewPatientEntry, Patient, PublicPatient } from '../types';
import { NewPatientSchema } from '../utils';

const router = express.Router();

router.get('/', (_req, res: Response<PublicPatient[]>) => {
  res.send(patientService.getPatients());
});

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    NewPatientSchema.parse(req.body);
    next();
  } catch (error) {
    next(error);
  }
};

const errorMiddleware = (
  error: unknown,
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues });
  } else {
    next(error);
  }
};

router.post(
  '/',
  newPatientParser,
  (req: Request<unknown, unknown, NewPatientEntry>, res: Response<Patient>) => {
    const addedEntry = patientService.addPatient(req.body);
    res.json(addedEntry);
  },
);

router.use(errorMiddleware);

export default router;
