import React, { useEffect, useState } from 'react'
import Head from 'next/head';
import { Box, Container, Grid, Typography, Button, CircularProgress} from '@mui/material';
import { DashboardLayout } from '../../components/dashboard-layout';
import { useAuthContext } from 'src/hooks/useAuthContext';
import { useCollectionUserDetail } from 'src/hooks/useCollectionUserDetail';
import { AccountProfileUser } from 'src/components/customer/accountProfileUser';
import { AccountProfileUserDetails } from 'src/components/customer/accountProfileUserDetails';
import UserDocumentDrawer from 'src/components/customer/userDocumentDrawer';
import UserDocumentDisplay from 'src/components/customer/userDocumentDisplay';
import { useRouter } from 'next/router';
import useGetStripeCustomer from 'src/hooks/useGetStripeCustomer';
import useGetSubscriptionData from 'src/hooks/useGetSubscriptionData';
import { SubscriptionDetails } from 'src/components/customer/subscriptionDetails';



function Details() {

  const[currentDocView, setCurrentDocView] = useState(0)
 
  const {user, data} = useAuthContext()

  const {retrieveSubscriptionData, subscriptionData} = useGetSubscriptionData()


  useEffect(() => {
    data && retrieveSubscriptionData(data.subscriptionId)
  }, [data])

  useEffect(() => {
    console.log(subscriptionData)
  }, [subscriptionData])
  


  return (
    <>
    <Head>
      <title>
        Home 
      </title>
    </Head>
    
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
        
      }}
    >


      {data && user && subscriptionData ?
      <Container maxWidth="lg">
        <Typography
          sx={{ mb: 3 }}
          variant="h4"
        >
            Mis Documentos
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
          <AccountProfileUser data={user}/>
          </Grid>
          <Grid
            item
            lg={8}
            md={6}
            xs={12}
          >
           <SubscriptionDetails data={subscriptionData}/>
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
          {subscriptionData.isActive && <UserDocumentDisplay currentDocView={currentDocView} id={user.uid} data={data.Documentos} credentials={data.credentials}/>}
          </Grid>
        </Grid>
      </Container>
     : 
     <Grid container  sx={{justifyContent: 'center', alignItems: 'center', height: '70vh'}}>
     <CircularProgress sx={{margin: '0 auto'}}/>
    </Grid>
     } 
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
