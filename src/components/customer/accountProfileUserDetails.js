import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  Typography
} from '@mui/material';
import useUpdateUser from 'src/hooks/useUpdateUser';




export const AccountProfileUserDetails = ({data}) => {


  // const {error, isPending, updateUser} = useUpdateUser()

  

  // const formik = useFormik({
  //   initialValues: {
  //     displayName: props.user.displayName,
  //     phoneNumber: props.details[0].phoneNumber,
  //     location: props.details[0].location,
  //   },
  //   enableReinitialize:true, 
  //   validationSchema: Yup.object({
  //     location: Yup
  //       .string()
  //       .max(255)
  //       .required(
  //         'Introduce aqui la ciudad en donde vives, p.e Monterrey'),
  //     displayName: Yup
  //       .string()
  //       .max(255)
  //       .required(
  //         'Se requiere escribir el nombre'),
  //     phoneNumber: Yup
  //       .number()
  //       .nullable()
  //   }),
  //   onSubmit: (values, {setSubmitting}) => {
  //       console.log(values.displayName, values.email, values.phoneNumber)
  //       updateUser(props.user, values.displayName, values.location, values.phoneNumber).then(setSubmitting(false))
  //     }
  // });

  

  return (
    <>
    {/* <form
      onSubmit={formik.handleSubmit}
      {...props}
    > */}
      <Card sx={{minHeight: '33vh'}}>
        <CardHeader
          subheader="Información del Cliente"
          title="Perfil"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
              display="inline-flex"
              justifyContent='center'
              alignItems='flex-end'
            >
              <Typography variant='h6' fontWeight='bold'>Email</Typography>
            </Grid>

            <Grid         
              item
              md={6}
              xs={12}
              display="inline-flex"
              justifyContent='center'
              alignItems='flex-start'
            >
              
              <Typography variant='h7' >{data.email}</Typography>
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
              display="inline-flex"
              justifyContent='center'
              alignItems='flex-end'
            >
              <Typography variant='h6' fontWeight='bold'>Teléfono</Typography>
            </Grid>

            <Grid         
              item
              md={6}
              xs={12}
              display="inline-flex"
              justifyContent='center'
              
            >
              
              <Typography variant='h7' >{data.phoneNumber}</Typography>
            </Grid> 
            <Grid
              item
              md={6}
              xs={12}
              display="inline-flex"
              justifyContent='center'
              alignItems='flex-end'
            >
              <Typography variant='h6' fontWeight='bold'>Ubicación</Typography>
            </Grid>

            <Grid         
              item
              md={6}
              xs={12}
              display="inline-flex"
              justifyContent='center'
              
            >
              
              <Typography variant='h7' >{data.location}</Typography>
            </Grid>   
           
            
          </Grid>
        </CardContent>
        <Divider />
        {/* <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2
          }}
        >
          <Button
            color="primary"
            disabled={formik.isSubmitting}
            size="large"
            type="submit"
            variant="contained"
          >
            Guardar Detalles
          </Button>
        </Box> */}
        
      </Card>
    {/* </form> */}
      {/* <Box>
      {error && <Typography>{error}</Typography>}
      </Box> */}
      </>
  );
};