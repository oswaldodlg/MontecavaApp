import React, { useEffect, useState } from 'react'
import Head from 'next/head';
import { Box, Container, Grid, Typography, Button, CircularProgress, Tooltip, IconButton} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { DashboardLayout } from '../../../components/dashboard-layout';
import { AccountProfileUser } from 'src/components/customer/accountProfileUser';
import { AccountProfileUserDetails } from 'src/components/customer/accountProfileUserDetails';
import UserDocumentDrawer from 'src/components/customer/userDocumentDrawer';
import UserDocumentDisplay from 'src/components/customer/userDocumentDisplay';
import { useRouter } from 'next/router';
import useGetSubscriptionData from 'src/hooks/useGetSubscriptionData';
import useGetOrderData from 'src/hooks/useGetOrders';
import { SubscriptionDetails } from 'src/components/customer/subscriptionDetails';
import { UserOrders } from 'src/components/customer/userOrders';
import { useAuthContext } from 'src/hooks/useAuthContext';
import { useGetUserData } from 'src/hooks/useGetUserData';



function Details() {

  const[currentDocView, setCurrentDocView] = useState(0)
  const [data, setData] = useState()

 
 
  // const {user, credentials} = useAuthContext()

  const router = useRouter()

  const { id } = router.query

  const {userData, getUserData} = useGetUserData()

  useEffect(() => {

   getUserData('users', id)
    
 }, [id])

  const {retrieveSubscriptionData, subscriptionData} = useGetSubscriptionData()
  const {retrieveOrderData, orderData} = useGetOrderData()

  const [currentView, setCurrentView] = useState(0)

  const {user} = useAuthContext()

  
//   useEffect(() => {
 
//       userData && setData(
//          {
//            docs: userData.Documentos,
//            orders: userData.Ordenes,
//            displayName: `${userData.firstName} ${userData.lastName}`,
//            email: userData.email,
//            phoneNumber: userData.phoneNumber,
//            location: userData.location,
//            subscriptionId: userData.subscriptionId,
//            customer: userData.stripeCustomerId
//          }
//        )
      

//     console.log(userData)

// }, [userData])

useEffect(() => {
  
userData && retrieveSubscriptionData(userData.subscriptionId) 
userData && retrieveOrderData(userData.customer)
}, [userData])



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
    {userData && subscriptionData && orderData ?
      <Container maxWidth="lg">
        <Tooltip title="Regresar">     
            <IconButton onClick={() => router.back()}>
              <ArrowBackIcon  color="primary" />
            </IconButton>
        </Tooltip>
        <Typography
          sx={{ mb: 3 }}
          variant="h4"
        >
            Documentos del cliente
        </Typography>
        <Grid item>
          
        </Grid>
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
          {/* <AccountProfileUser data={data}/> */}
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
          {subscriptionData.isActive ? <UserDocumentDisplay currentDocView={currentDocView} id={id} docs={userData.Documentos}/> : <Typography>Tu membresia no está activa</Typography>}
          </Grid>
        </Grid>
        : 
      
        <Grid container spacing={3}>
        <UserOrders orderData={orderData.orders} id={id}   orders={data.orders} />
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
