import React, {useEffect, useState} from 'react'
import { useTheme } from '@emotion/react'
import { Box, Typography, Grid, CircularProgress } from '@mui/material'
import { useRouter } from 'next/router'

const stripe = require("stripe")(process.env.NEXT_PUBLIC_STRIPE_SECRET);

export default function ConfirmacionPago() {

  const [data, setData] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState()
  const [subscription, setSubscription] = useState()

  const router = useRouter()

  const payment = router.query


  const theme = useTheme()

  useEffect(() => {

      if (payment){
        setIsLoading(true)
        fetch("../api/retrieve-setup-intent", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
              items: { 
              paymentId: payment.setup_intent
              }
          }),
        })
          .then((res) => res.json())
          .then(async(data) => {
          await setData(data)
          console.log(data)
        });
      }

      

  }, [payment])

  useEffect(() => {
    subscription && console.log(subscription)
  }, [subscription])
  

  useEffect(() => {
    if (data && data.status === 'succeeded' && !subscription){
      fetch("../api/create-stripe-subscription", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 
            items: { 
            customer: data.customer,
            price: data.metadata.subscriptionId,
            payment_method: data.payment_method
            }
        }),
      })
        .then((res) => res.json())
        .then(async(data) => {
        await setSubscription(data)
        setIsLoading(false)
      });
    setMessage("Tu forma de pago es válida")  
    } else if ( data && data.status === 'requires_payment_method') {
      setIsLoading(false)
      setMessage("Ha habido un problema para procesar su pago.");
    } else if (data && data.status === 'requires_action'){
      setIsLoading(false)
      setMessage ("Favor de completar tu pago en una tienda Oxxo")
    }
  }, [data])
  
  

  return (
    <Box>
      <Grid container sx={{minHeight: '100vh', paddingY: '15vh', alignItems: 'center', justifyContent: 'center', backgroundColor: theme.palette.secondary.main, color: 'white'}}>
      <Typography variant="h3">
      {message ? <Typography variant="h3">{message}</Typography>
      : <CircularProgress color='primary' />}
      {data && data.status === 'succeeded' && <Typography>Tu Plan: {data.metadata.plan} </Typography>}
      {data && data.amount && <Typography>Monto: {data.amount/100} </Typography>}
      </Typography>
      </Grid>
    </Box>
  )
}
