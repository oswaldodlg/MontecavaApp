import React from 'react'
import Head from 'next/head';
import { Box, Container, Typography, Grid } from '@mui/material';
import { CheckoutForm } from 'src/components/settings/settings-subscription';

export default function Suscripcion() {
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
          <Typography
            sx={{ m: 3, color: 'white' }}
            variant="h4"
          >
            Elige tu Plan
          </Typography>
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
