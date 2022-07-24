import React, { useEffect } from 'react'
import Head from 'next/head';
import { Box, Container, Typography } from '@mui/material';
import { DashboardLayout } from 'src/components/dashboard-layout';
import { SettingsPassword } from 'src/components/settings/settings-password';

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
          <SettingsPassword />
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
