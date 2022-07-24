import React, {useState} from 'react'
import Head from 'next/head';
import { Box, Container, Grid, Typography, Button} from '@mui/material';
import { DashboardLayout } from 'src/components/dashboard-layout';
import ServicesDrawer from 'src/components/services/servicesDrawer';
import ServicesDisplay from 'src/components/services/servicesDisplay';



function Services() {

  const [currentServiceView, setCurrentServiceView] = useState('Declaraciones')


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
