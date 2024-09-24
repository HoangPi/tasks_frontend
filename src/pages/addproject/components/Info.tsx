import * as React from 'react';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { getProjectContext } from '../contexts/ProjectContext';

interface InfoProps {
  totalPrice: string;
}

export default function Info({ totalPrice }: InfoProps) {
  const project = getProjectContext()?.project
  return (
    <React.Fragment>
      <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
        Overview
      </Typography>
      <Typography variant="h4" gutterBottom>
        {totalPrice}
      </Typography>
      <List disablePadding>
        {/* {products.map((product) => (
          <ListItem key={product.name} sx={{ py: 1, px: 0 }}>
            <ListItemText
              sx={{ mr: 2 }}
              primary={product.name}
              secondary={product.desc}
            />
          </ListItem>
        ))} */}
        <ListItem sx={{py: 1, px: 0}}>
          <ListItemText
            sx={{mr: 2}}
            primary={"Project's description"}
            secondary={project?.description.split('\n').map(item => (
                <b>{item}<br /></b>
            ))}
          ></ListItemText>
        </ListItem>
        <ListItem sx={{py: 1, px: 0}}>
          <ListItemText
            sx={{mr: 2}}
            primary={"Your team members"}
            secondary={project?.members.map(item => (
                <>{item} <br></br></>
            ))}
          ></ListItemText>
        </ListItem>
      </List>
    </React.Fragment>
  );
}
