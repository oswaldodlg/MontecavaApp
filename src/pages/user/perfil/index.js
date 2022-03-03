import React from 'react'
import Head from 'next/head';
import { Box, Container, Grid, Typography, Button} from '@mui/material';
import { AccountProfile } from '../../../components/account/account-profile';
import { AccountProfileDetails } from '../../../components/account/account-profile-details';
import { DashboardLayout } from '../../../components/dashboard-layout';
import { useLogout } from 'src/hooks/useLogout';
import { useAuthContext } from 'src/hooks/useAuthContext';



function Account() {

  const { logout } = useLogout()

  const handleLogout = async () => {
      
        await logout()
        return;
  }

  const {user} = useAuthContext()

  console.log(user)

  return (
    <>
    <Head>
      <title>
        Mi Perfil
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
          Mi Perfil
        </Typography>
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={4}
            md={6}
            xs={12}
          >
            <AccountProfile />
          </Grid>
          <Grid
            item
            lg={8}
            md={6}
            xs={12}
          >
            <AccountProfileDetails />
          </Grid>
        </Grid>
      </Container>
      <Button onClick={() => handleLogout()} variant='contained'>
        Cerrar Sesión
      </Button>
    </Box>
  </>
  )
}



Account.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Account;