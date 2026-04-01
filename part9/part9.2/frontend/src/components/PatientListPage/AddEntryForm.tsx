import {
  Alert,
  Box,
  Button,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { HealthCheckRating } from '../../types';

// ── New entry payload types (no id) ──────────────────────────────────────────

export interface NewHealthCheckEntry {
  type: 'HealthCheck';
  description: string;
  date: string;
  specialist: string;
  healthCheckRating: HealthCheckRating;
  diagnosisCodes?: string[];
}

export interface NewHospitalEntry {
  type: 'Hospital';
  description: string;
  date: string;
  specialist: string;
  discharge: { date: string; criteria: string };
  diagnosisCodes?: string[];
}

export interface NewOccupationalHealthcareEntry {
  type: 'OccupationalHealthcare';
  description: string;
  date: string;
  specialist: string;
  employerName: string;
  sickLeave?: { startDate: string; endDate: string };
  diagnosisCodes?: string[];
}

export type NewEntry =
  | NewHealthCheckEntry
  | NewHospitalEntry
  | NewOccupationalHealthcareEntry;

type EntryType = NewEntry['type'];

// ── Props ─────────────────────────────────────────────────────────────────────

interface Props {
  onSubmit: (entry: NewEntry) => Promise<void>;
}

// ── Component ─────────────────────────────────────────────────────────────────

const AddEntryForm = ({ onSubmit }: Props) => {
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // shared fields
  const [entryType, setEntryType] = useState<EntryType>('HealthCheck');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState('');

  // HealthCheck
  const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(
    HealthCheckRating.Healthy,
  );

  // Hospital
  const [dischargeDate, setDischargeDate] = useState('');
  const [dischargeCriteria, setDischargeCriteria] = useState('');

  // OccupationalHealthcare
  const [employerName, setEmployerName] = useState('');
  const [sickLeaveStart, setSickLeaveStart] = useState('');
  const [sickLeaveEnd, setSickLeaveEnd] = useState('');

  const resetForm = () => {
    setDescription('');
    setDate('');
    setSpecialist('');
    setDiagnosisCodes('');
    setHealthCheckRating(HealthCheckRating.Healthy);
    setDischargeDate('');
    setDischargeCriteria('');
    setEmployerName('');
    setSickLeaveStart('');
    setSickLeaveEnd('');
    setError(null);
  };

  const handleCancel = () => {
    resetForm();
    setVisible(false);
  };

  const parsedCodes = (): string[] | undefined => {
    const codes = diagnosisCodes
      .split(',')
      .map((c) => c.trim())
      .filter(Boolean);
    return codes.length > 0 ? codes : undefined;
  };

  const buildEntry = (): NewEntry => {
    const base = {
      description,
      date,
      specialist,
      diagnosisCodes: parsedCodes(),
    };

    switch (entryType) {
      case 'HealthCheck':
        return { ...base, type: 'HealthCheck', healthCheckRating };

      case 'Hospital':
        return {
          ...base,
          type: 'Hospital',
          discharge: { date: dischargeDate, criteria: dischargeCriteria },
        };

      case 'OccupationalHealthcare': {
        const sickLeave =
          sickLeaveStart && sickLeaveEnd
            ? { startDate: sickLeaveStart, endDate: sickLeaveEnd }
            : undefined;
        return {
          ...base,
          type: 'OccupationalHealthcare',
          employerName,
          sickLeave,
        };
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await onSubmit(buildEntry());
      resetForm();
      setVisible(false);
    } catch (err: unknown) {
      if (
        err &&
        typeof err === 'object' &&
        'response' in err &&
        err.response &&
        typeof err.response === 'object' &&
        'data' in err.response
      ) {
        const data = err.response.data as { error?: string };
        setError(data.error ?? 'An error occurred');
      } else {
        setError('An unexpected error occurred');
      }
    }
  };

  if (!visible) {
    return (
      <Button
        variant='contained'
        sx={{ mt: 2 }}
        onClick={() => setVisible(true)}
      >
        Add New Entry
      </Button>
    );
  }

  return (
    <Box
      component='form'
      onSubmit={handleSubmit}
      sx={{
        border: '2px dashed grey',
        borderRadius: 2,
        p: 2,
        mt: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: 1.5,
      }}
    >
      <Typography variant='h6'>New Entry</Typography>

      {error && <Alert severity='error'>{error}</Alert>}

      {/* ── Entry type selector ── */}
      <Box>
        <Typography variant='body2' gutterBottom>
          Entry Type
        </Typography>
        <Select
          value={entryType}
          onChange={(e: SelectChangeEvent) => {
            setEntryType(e.target.value as EntryType);
            setError(null);
          }}
          fullWidth
          size='small'
        >
          <MenuItem value='HealthCheck'>Health Check</MenuItem>
          <MenuItem value='Hospital'>Hospital</MenuItem>
          <MenuItem value='OccupationalHealthcare'>
            Occupational Healthcare
          </MenuItem>
        </Select>
      </Box>

      {/* ── Shared fields ── */}
      <TextField
        label='Description'
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        fullWidth
        size='small'
      />
      <TextField
        label='Date'
        type='date'
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
        fullWidth
        size='small'
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        label='Specialist'
        value={specialist}
        onChange={(e) => setSpecialist(e.target.value)}
        required
        fullWidth
        size='small'
      />
      <TextField
        label='Diagnosis Codes (comma-separated)'
        value={diagnosisCodes}
        onChange={(e) => setDiagnosisCodes(e.target.value)}
        fullWidth
        size='small'
        placeholder='e.g. J06.9, M24.2'
      />

      {/* ── HealthCheck fields ── */}
      {entryType === 'HealthCheck' && (
        <Box>
          <Typography variant='body2' gutterBottom>
            Health Check Rating
          </Typography>
          <Select
            value={String(healthCheckRating)}
            onChange={(e: SelectChangeEvent) =>
              setHealthCheckRating(Number(e.target.value) as HealthCheckRating)
            }
            fullWidth
            size='small'
          >
            <MenuItem value={String(HealthCheckRating.Healthy)}>
              0 — Healthy
            </MenuItem>
            <MenuItem value={String(HealthCheckRating.LowRisk)}>
              1 — Low Risk
            </MenuItem>
            <MenuItem value={String(HealthCheckRating.HighRisk)}>
              2 — High Risk
            </MenuItem>
            <MenuItem value={String(HealthCheckRating.CriticalRisk)}>
              3 — Critical Risk
            </MenuItem>
          </Select>
        </Box>
      )}

      {/* ── Hospital fields ── */}
      {entryType === 'Hospital' && (
        <>
          <TextField
            label='Discharge Date'
            type='date'
            value={dischargeDate}
            onChange={(e) => setDischargeDate(e.target.value)}
            required
            fullWidth
            size='small'
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label='Discharge Criteria'
            value={dischargeCriteria}
            onChange={(e) => setDischargeCriteria(e.target.value)}
            required
            fullWidth
            size='small'
          />
        </>
      )}

      {/* ── OccupationalHealthcare fields ── */}
      {entryType === 'OccupationalHealthcare' && (
        <>
          <TextField
            label='Employer Name'
            value={employerName}
            onChange={(e) => setEmployerName(e.target.value)}
            required
            fullWidth
            size='small'
          />
          <Typography variant='body2'>Sick Leave (optional)</Typography>
          <TextField
            label='Sick Leave Start'
            type='date'
            value={sickLeaveStart}
            onChange={(e) => setSickLeaveStart(e.target.value)}
            fullWidth
            size='small'
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label='Sick Leave End'
            type='date'
            value={sickLeaveEnd}
            onChange={(e) => setSickLeaveEnd(e.target.value)}
            fullWidth
            size='small'
            InputLabelProps={{ shrink: true }}
          />
        </>
      )}

      {/* ── Actions ── */}
      <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
        <Button variant='outlined' color='error' onClick={handleCancel}>
          Cancel
        </Button>
        <Button variant='contained' type='submit'>
          Add
        </Button>
      </Box>
    </Box>
  );
};

export default AddEntryForm;
