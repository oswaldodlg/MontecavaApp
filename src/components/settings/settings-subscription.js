import {CardElement, CardExpiryElement, PaymentElement} from '@stripe/react-stripe-js';
import { useState } from 'react';
import { Box, Button, Card, CardContent, CardHeader, Divider, TextField } from '@mui/material';

export const CheckoutForm = () => {
  return (
    <form>
         <Card>
        <CardHeader
          subheader="Actualiza tu plan de suscripción"
          title="Suscripción"
        />
        <Divider />
        <CardContent>
         {/* <PaymentElement /> */}
          <CardElement />
        </CardContent>
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
          >
            Enviar
          </Button>
        </Box>
      </Card>
      
    </form>
  );
};


// export const CheckoutForm2 = () => {
//   return (
//     <form>
//       <PaymentElement />
//       <button>Submit</button>
//     </form>
//   );
// };