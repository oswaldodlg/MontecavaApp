import React, { useEffect, useState} from 'react'
import { Box, Alert, Typography, Grid, CircularProgress, Button, Card, Tooltip, IconButton } from '@mui/material'
import { useRouter } from 'next/router'
import CurrencyFormat from 'react-currency-format';
import useCartActions from 'src/hooks/useCartActions'
import {
    PaymentElement,
    useStripe,
    useElements,
    Elements
  } from "@stripe/react-stripe-js";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { loadStripe } from '@stripe/stripe-js';

const env = process.env.NODE_ENV


const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC, {
  betas: ["process_order_beta_1"],
  apiVersion: "2020-08-27; orders_beta=v4"
});

export default function Checkout() {
    const [message, setMessage] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    const q = router.query
    const {cart, retrieveOrder, retrievePaymentIntent, clientSecret} = useCartActions()

    useEffect(() => {
        retrieveOrder(q.cartId)
    }, [])

  return (
    <Box  sx={{minHeight: '100vh', backgroundColor: 'neutral.900', alignItems: 'center', display: 'flex'}}>
    <Grid container spacing={3} sx={{alignItems: 'center', justifyContent: 'center',  color: 'white', textAlign: 'center'}}>
        <Grid item xs={10} sx={{textAlign: 'left'}}>
        <Tooltip title="Regresar">
            <IconButton onClick={() => router.back()}  >
              <ArrowBackIcon  color="primary" />
            </IconButton>
        </Tooltip>
        </Grid>
        {cart && (
            <>
            <Grid item xs={10} md={4}>
                <Card sx={{padding: 4}}>
                <Typography variant="h5" sx={{color: 'black', py: 2}}>Finaliza tu Orden</Typography>
                    {cart.items.data.map((item) => {
                        return(
                        <Typography>{item.quantity} x {item.description}</Typography>
                        )
                    })}
                     <CurrencyFormat value={cart.total/100} displayType={'text'} thousandSeparator={true} prefix={'$'} suffix={' MXN'} renderText={value => <Typography sx={{py:2}} variant="h6">Total: {value}</Typography>} />
                </Card>
            </Grid>
            <Grid item xs={10} md={5}>
            <Elements
            stripe={stripePromise}
            options={{
            clientSecret: cart.clientSecret,
            loader: 'always',
            appearance: {
                theme: 'night',
                variables: {
                     colorPrimary: '#10B981'
                }
            }
            }}
            >
            <PaymentElement />
            <ContinueButton isLoading={isLoading} setIsLoading={setIsLoading} setMessage={setMessage}  />
            {message && <Alert severity="error">{message}</Alert>}
            </Elements>
            </Grid>
            </>
        )}


    </Grid>
  </Box>
  )
}


const ContinueButton = ({setIsLoading, isLoading, setMessage}) => {
    const stripe = useStripe();
    const elements = useElements();

    // const {emtyCart} = useCart terminar de implementar empty cart cuando el pago sea exitoso

    const handleSubmit = async (e) => {
      e.preventDefault();

      setMessage('')

      if (!stripe || !elements) {
        return;
      }

      setIsLoading(true);

      const { error } = await stripe.processOrder({
        elements,
        confirmParams: {
          // Make sure to change this to your payment completion page
          return_url: env === 'development' ? 'http://localhost:3000/user/confirmacionPagoServicio' : 'https://montecavaapp.netlify.app/user/confirmacionPagoServicio',
        },
      });



      if (error){
        if (error.type === "card_error" || error.type === "validation_error" || error.type === 'invalid_request_error') {
          setMessage(error.message);
        } else {
          setMessage("Un error ha ocurrido. Intentar nuevamente.");
        }
      } 
      // else{

      // }

      setIsLoading(false);
    };


    return(
      <Grid container sx={{py: 2, justifyContent: 'end'}}>
      <Grid item sx={{}} >
        {!isLoading ? <Button variant='contained' onClick={handleSubmit}>Comprar</Button>
        : <Button variant='contained' disabled>Procesando...</Button>
        }
      </Grid>
      </Grid>
    )
  }

