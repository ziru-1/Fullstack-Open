import express, { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import patientService from '../services/patientService';
import {
  NewPatientEntry,
  Patient,
  PublicPatient,
  Entry,
  NewEntry,
} from '../types';
import {
  NewPatientSchema,
  NewEntrySchema,
  parseDiagnosisCodes,
} from '../utils';

const router = express.Router();

router.get('/', (_req, res: Response<PublicPatient[]>) => {
  res.send(patientService.getPatients());
});

router.get('/:id', (req, res: Response<Patient>) => {
  res.send(patientService.getPatientById(req.params.id));
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

router.post(
  '/:id/entries',
  (
    req: Request<{ id: string }, Entry, NewEntry>,
    res: Response<Entry>,
    next: NextFunction,
  ) => {
    try {
      const parsedEntry = NewEntrySchema.parse(req.body);

      const entryWithCodes = {
        ...parsedEntry,
        diagnosisCodes: parseDiagnosisCodes(req.body),
      };

      const newEntry = patientService.addEntry(req.params.id, entryWithCodes);

      res.json(newEntry);
    } catch (error) {
      next(error);
    }
  },
);

router.use(errorMiddleware);

export default router;
