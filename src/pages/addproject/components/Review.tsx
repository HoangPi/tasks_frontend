import * as React from 'react';

import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { getProjectContext } from '../contexts/ProjectContext';

const addresses = ['1 MUI Drive', 'Reactville', 'Anytown', '99999', 'USA'];
const payments = [
  { name: 'Card type:', detail: 'Visa' },
  { name: 'Card holder:', detail: 'Mr. John Smith' },
  { name: 'Card number:', detail: 'xxxx-xxxx-xxxx-1234' },
  { name: 'Expiry date:', detail: '04/2024' },
];

export default function Review() {
  const ProjectContext = getProjectContext()
  return (
    <Stack spacing={2}>
      <List disablePadding>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Project" />
        </ListItem>
        <ListItem sx={{ py: 1, px: 0 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            <b>{ProjectContext?.project.name}</b>
          </Typography>
        </ListItem>
      </List>
      <Divider />
      <Stack
        direction="column"
        divider={<Divider flexItem />}
        spacing={2}
        sx={{ my: 2 }}
      >
        <div>
          <Typography variant="subtitle2" gutterBottom>
            Project's description
          </Typography>

          <Typography gutterBottom sx={{ color: 'text.secondary' }}>
            {ProjectContext?.project.description.split('\n').map(item => <b>{item} <br /></b>)}
          </Typography>
        </div>
        <div>
          <Typography variant="subtitle2" gutterBottom>
            Team members
          </Typography>
          <Grid container>
            {ProjectContext?.project.members.map((item, key)=>(
              <Stack
                key={key}
                direction={"row"}
                spacing={1}
                useFlexGap
                sx={{width: '100%', mb: 1}}
              >
                <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                    {item}
                  </Typography>
              </Stack>
            ))}
          </Grid>
        </div>
      </Stack>
    </Stack>
  );
}
