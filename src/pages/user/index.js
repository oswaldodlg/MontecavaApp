import React, { useEffect, useState } from 'react'
import Head from 'next/head';
import { Box, Container, Grid, Typography, Button, CircularProgress} from '@mui/material';
import { DashboardLayout } from '../../components/dashboard-layout';
import { useAuthContext } from 'src/hooks/useAuthContext';
import { AccountProfileUser } from 'src/components/customer/accountProfileUser';
import UserDocumentDrawer from 'src/components/customer/userDocumentDrawer';
import UserDocumentDisplay from 'src/components/customer/userDocumentDisplay';
import useGetSubscriptionData from 'src/hooks/useGetSubscriptionData';
import { SubscriptionDetails } from 'src/components/customer/subscriptionDetails';
import { UserOrders } from 'src/components/customer/userOrders'
import useGetOrderData from 'src/hooks/useGetOrders';



function Details() {

  const[currentDocView, setCurrentDocView] = useState(0)
  const [currentView, setCurrentView] = useState(0)
 
  const {user, data} = useAuthContext()

  const {retrieveSubscriptionData, subscriptionData} = useGetSubscriptionData()
  const {retrieveOrderData, orderData} = useGetOrderData()


  useEffect(() => {
    
    data && retrieveSubscriptionData(data.subscriptionId) 
    data && retrieveOrderData(data.stripeCustomerId)

  }, [data])


  


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


      {data && user && subscriptionData && orderData ?
      <Container maxWidth="lg">
        <Typography
          sx={{ mb: 3 }}
          variant="h4"
        >
            Mis Documentos
        </Typography>
        <Grid item rowSpacing={2} py={2}>
          <Button variant='outlined' sx={{marginX: 1}} onClick={() => setCurrentView(0)} >Mi Suscripción</Button>
          <Button variant='outlined' onClick={() => setCurrentView(1)} >Mis Compras</Button>
        </Grid>
        {currentView === 0 ? 
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
           <UserDocumentDrawer setCurrentDocView={setCurrentDocView} subscription={subscriptionData}/>
          </Grid>
          <Grid
            item
            lg={8}
            md={6}
            xs={12}
          >
          {subscriptionData.isActive ? <UserDocumentDisplay currentDocView={currentDocView} id={user.uid} data={data} credentials={data.credentials} /> : <Typography>Tu membresia no está activa</Typography>}
          </Grid>
        </Grid>
        : 
      
        <Grid container spacing={3}>
        <UserOrders orderData={orderData.orders} credentials={data.credentials} />
        </Grid>
        }
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
