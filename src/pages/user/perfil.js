import React from 'react'
import Head from 'next/head';
import { Box, Container, Grid, Typography, Button} from '@mui/material';
import { AccountProfile } from 'src/components/account/account-profile';
import { AccountProfileDetails } from 'src/components/account/account-profile-details';
import { DashboardLayout } from 'src/components/dashboard-layout';
import { useLogout } from 'src/hooks/useLogout';
import { useAuthContext } from 'src/hooks/useAuthContext';



function Account() {

  const { logout } = useLogout()

  const handleLogout = async () => {
      
        await logout()
        return;
  }

  const {user, data} = useAuthContext()



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
            <AccountProfile handleLogout={handleLogout} user={user}/>
          </Grid>
          <Grid
            item
            lg={8}
            md={6}
            xs={12}
          >
           { data && <AccountProfileDetails user={user} details={data} />}
          </Grid>
        </Grid>
      </Container>
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
