import React from 'react'
import Head from 'next/head';
import { Box, Container, Typography, Grid, Button } from '@mui/material';
import { CheckoutForm } from 'src/components/settings/settings-subscription';
import { useLogout } from 'src/hooks/useLogout';

export default function Suscripcion() {

  const {logout} = useLogout()

  return(
    <>
      <Head>
        <title>
          Suscripción
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
          backgroundColor: 'neutral.900'
        }}
      >
        <Container maxWidth="lg">
          <Grid container sx={{alignItems: 'center'}}>
          <Grid item md={6}>
          <Typography
            sx={{ m: 3, color: 'white' }}
            variant="h4"
          >
            Elige tu Plan
          </Typography>
          </Grid>
          <Grid item md={6} sx={{textAlign: 'end'}}>
          <Button onClick={logout} variant='contained' sx={{placeSelf:'end'}}>Cerrar Sesión</Button>
          </Grid>
          </Grid>
          {/* <SettingsNotifications /> */}
          <Box sx={{ pt: 3 }}>
            <Grid container>
            <Grid item xs={12} md={12} padding={2}>
                <CheckoutForm />
              </Grid>              
            </Grid>
          </Box>
          
        </Container>
      </Box>
    </>
  )
}
