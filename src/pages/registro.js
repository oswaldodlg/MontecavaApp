import React from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormHelperText,
  Link,
  TextField,
  Typography
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useSignUp } from 'src/hooks/useSignUp';

const Register = () => { 

  const {signup} = useSignUp()

  const router = useRouter();
  

  const formik = useFormik({
    initialValues: {
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      policy: false
    },
    validationSchema: Yup.object({
      email: Yup
        .string()
        .email(
          'Introducir un email válido')
        .max(255)
        .required(
          'Introduce una dirección de email'),
      firstName: Yup
        .string()
        .max(255)
        .required(
          'Se requiere escribir un nombre'),
      lastName: Yup
        .string()
        .max(255)
        .required(
          'Se requiere escribir el apellido'),
      password: Yup
        .string()
        .max(255)
        .required(
          'Se requiere introducir la contraseña'),
        telephone: Yup
        .number()
        
        .required(
        'Se requiere introducir un teléfono'),
      // policy: Yup
      //   .boolean()
      //   .oneOf(
      //     [true],
      //     'This field must be checked'
      //   )
    }),
    onSubmit: () => {
     
        signup(formik.values.email, formik.values.password, formik.values.firstName, formik.values.lastName)
      }
  });

  return (
    <>
      <Head>
        <title>
          Registrar Usuario
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexGrow: 1,
          minHeight: '100%'
        }}
      >
        <Container maxWidth="sm">
        
            <Button
              component="a"
              onClick={() => router.back()}
              startIcon={<ArrowBackIcon fontSize="small" />}
            >
             Regresar
            </Button>
          <form onSubmit={formik.handleSubmit}>
            <Box sx={{ my: 3 }}>
              <Typography
                color="textPrimary"
                variant="h4"
              >
                Registro de Usuario
              </Typography>
              <Typography
                color="textSecondary"
                gutterBottom
                variant="body2"
              >
               En este apartado te puedes registrar
              </Typography>
            </Box>
            <TextField
              error={Boolean(formik.touched.firstName && formik.errors.firstName)}
              fullWidth
              helperText={formik.touched.firstName && formik.errors.firstName}
              label="Nombre"
              margin="normal"
              name="firstName"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.firstName}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.lastName && formik.errors.lastName)}
              fullWidth
              helperText={formik.touched.lastName && formik.errors.lastName}
              label="Apellidos"
              margin="normal"
              name="lastName"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.lastName}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.telephone && formik.errors.telephone)}
              fullWidth
              helperText={formik.touched.telephone && formik.errors.telephone}
              label="Teléfono"
              margin="normal"
              name="telephone"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="number"
              value={formik.values.telephone}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.email && formik.errors.email)}
              fullWidth
              helperText={formik.touched.email && formik.errors.email}
              label="Dirección de Email"
              margin="normal"
              name="email"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="email"
              value={formik.values.email}
              variant="outlined"
            />
            <TextField
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
            {/* <Box
              sx={{
                alignItems: 'center',
                display: 'flex',
                ml: -1
              }}
            >
              <Checkbox
                checked={formik.values.policy}
                name="policy"
                onChange={formik.handleChange}
              />
              <Typography
                color="textSecondary"
                variant="body2"
              >
                I have read the
                {' '}
                <NextLink
                  href="#"
                  passHref
                >
                  <Link
                    color="primary"
                    underline="always"
                    variant="subtitle2"
                  >
                    Terms and Conditions
                  </Link>
                </NextLink>
              </Typography>
            </Box> */}
            {Boolean(formik.touched.policy && formik.errors.policy) && (
              <FormHelperText error>
                {formik.errors.policy}
              </FormHelperText>
            )}
            <Box sx={{ py: 2 }}>
              <Button
                color="primary"
                disabled={formik.isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Registrarme
              </Button>
            </Box>
            {/* <Typography
              color="textSecondary"
              variant="body2"
            >
              Have an account?
              {' '}
              <NextLink
                href="/login"
                passHref
              >
                <Link
                  variant="subtitle2"
                  underline="hover"
                >
                  Sign In
                </Link>
              </NextLink>
            </Typography> */}
          </form>
        </Container>
      </Box>
    </>
  );
};

export default Register;