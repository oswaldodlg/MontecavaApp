import React, { useEffect, useState } from 'react'
import Head from 'next/head';
import { Box, Container, Grid, Typography, Button} from '@mui/material';
import { DashboardLayout } from '../../../components/dashboard-layout';
import { useAuthContext } from 'src/hooks/useAuthContext';
import { useCollectionUserDetail } from 'src/hooks/useCollectionUserDetail';
import { AccountProfileUser } from 'src/components/customer/accountProfileUser';
import { AccountProfileUserDetails } from 'src/components/customer/accountProfileUserDetails';
import UserDocumentDrawer from 'src/components/customer/userDocumentDrawer';
import UserDocumentDisplay from 'src/components/customer/userDocumentDisplay';



function Details() {

  const[currentDocView, setCurrentDocView] = useState(0)

 
  const {user, credentials} = useAuthContext()
  const {details} = useCollectionUserDetail('users', user.uid)


  useEffect(() => {
    
    console.log(currentDocView)
  }, [currentDocView])
  


  return (
    <>
    <Head>
      <title>
        Detalles
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
        
      }}
    >
      <Container maxWidth="lg">
        <Typography
          sx={{ mb: 3 }}
          variant="h4"
        >
            Detalles de Cliente
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
            <AccountProfileUser user={user}/>
          </Grid>
          <Grid
            item
            lg={8}
            md={6}
            xs={12}
          >
           { details && <AccountProfileUserDetails user={user} details={details} />}
          </Grid>
          <Grid
            item
            lg={4}
            md={6}
            xs={12}
          >
           <UserDocumentDrawer setCurrentDocView={setCurrentDocView}/>
          </Grid>
          <Grid
            item
            lg={8}
            md={6}
            xs={12}
          >
           <UserDocumentDisplay currentDocView={currentDocView} />
          </Grid>
        </Grid>
      </Container>
      
    </Box>
  </>
  )
}



Details.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Details;
