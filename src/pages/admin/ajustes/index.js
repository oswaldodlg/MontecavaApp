import React, { useEffect } from 'react'
import Head from 'next/head';
import { Box, Container, Typography } from '@mui/material';
import { DashboardLayout } from '../../../components/dashboard-layout';
import { SettingsNotifications } from '../../../components/settings/settings-notifications';
import { SettingsPassword } from '../../../components/settings/settings-password';
import { useAuthContext } from 'src/hooks/useAuthContext';

function Settings() {

  const {user} = useAuthContext()


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
