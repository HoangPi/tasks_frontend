import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider, PaletteMode } from '@mui/material/styles';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import FirstForm from './components/FirstForm';
import getCheckoutTheme from './theme/getCheckoutTheme';
import Info from './components/Info';
import InfoMobile from './components/InfoMobile';
import PaymentForm from './components/TeamMemberForm';
import Review from './components/Review';
import SitemarkIcon from './components/SitemarkIcon';
import TemplateFrame from './TemplateFrame';
import { getProjectContext, Project, ProjectContext } from './contexts/ProjectContext';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { CreateProject } from '../../store/project';

const steps = ['Project', 'Team members', 'Review your Project'];
function getStepContent(step: number) {
  switch (step) {
    case 0:
      return <FirstForm />;
    case 1:
      return <PaymentForm />;
    case 2:
      return <Review />;
    default:
      throw new Error('Unknown step');
  }
}
export default function AddProject() {
  const [mode, setMode] = React.useState<PaletteMode>('light');
  const [showCustomTheme, setShowCustomTheme] = React.useState(true);
  const checkoutTheme = createTheme(getCheckoutTheme(mode));
  const defaultTheme = createTheme({ palette: { mode } });
  const [activeStep, setActiveStep] = React.useState(0);
  const userState = useAppSelector(state => state.user)
  const dispatch = useAppDispatch()
  // This code only runs on the client side, to determine the system color preference
  React.useEffect(() => {
    // Check if there is a preferred mode in localStorage
    const savedMode = localStorage.getItem('themeMode') as PaletteMode | null;
    if (savedMode) {
      setMode(savedMode);
    } else {
      // If no preference is found, it uses system preference
      const systemPrefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)',
      ).matches;
      setMode(systemPrefersDark ? 'dark' : 'light');
    }
  }, []);

  const toggleColorMode = () => {
    const newMode = mode === 'dark' ? 'light' : 'dark';
    setMode(newMode);
    localStorage.setItem('themeMode', newMode); // Save the selected mode to localStorage
  };
  const toggleCustomTheme = () => {
    setShowCustomTheme((prev) => !prev);
  };
  const handleNext = async () => {
    if(activeStep === steps.length - 1){
      try{
        const response: any = await dispatch(CreateProject(project))
        if(response.error?.message){
          return
        }
        setActiveStep(activeStep + 1);
      }
      catch(err){
        console.error(err)
      }
    }
    else{
      setActiveStep(activeStep + 1);
    }
  };
  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };
  const user = useAppSelector(state=>state.user)
  const [project, setProject] = React.useState<Project>({
    name: '',
    description: '',
    members: [],
    owner: user.username
  })
  return (
    <ProjectContext.Provider value={{project, setProject}}>
      <TemplateFrame
        toggleCustomTheme={toggleCustomTheme}
        showCustomTheme={showCustomTheme}
        mode={mode}
        toggleColorMode={toggleColorMode}
      >
        <ThemeProvider theme={showCustomTheme ? checkoutTheme : defaultTheme}>
          <CssBaseline enableColorScheme />

          <Grid container sx={{ height: { xs: '100%', sm: '100dvh' } }}>
            <Grid
              size={{ xs: 12, sm: 5, lg: 4 }}
              sx={{
                display: { xs: 'none', md: 'flex' },
                flexDirection: 'column',
                backgroundColor: 'background.paper',
                borderRight: { sm: 'none', md: '1px solid' },
                borderColor: { sm: 'none', md: 'divider' },
                alignItems: 'start',
                pt: 16,
                px: 10,
                gap: 4,
              }}
            >
              <SitemarkIcon />
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  flexGrow: 1,
                  width: '100%',
                  maxWidth: 500,
                }}
              >
                <Info totalPrice={project.name} />
              </Box>
            </Grid>
            <Grid
              size={{ sm: 12, md: 7, lg: 8 }}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                maxWidth: '100%',
                width: '100%',
                backgroundColor: { xs: 'transparent', sm: 'background.default' },
                alignItems: 'start',
                pt: { xs: 6, sm: 16 },
                px: { xs: 2, sm: 10 },
                gap: { xs: 4, md: 8 },
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: { sm: 'space-between', md: 'flex-end' },
                  alignItems: 'center',
                  width: '100%',
                  maxWidth: { sm: '100%', md: 600 },
                }}
              >
                <Box
                  sx={{
                    display: { xs: 'none', md: 'flex' },
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end',
                    flexGrow: 1,
                  }}
                >
                  <Stepper
                    id="desktop-stepper"
                    activeStep={activeStep}
                    sx={{ width: '100%', height: 40 }}
                  >
                    {steps.map((label) => (
                      <Step
                        sx={{ ':first-of-type': { pl: 0 }, ':last-child': { pr: 0 } }}
                        key={label}
                      >
                        <StepLabel>{label}</StepLabel>
                      </Step>
                    ))}
                  </Stepper>
                </Box>
              </Box>
              <Card sx={{ display: { xs: 'flex', md: 'none' }, width: '100%' }}>
                <CardContent
                  sx={{
                    display: 'flex',
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <Typography variant="subtitle2" gutterBottom>
                      Selected products
                    </Typography>
                    <Typography variant="body1">
                      {project.name}
                    </Typography>
                  </div>
                  <InfoMobile totalPrice={project.name} />
                </CardContent>
              </Card>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  flexGrow: 1,
                  width: '100%',
                  maxWidth: { sm: '100%', md: 600 },
                  maxHeight: '720px',
                  gap: { xs: 5, md: 'none' },
                }}
              >
                <Stepper
                  id="mobile-stepper"
                  activeStep={activeStep}
                  alternativeLabel
                  sx={{ display: { sm: 'flex', md: 'none' } }}
                >
                  {steps.map((label) => (
                    <Step
                      sx={{
                        ':first-of-type': { pl: 0 },
                        ':last-child': { pr: 0 },
                        '& .MuiStepConnector-root': { top: { xs: 6, sm: 12 } },
                      }}
                      key={label}
                    >
                      <StepLabel
                        sx={{ '.MuiStepLabel-labelContainer': { maxWidth: '70px' } }}
                      >
                        {label}
                      </StepLabel>
                    </Step>
                  ))}
                </Stepper>
                {activeStep === steps.length ? (
                  <Stack spacing={2} useFlexGap>
                    <Typography variant="h1">📦</Typography>
                    <Typography variant="h5">Thank you for your order!</Typography>
                    <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                      Your order number is
                      <strong>&nbsp;#140396</strong>. We have emailed your order
                      confirmation and will update you once its shipped.
                    </Typography>
                    <Button
                      variant="contained"
                      sx={{ alignSelf: 'start', width: { xs: '100%', sm: 'auto' } }}
                    >
                      Go to my orders
                    </Button>
                  </Stack>
                ) : (
                  <React.Fragment>
                    {getStepContent(activeStep)}
                    <Box
                      sx={[
                        {
                          display: 'flex',
                          flexDirection: { xs: 'column-reverse', sm: 'row' },
                          alignItems: 'end',
                          flexGrow: 1,
                          gap: 1,
                          pb: { xs: 12, sm: 0 },
                          mt: { xs: 2, sm: 0 },
                          mb: '60px',
                        },
                        activeStep !== 0
                          ? { justifyContent: 'space-between' }
                          : { justifyContent: 'flex-end' },
                      ]}
                    >
                      {activeStep !== 0 && (
                        <Button
                          startIcon={<ChevronLeftRoundedIcon />}
                          onClick={handleBack}
                          variant="text"
                          sx={{ display: { xs: 'none', sm: 'flex' } }}
                        >
                          Previous
                        </Button>
                      )}
                      {activeStep !== 0 && (
                        <Button
                          startIcon={<ChevronLeftRoundedIcon />}
                          onClick={handleBack}
                          variant="outlined"
                          fullWidth
                          sx={{ display: { xs: 'flex', sm: 'none' } }}
                        >
                          Previous
                        </Button>
                      )}
                      <Button
                        variant="contained"
                        endIcon={<ChevronRightRoundedIcon />}
                        onClick={handleNext}
                        sx={{ width: { xs: '100%', sm: 'fit-content' } }}
                      >
                        {activeStep === steps.length - 1 ? 'Create' : 'Next'}
                      </Button>
                    </Box>
                  </React.Fragment>
                )}
              </Box>
            </Grid>
          </Grid>
        </ThemeProvider>
      </TemplateFrame>
    </ProjectContext.Provider>
  );
}
