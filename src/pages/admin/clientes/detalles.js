import React, { useEffect, useState } from 'react'
import Head from 'next/head';
import { Box, Container, Grid, Typography, Button, CircularProgress} from '@mui/material';
import { DashboardLayout } from '../../../components/dashboard-layout';
import { useCollectionUserDetail } from 'src/hooks/useCollectionUserDetail';
import { AccountProfileUser } from 'src/components/customer/accountProfileUser';
import { AccountProfileUserDetails } from 'src/components/customer/accountProfileUserDetails';
import UserDocumentDrawer from 'src/components/customer/userDocumentDrawer';
import UserDocumentDisplay from 'src/components/customer/userDocumentDisplay';
import { useRouter } from 'next/router';
import useGetSubscriptionData from 'src/hooks/useGetSubscriptionData';
import useGetOrderData from 'src/hooks/useGetOrders';
import { SubscriptionDetails } from 'src/components/customer/subscriptionDetails';
import { UserOrders } from 'src/components/customer/userOrders';



function Details() {

  const[currentDocView, setCurrentDocView] = useState(0)
  const [data, setData] = useState()

 
 
  // const {user, credentials} = useAuthContext()

  const router = useRouter()

  const { id } = router.query

  const {details} = useCollectionUserDetail('users', id)
  const {retrieveSubscriptionData, subscriptionData} = useGetSubscriptionData()
  const {retrieveOrderData, orderData} = useGetOrderData()

  const [currentView, setCurrentView] = useState(0)

  
  useEffect(() => {
    {details && details.map((detail) => {
      {
      setData(
         {
           docs: detail.Documentos,
           displayName: `${detail.firstName} ${detail.lastName}`,
           email: detail.email,
           phoneNumber: detail.phoneNumber,
           location: detail.location,
           subscriptionId: detail.subscriptionId,
           customer: detail.stripeCustomerId
         }
       )
      }
    })}

}, [details])

useEffect(() => {
  
data && retrieveSubscriptionData(data.subscriptionId) 
data && retrieveOrderData(data.customer)
}, [data])



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
    {data && subscriptionData && orderData ?
      <Container maxWidth="lg">
        <Typography
          sx={{ mb: 3 }}
          variant="h4"
        >
            Documentos del cliente
        </Typography>
        <Grid item rowSpacing={2} py={2}>
          <Button variant='outlined' sx={{marginX: 1}} onClick={() => setCurrentView(0)} >Suscripción</Button>
          <Button variant='outlined' onClick={() => setCurrentView(1)} >Compras</Button>
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
          <AccountProfileUser data={data}/>
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
          {subscriptionData.isActive ? <UserDocumentDisplay currentDocView={currentDocView} id={id} data={data.docs} credentials={data.credentials}/> : <Typography>Tu membresia no está activa</Typography>}
          </Grid>
        </Grid>
        : 
      
        <Grid container spacing={3}>
        <UserOrders orderData={orderData.orders} />
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
