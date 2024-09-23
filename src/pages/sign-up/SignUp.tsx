import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import {
  createTheme,
  ThemeProvider,
  styled,
  PaletteMode,
} from '@mui/material/styles';
import getSignUpTheme from './theme/getSignUpTheme';
import { SitemarkIcon } from './CustomIcons';
import TemplateFrame from './TemplateFrame';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { defaultInput } from '../../constants/types';
import { AxiosClient } from '../../APIs/axiosClient';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  [theme.breakpoints.up('sm')]: {
    width: '450px',
  },
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
  height: '100%',
  padding: 4,
  backgroundImage:
    'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
  backgroundRepeat: 'no-repeat',
  ...theme.applyStyles('dark', {
    backgroundImage:
      'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
  }),
}));

export default function SignUp() {
  const [username, setUsername] = useState(defaultInput)
  const [password, setPassword] = useState(defaultInput)
  const [retypePassword, setRetypePassword] = useState(defaultInput)
  const [name, setName] = useState(defaultInput)
  const [isSending, setIsSending] = useState(false)

  const [mode, setMode] = useState<PaletteMode>('light');
  const [showCustomTheme, setShowCustomTheme] = useState(true);
  const defaultTheme = createTheme({ palette: { mode } });
  const SignUpTheme = createTheme(getSignUpTheme(mode));
  const navigate = useNavigate()
  // This code only runs on the client side, to determine the system color preference
  useEffect(() => {
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

  const validateInputs = () => {
    let isValid = true;

    if (!username.value) {
      setUsername({ value: '', error: "Please enter a username" })
      isValid = false;
    } else {
      setUsername({ value: username.value, error: null })
    }

    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/.test(password.value)) {
      setPassword({ value: '', error: 'Password must contains at least 6 character, 1 uppercase, 1 lopwercase and 1 number' })
      isValid = false;
    } else {
      setPassword({ value: password.value, error: null })
    }

    if (!name.value) {
      setName({ value: '', error: "Name is required" })
      isValid = false;
    } else {
      setName({ value: name.value, error: null })
    }

    if (retypePassword.value !== password.value) {
      setRetypePassword({ value: '', error: "Password does not match" })
      isValid = false;
    } else {
      setRetypePassword({ value: retypePassword.value, error: null })
    }

    return isValid;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateInputs()) return
    AxiosClient.post('/signup', {
      name: name.value,
      username: username.value,
      password: password.value,
    }).then(()=>navigate('/signin')).catch(err=>{
      if(err.status === 409){
        setUsername({value: '', error: "Username has aleary been taken"})
      }
      else setUsername({value:'', error: "Internal error, please try again later"})
    }).finally(()=>setIsSending(false))
    setIsSending(true)
  };

  return (
    <TemplateFrame
      toggleCustomTheme={toggleCustomTheme}
      showCustomTheme={showCustomTheme}
      mode={mode}
      toggleColorMode={toggleColorMode}
    >
      <ThemeProvider theme={showCustomTheme ? SignUpTheme : defaultTheme}>
        <CssBaseline enableColorScheme />

        <SignUpContainer direction="column" justifyContent="space-between">
          <Stack
            sx={{
              justifyContent: 'center',
              height: '100dvh',
              p: 2,
            }}
          >
            <Card variant="outlined">
              <SitemarkIcon />
              <Typography
                component="h1"
                variant="h4"
                sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
              >
                Sign up
              </Typography>
              <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
              >
                <FormControl>
                  <FormLabel htmlFor="name">Full name</FormLabel>
                  <TextField
                    autoComplete="name"
                    name="name"
                    fullWidth
                    id="name"
                    placeholder="Jon Snow"
                    error={Boolean(name.error)}
                    helperText={name.error}
                    value={name.value}
                    onChange={(ev) => setName({ value: ev.target.value, error: null })}
                    color={name.error ? 'error' : 'primary'}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="email">Username</FormLabel>
                  <TextField
                    fullWidth
                    id="username"
                    placeholder="your_username"
                    name="username"
                    autoComplete="username"
                    variant="outlined"
                    value={username.value}
                    onChange={(ev) => setUsername({ value: ev.target.value, error: null })}
                    error={Boolean(username.error)}
                    helperText={username.error}
                    color={username.error ? 'error' : 'primary'}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <TextField
                    fullWidth
                    name="password"
                    placeholder="••••••"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    variant="outlined"
                    value={password.value}
                    onChange={(ev) => setPassword({ value: ev.target.value, error: null })}
                    error={Boolean(password.error)}
                    helperText={password.error}
                    color={password.error ? 'error' : 'primary'}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <TextField
                    fullWidth
                    name="retype-password"
                    placeholder="••••••"
                    type="password"
                    id="retype-password"
                    variant="outlined"
                    value={retypePassword.value}
                    onChange={(ev) => setRetypePassword({ value: ev.target.value, error: null })}
                    error={Boolean(retypePassword.error)}
                    helperText={retypePassword.error}
                    color={retypePassword.error ? 'error' : 'primary'}
                  />
                </FormControl>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={isSending}
                >
                  Sign up
                </Button>
                <Typography sx={{ textAlign: 'center' }}>
                  Already have an account?{' '}
                  <span>
                    <Link
                      onClick={(ev) => {
                        ev.preventDefault()
                        if (isSending) return
                        navigate("/signin")
                      }}
                      href="#"
                      variant="body2"
                      sx={{ alignSelf: 'center' }}
                    >
                      Sign in
                    </Link>
                  </span>
                </Typography>
              </Box>
            </Card>
          </Stack>
        </SignUpContainer>
      </ThemeProvider>
    </TemplateFrame>
  );
}
