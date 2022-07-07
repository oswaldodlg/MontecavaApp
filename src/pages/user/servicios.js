import React, {useState} from 'react'
import Head from 'next/head';
import { Box, Container, Grid, Typography, Button} from '@mui/material';
import { AccountProfile } from 'src/components/account/account-profile';
import { AccountProfileDetails } from 'src/components/account/account-profile-details';
import { DashboardLayout } from 'src/components/dashboard-layout';
import { useLogout } from 'src/hooks/useLogout';
import { useAuthContext } from 'src/hooks/useAuthContext';
import ServicesDrawer from 'src/components/services/servicesDrawer';
import ServicesDisplay from 'src/components/services/servicesDisplay';



function Services() {

  const [currentServiceView, setCurrentServiceView] = useState('Declaraciones')

  const {user, data} = useAuthContext()



  return (
    <>
    <Head>
      <title>
       Servicios
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
          Servicios
        </Typography>
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            md={4}
            xs={12}
          >
            <ServicesDrawer setCurrentServiceView={setCurrentServiceView}/>
          </Grid>
          <Grid
            item
            md={8}
            xs={12}
          >
            <ServicesDisplay currentServiceView={currentServiceView}/>
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
  )
}



Services.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Services;
