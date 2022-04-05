import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { CustomerListResults } from '../../../components/customer/customer-list-results';
import { CustomerListToolbar } from '../../../components/customer/customer-list-toolbar';
import { DashboardLayout } from '../../../components/dashboard-layout';
import { customers } from '../../../__mocks__/customers';

import React from 'react'
import { useCollection } from 'src/hooks/useCollection';
import { useAuthContext } from 'src/hooks/useAuthContext';

export default function Customers() {
  const { documents } = useCollection('users')
  const {user} = useAuthContext()

  return (
    <>
    <Head>
      <title>
        Clientes
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth={false}>
        <CustomerListToolbar />
        <Box sx={{ mt: 3 }}>
          {documents && <CustomerListResults customers={documents} uid={user.uid} />}
        </Box>
      </Container>
    </Box>
  </>
  )
}


Customers.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);


