import React, {useState, useEffect} from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import NextImage from 'next/image'
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Container, Grid, Link, TextField, Typography, Alert } from '@mui/material';
import { useLogin } from '../hooks/useLogin';

import Logo from '../../assets/img/MontecavaLogo.png';

import { withPublic } from '../hooks/useRoutes';
import { useAuthContext } from 'src/hooks/useAuthContext';

const Login = () => {

  const [isVisible, setIsVisible] = useState(false)
  const {login, error, isPending} = useLogin()
  const {authIsReady, user, credentials} = useAuthContext()

  useEffect(() => {
    if (user)
    {router.push("/")} 
  }, [user])

  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      email: Yup
        .string()
        .email(
          'Introduce un email válido')
        .max(255)
        .required(
          'Se requiere introducir un email'),
      password: Yup
        .string()
        .max(255)
        .required(
          'Se requiere introducir la contraseña')
    }),

    onSubmit: () => {
     
        login(formik.values.email, formik.values.password)
       
      }
  });

  if(user){
    return <>
    
    </>
  } else {
    return (
      <>
        <Head>
          <title>Iniciar Sesión</title>
        </Head>
        <Box
          component="main"
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexGrow: 1,
            minHeight: '100%',
            backgroundColor:'#020226',
           
          }}
        >
          <Container maxWidth="sm">
            <Grid item textAlign='end'>
              <NextImage src={Logo.src} height={150} width={150} />
            </Grid>
            <form onSubmit={formik.handleSubmit}>
              <Box sx={{ my: 3, }}>
                <Typography
                  color="white"
                  variant="h4"
                >
                  Iniciar Sesión
                </Typography>
                <Typography
                  color="white"
                  gutterBottom
                  variant="body2"
                >
                  Inicia Sesión para accesar a Montecava App
                </Typography>
              </Box>
              <Grid
                container
                spacing={3}
              >
                <Grid
                  item
                  xs={12}
                  md={6}
                >
                  {/* <Button
                    color="info"
                    fullWidth
                    startIcon={<FacebookIcon />}
                    onClick={formik.handleSubmit}
                    size="large"
                    variant="contained"
                  >
                    Login with Facebook
                  </Button>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={6}
                >
                  <Button
                    fullWidth
                    color="error"
                    startIcon={<GoogleIcon />}
                    onClick={formik.handleSubmit}
                    size="large"
                    variant="contained"
                  >
                    Login with Google
                  </Button> */}
                </Grid>
              </Grid>
              {/* <Box
                sx={{
                  pb: 1,
                  pt: 3
                }}
              >
                <Typography
                  align="center"
                  color="textSecondary"
                  variant="body1"
                >
                  or login with email address
                </Typography>
              </Box> */}
              <TextField
                error={Boolean(formik.touched.email && formik.errors.email)}
                fullWidth
                helperText={formik.touched.email && formik.errors.email}
                sx={{ input: { color: 'white' }, label: {color: 'white'} }} 
                label="Email"
                margin="normal"
                name="email"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="email"
                value={formik.values.email}
                variant="outlined"
              />
              <TextField
               sx={{ input: { color: 'white' }, label: {color: 'white'}}} 
                error={Boolean(formik.touched.password && formik.errors.password)}
                fullWidth
                helperText={formik.touched.password && formik.errors.password}
                label="Contraseña"
                margin="normal"
                name="password"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="password"
                value={formik.values.password}
                variant="outlined"
              />
              <Box sx={{ py: 2 }}>
                {error && <Alert severity="error">{error}</Alert>}
                <Button
                  color="primary"
                  disabled={isPending && formik.isSubmitting}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                >
                  Iniciar Sesión
                </Button>
              </Box>
              {/* <Typography
                color="textSecondary"
                variant="body2"
              >
                Don&apos;t have an account?
                {' '}
                <NextLink
                  href="/register"
                >
                  <Link
                    to="/register"
                    variant="subtitle2"
                    underline="hover"
                    sx={{
                      cursor: 'pointer'
                    }}
                  >
                    Sign Up
                  </Link>
                </NextLink>
              </Typography> */}
            </form>
          </Container>
        </Box>
      </>
    )
  }
};

export default Login;
