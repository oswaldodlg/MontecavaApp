import React, { useEffect } from 'react'
import Head from 'next/head';
import { Box, Container, Typography, Grid } from '@mui/material';
import { DashboardLayout } from 'src/components/dashboard-layout';
import { SettingsNotifications } from 'src/components/settings/settings-notifications';
import { SettingsPassword } from 'src/components/settings/settings-password';
import { CheckoutForm } from 'src/components/settings/settings-subscription';
import { ClientPortal } from 'src/components/settings/portal-client';

function Settings() {
  return(
  <>
    <Head>
      <title>
        Ajustes
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth="lg">
        <Typography
          sx={{ mb: 3 }}
          variant="h4"
        >
          Ajustes
        </Typography>
        {/* <SettingsNotifications /> */}
        <Box sx={{ pt: 3 }}>
          <Grid container>
              <Grid item xs={12} md={12} padding={2}>
              <ClientPortal />
            </Grid>
            <Grid item xs={12} md={12} padding={2}>
              <SettingsPassword />
            </Grid>
          
            
          </Grid>
        </Box>
        
      </Container>
    </Box>
  </>
)
};

Settings.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Settings;