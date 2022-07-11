import React, { useEffect } from 'react'
import { Box, Typography, Grid, CircularProgress, Button, Card } from '@mui/material'
import { useRouter } from 'next/router'
import CurrencyFormat from 'react-currency-format';
import useCartActions from 'src/hooks/useCartActions'
import {
    PaymentElement,
    useStripe,
    useElements,
    Elements
  } from "@stripe/react-stripe-js";

import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC);

export default function Checkout() {
    const router = useRouter()
    const {cartId} = router.query

    const {cart, retrieveOrder} = useCartActions()

    useEffect(() => {
        retrieveOrder(cartId)  
    }, [router])

  
        const options = {
            // passing the client secret obtained from the server
            
        };





   
    

  return (
    <Box>
    <Grid container sx={{minHeight: '100vh', paddingY: '15vh', alignItems: 'center', justifyContent: 'center', backgroundColor: 'neutral.900', color: 'white', textAlign: 'center'}}>
    <Grid item xs={10}>
    <Typography variant="h3">Finaliza tu Orden</Typography>
    </Grid>
    
        {cart && (
            <>
            <Grid item xs={4}>
                <Card>
                    {cart.items.data.map((item) => {
                        return(
                        <Typography>{item.description}</Typography>
                        )
                    })}
                </Card>
            </Grid>
            <Grid item xs={4}>
            <CurrencyFormat value={cart.total/100} displayType={'text'} thousandSeparator={true} prefix={'$'} suffix={' MXN'} renderText={value => <Typography id="modal-modal-title" variant="h6">Total: {value}</Typography>} />
            </Grid>
            <Grid item xs={10}>
            <Elements stripe={stripePromise} 
            options={{
            clientSecret: cart.clientSecret,
            loader: 'always',}}>
            <PaymentElement />
            </Elements>
            </Grid>
            </>
        )}
       
    
    </Grid>
  </Box>
  )
}
