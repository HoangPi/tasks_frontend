import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid2';
import OutlinedInput from '@mui/material/OutlinedInput';
import { styled } from '@mui/system';
import { getProjectContext } from '../contexts/ProjectContext';

const FormGrid = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

export default function FirstForm() {
  const projectContext = getProjectContext()
  return (
    <Grid container spacing={3}>
      <FormGrid size={{ xs: 12 }}>
        <FormLabel htmlFor="Projectname" required>
          Project's name
        </FormLabel>
        <OutlinedInput
          id="Projectname"
          name="Projectname"
          type="projectname"
          placeholder="Project's name"
          required
          size="small"
          value={projectContext?.project.name}
          onChange={(ev)=> projectContext && projectContext.setProject((p) => ({...p, name: ev.target.value}))}
        />
      </FormGrid>
      <FormGrid size={{ xs: 12 }}>
        <FormLabel htmlFor="project-description">Project description</FormLabel>
        <OutlinedInput
          id="project-description"
          name="project-description"
          type="project-description"
          placeholder="Description"
          autoComplete="shipping address-line2"
          required
          size="small"
          value={projectContext?.project.description}
          onChange={(ev)=> projectContext && projectContext.setProject((p) => ({...p, description: ev.target.value}))}
          multiline={true}
        />
      </FormGrid>
    </Grid>
  );
}
