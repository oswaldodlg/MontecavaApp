import React, {useEffect, useState} from 'react'
import { Box, Typography, Grid, CircularProgress, Button, Card } from '@mui/material'
import { useRouter } from 'next/router'
import Link from 'next/link';
import CurrencyFormat from 'react-currency-format';
import { useCart } from 'react-use-cart';

const stripe = require("stripe")(process.env.NEXT_PUBLIC_STRIPE_SECRET);

export default function ConfirmacionPago() {

  const [resData, setData] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState()
  const [subscription, setSubscription] = useState()

  const router = useRouter()

  const { emptyCart } = useCart()

  const payment = router.query


  console.log(payment)

  useEffect(() => {

      if (payment){
        setIsLoading(true)
        fetch("../api/retrieve-order", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
              items: { 
              id: payment.order
              }
          }),
        })
          .then((res) => res.json())
          .then(async(data) => {
          await setData(data)
          console.log(data)
        });
      } 
      
      if (payment.redirect_status === "succeeded"){
        emptyCart()
      }


      

  }, [payment])
  

  return (
    <Box>
      <Grid container sx={{minHeight: '100vh', paddingY: '15vh', alignItems: 'center', justifyContent: 'center', backgroundColor: 'neutral.900', color: 'white', textAlign: 'center'}}>
      <Typography variant="h3">
      {resData ? 
      <>
        <Typography variant="h3" py={1}>¡Gracias por tu compra!</Typography>
        
        <Card sx={{padding: 3, margin: 2}}>
        <Typography variant="h5" py={2}>Tu orden</Typography>
        {resData && resData.items && resData.items.data.map((item, index) => {
          return (
          <React.Fragment key={index}>
          <Typography>{item.quantity} x {item.description}</Typography>
          <CurrencyFormat value={item.amount_total/100} displayType={'text'} thousandSeparator={true} prefix={'$'} suffix={' MXN'} renderText={value => <Typography sx={{py:2}} variant="h6">{value}</Typography>} />
          </React.Fragment>
          )
        })}
          <CurrencyFormat value={resData.total/100} displayType={'text'} thousandSeparator={true} prefix={'$'} suffix={' MXN'} renderText={value => <Typography sx={{py:2}} variant="h6">Total: {value}</Typography>} />
        </Card>
        <Link href={'/user'}><Button variant='contained'>Ir a Dashboard</Button></Link>
      </>
      : <CircularProgress color='inherit' />}
      </Typography>
      </Grid>
    </Box>
  )
}
