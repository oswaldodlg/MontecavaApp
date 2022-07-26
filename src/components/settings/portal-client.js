import { useState } from 'react';
import { Box, Button, Card, CardContent, CardHeader, Divider, TextField } from '@mui/material';
import { useAuthContext } from 'src/hooks/useAuthContext';
import { useRouter } from 'next/router';

export const ClientPortal = (props) => {

 const {data} = useAuthContext()
 const router = useRouter()

 const handleSubmit = () => {
    fetch("/api/create-customer-portal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          items: { 
          customer: data.stripeCustomerId
          }
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        router.push(data.url)
    });
 }

  return (
    
      <Card>
        <CardHeader
          subheader="Ir a portal de clientes"
          title="Portal de Clientes"
        />
        <Divider />
    
        <Divider />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2
          }}
        >
          <Button
            color="primary"
            variant="contained"
            type='submit'
            onClick={handleSubmit}
          >
            Ir a portal de cliente
          </Button>
        </Box>
      </Card>
  );
};
