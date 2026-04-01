import { Box, List, ListItem, Typography } from '@mui/material';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import WorkIcon from '@mui/icons-material/Work';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Entry } from '../../types';
import { assertNever } from '../../utils';

interface Props {
  entry: Entry;
  getDiagnosisName: (code: string) => string;
}

const EntryDetails = ({ entry, getDiagnosisName }: Props) => {
  const baseStyle = {
    border: '2px solid black',
    borderRadius: '5px',
    padding: '10px',
    marginTop: '10px',
  };

  const renderHealthRating = (rating: number) => {
    const colors = ['green', 'yellow', 'orange', 'red'];
    return <FavoriteIcon style={{ color: colors[rating] }} />;
  };

  switch (entry.type) {
    case 'Hospital':
      return (
        <Box style={baseStyle} sx={{ mb: 2 }}>
          <Typography>
            {entry.date} <LocalHospitalIcon />
          </Typography>
          <Typography>
            <em>{entry.description}</em>
          </Typography>

          {entry.diagnosisCodes && entry.diagnosisCodes.length > 0 && (
            <List sx={{ listStyleType: 'disc', pl: 4 }}>
              {entry.diagnosisCodes.map((code) => (
                <ListItem key={code} sx={{ display: 'list-item', py: 0 }}>
                  <Typography variant='body2'>
                    {code} {getDiagnosisName(code)}
                  </Typography>
                </ListItem>
              ))}
            </List>
          )}

          {entry.discharge && (
            <Typography>
              <strong>Discharge: </strong>
              {entry.discharge.date} - {entry.discharge.criteria}
            </Typography>
          )}

          <Typography>diagnose by: {entry.specialist}</Typography>
        </Box>
      );
    case 'HealthCheck':
      return (
        <Box style={baseStyle} sx={{ mb: 2 }}>
          <Typography>
            {entry.date} <MedicalServicesIcon />
          </Typography>
          <Typography>
            <em>{entry.description}</em>
          </Typography>

          {entry.diagnosisCodes && entry.diagnosisCodes.length > 0 && (
            <List sx={{ listStyleType: 'disc', pl: 4 }}>
              {entry.diagnosisCodes.map((code) => (
                <ListItem key={code} sx={{ display: 'list-item', py: 0 }}>
                  <Typography variant='body2'>
                    {code} {getDiagnosisName(code)}
                  </Typography>
                </ListItem>
              ))}
            </List>
          )}

          <Typography>{renderHealthRating(entry.healthCheckRating)}</Typography>
          <Typography>diagnose by: {entry.specialist}</Typography>
        </Box>
      );
    case 'OccupationalHealthcare':
      return (
        <Box style={baseStyle} sx={{ mb: 2 }}>
          <Typography>
            {entry.date} <WorkIcon /> {entry.employerName}
          </Typography>
          <Typography>
            <em>{entry.description}</em>
          </Typography>

          {entry.diagnosisCodes && entry.diagnosisCodes.length > 0 && (
            <List sx={{ listStyleType: 'disc', pl: 4 }}>
              {entry.diagnosisCodes.map((code) => (
                <ListItem key={code} sx={{ display: 'list-item', py: 0 }}>
                  <Typography variant='body2'>
                    {code} {getDiagnosisName(code)}
                  </Typography>
                </ListItem>
              ))}
            </List>
          )}

          {entry.sickLeave && (
            <Typography>
              sick leave: {entry.sickLeave?.startDate} -{' '}
              {entry.sickLeave?.endDate}
            </Typography>
          )}
          <Typography>diagnose by: {entry.specialist}</Typography>
        </Box>
      );
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;
