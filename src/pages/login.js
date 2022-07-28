import React, {useEffect} from 'react';
import Head from 'next/head';
import NextImage from 'next/image'
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Container, Grid,TextField, Typography, Alert } from '@mui/material';
import { useLogin } from '../hooks/useLogin';
import Link from 'next/link'

import Logo from '../../assets/img/MontecavaLogo.png';

import { useAuthContext } from 'src/hooks/useAuthContext';

const Login = () => {

  const {login, error, isPending} = useLogin()
  const {authIsReady, user, data} = useAuthContext()

  const router = useRouter();

  useEffect(() => {
    if (user && authIsReady && data && data.credentials==='admin'){
      router.push("/admin")
    } 
    else if (user && authIsReady && data && data.credentials==='user') {
      data.subscriptionId ?  router.push("/user") : router.push("/user/suscripcion")
    } 
  }, [user, data])

  
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
            minHeight: '100vh',
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
                </Grid>
              </Grid>
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
                <Link href={'/registro'} passHref>
                <Button
                  color="primary"
                  fullWidth
                  size="large"
                  sx={{placeContent: 'end'}}
                >
                  ¿No tienes una cuenta? Regístrate
                </Button>
                </Link>
              </Box>
            </form>
          </Container>
        </Box>
      </>
    )
  }
};

export default Login;
