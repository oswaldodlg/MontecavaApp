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
  Typography,
  Modal,
  Grid
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useSignUp } from 'src/hooks/useSignUp';
import { SubscriptionInfo, TyCText } from './TerminosyCondiciones';

const Register = () => { 

  const {signup, isPending} = useSignUp()

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
            <Box
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
                He leido y acepto los
                {' '}
                <TyCModal />
                {/* <NextLink
                  href="https://montecavaconsultores.com/TerminosyCondiciones"
                  passHref
                >
                  <Link
                    color="primary"
                    underline="always"
                    variant="subtitle2"
                  >
                    
                  </Link>
                </NextLink> */}
              </Typography>
            </Box>
            {Boolean(formik.touched.policy && formik.errors.policy) && (
              <FormHelperText error>
                {formik.errors.policy}
              </FormHelperText>
            )}
            <Box sx={{ py: 2 }}>
              {!isPending ? 
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
              :
              <Button
                color="primary"
                disabled
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Procesando...
              </Button>
              }
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


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const TyCModal = () => {

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
    <Link onClick={handleOpen} sx={{cursor: 'pointer'}}>Términos y Condiciones</Link>
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"

    >
      <Box sx={style}>
      <Grid container sx={{width: '100%', height:'50vh', overflowY: 'scroll'}} >
        <TyCText />
      </Grid>
      </Box>
    </Modal>
    </>
  )
}


export default Register;