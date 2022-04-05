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




export const AccountProfileUserDetails = ({data, credentials}) => {
  

  return (
    <>
    {/* <form
      onSubmit={formik.handleSubmit}
      {...props}
    > */}
      <Card sx={{minHeight: '33vh'}}>
        {credentials === 'user' ?
         <CardHeader
         subheader="Mi Información"
         title="Perfil"
       /> 
        :  <CardHeader
        subheader="Información del Cliente"
        title="Perfil"
      />
      }
       
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