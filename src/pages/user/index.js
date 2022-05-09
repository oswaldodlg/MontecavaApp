import React, { useEffect, useState } from 'react'
import Head from 'next/head';
import { Box, Container, Grid, Typography, Button} from '@mui/material';
import { DashboardLayout } from '../../components/dashboard-layout';
import { useAuthContext } from 'src/hooks/useAuthContext';
import { useCollectionUserDetail } from 'src/hooks/useCollectionUserDetail';
import { AccountProfileUser } from 'src/components/customer/accountProfileUser';
import { AccountProfileUserDetails } from 'src/components/customer/accountProfileUserDetails';
import UserDocumentDrawer from 'src/components/customer/userDocumentDrawer';
import UserDocumentDisplay from 'src/components/customer/userDocumentDisplay';
import { useRouter } from 'next/router';



function Details() {

  const[currentDocView, setCurrentDocView] = useState(0)
  const [docs, setDocs] = useState()

 
 
  const {user, data} = useAuthContext()

  console.log(user)


  // const {details} = useCollectionUserDetail('users', user.uid)

  
//   useEffect(() => {
//     {details && details.map((detail) => {
//        setDocs(
//          {
//            docs: {
//             'Declaraciones Mensuales': detail['Declaraciones Mensuales'],
//             'Declaraciones Anuales': detail['Declaraciones Anuales'],
//             'Comprobantes IMSS': detail['Comprobantes IMSS'],
//             'Comprobantes AFORE': detail['Comprobantes AFORE'],
//             'Comprobantes INFONAVIT': detail['Comprobantes INFONAVIT'],
//             'Comprobantes Tesoreria': detail['Comprobantes Tesoreria'],
//             'Estados Financieros': detail['Estados Financieros'],
//             'Constancia Situación Fiscal': detail['Constancia Situación Fiscal'],
//             'Opinion': detail['Opinion']
//            },
//            displayName: `${detail.firstName} ${detail.lastName}`,
//            email: detail.email,
//            phoneNumber: detail.phoneNumber,
//            location: detail.location
//          }
//        )
//     })}

// }, [details])

console.log(data)


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
            {data && <AccountProfileUser data={user}/>}
          </Grid>
          <Grid
            item
            lg={8}
            md={6}
            xs={12}
          >
           { data && <AccountProfileUserDetails data={data} credentials={data.credentials} />}
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
           { user.uid && <UserDocumentDisplay currentDocView={currentDocView} id={user.uid} data={data.Documentos} credentials={data.credentials}/>}
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
