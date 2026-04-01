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

export interface NewHealthCheckEntry {
  type: 'HealthCheck';
  description: string;
  date: string;
  specialist: string;
  healthCheckRating: HealthCheckRating;
  diagnosisCodes?: string[];
}

interface Props {
  onSubmit: (entry: NewHealthCheckEntry) => Promise<void>;
}

const AddEntryForm = ({ onSubmit }: Props) => {
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(
    HealthCheckRating.Healthy,
  );
  const [diagnosisCodes, setDiagnosisCodes] = useState('');

  const resetForm = () => {
    setDescription('');
    setDate('');
    setSpecialist('');
    setHealthCheckRating(HealthCheckRating.Healthy);
    setDiagnosisCodes('');
    setError(null);
  };

  const handleCancel = () => {
    resetForm();
    setVisible(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const entry: NewHealthCheckEntry = {
      type: 'HealthCheck',
      description,
      date,
      specialist,
      healthCheckRating,
      diagnosisCodes: diagnosisCodes
        ? diagnosisCodes
            .split(',')
            .map((c) => c.trim())
            .filter(Boolean)
        : undefined,
    };

    try {
      await onSubmit(entry);
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
      <Button variant='contained' onClick={() => setVisible(true)}>
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
      <Typography variant='h6'>New HealthCheck Entry</Typography>

      {error && <Alert severity='error'>{error}</Alert>}

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
