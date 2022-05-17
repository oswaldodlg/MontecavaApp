import { useState, useEffect, useEffectLayout } from 'react';
import { Box, Button, Card, CardContent, CardHeader, Divider, TextField, Typography, Grid, Alert} from '@mui/material';
import { makeStyles } from '@mui/styles';
import CurrencyFormat from 'react-currency-format';
import {
  PaymentElement,
  useStripe,
  useElements,
  Elements
} from "@stripe/react-stripe-js";

import { loadStripe } from '@stripe/stripe-js';
import { useAuthContext } from 'src/hooks/useAuthContext';


const useStyles = makeStyles((theme) => ({
  containerPlan: {
    textAlign: 'center',
    alignItems: 'center',
    padding: '6vh 0vh',
    cursor: 'pointer',
    borderStyle: 'solid',
    borderWidth: 'thin',
    margin: '0.5vh',
    '&:hover': {
      backgroundColor:'#121828',
      color:'#FFFFFF'
    },
  },
  selected: {
    textAlign: 'center',
    alignItems: 'center',
    padding: '6vh 0vh',
    cursor: 'pointer',
    borderStyle: 'solid',
    borderWidth: 'thin',
    margin: '0.5vh',
    backgroundColor:'#121828',
    color:'#FFFFFF'
  }
}))

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC);

export const CheckoutForm = () => {

  const [clientSecret, setClientSecret] = useState()
  const [message, setMessage] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const [paymentId, setPaymentId] = useState()
  const [plan, setPlan] = useState({
    number: 1,
    name: 'Principiante',
    cost: 250,
    subscription_id: 'price_1KwrlRLONI3gdtL5ezfFVbC3'
  })

  const {data} = useAuthContext()



  useEffect(() => {
   
      setIsLoading(true)
      fetch("../api/create-setup-intent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ items: { 
            price: `${plan.cost}`,
            plan: plan.name,
            customer: data.stripeCustomerId,
            subscription_id: plan.subscription_id
          } 
        }),
        })
          .then((res) => res.json())
          .then(async(data) => {
          await setPaymentId(data.id)
          await setClientSecret(data.clientSecret) 
          
          console.log(data)
          setIsLoading(false)
        });
    

  }, [])


  useEffect(() => {
    
      setIsLoading(true)
      paymentId && fetch("../api/update-setup-intent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ items: { 
            paymentId: paymentId,
            price: `${plan.cost}`,
            plan: plan.name,
            subscription_id: plan.subscription_id
          } 
        }),
        })
          .then((res) => res.json())
          .then(async(data) => {
          console.log(data)
          setIsLoading(false)
        });
    
  }, [plan.cost])

  const classes= useStyles()

  const options = {
    // passing the client secret obtained from the server
    clientSecret: clientSecret,
  };

  return (
    <form>
         <Card>
        <CardHeader
          subheader="Actualiza tu plan de suscripción"
          title="Suscripción"
        />
        <Divider />
        <CardContent>
          <Grid container>
          <Grid item md={6} rowSpacing={10}>
          <Typography sx={{textAlign: 'center',  fontWeight: 'bold'}}>Elige un plan</Typography>
              <Grid container sx={{placeContent: 'center', py: 2}}>
              <Grid item xs={12} md={5} className={plan.number === 1 ? classes.selected : classes.containerPlan } onClick={() => setPlan({
                number: 1,
                name: 'Principiante',
                cost: 250,
                subscription_id: 'price_1KwrlRLONI3gdtL5ezfFVbC3'
              })}>
                <Typography>Principante</Typography>
                <Typography>$250.00 MXN</Typography>
              </Grid>
              <Grid item xs={12} md={5} className={plan.number === 2 ? classes.selected : classes.containerPlan } onClick={() => setPlan({
                number: 2,
                name: 'Básico',
                cost: 350,
                subscription_id: 'price_1KwrlwLONI3gdtL5JoDdfW35'
              })}>
                <Typography>Básico</Typography>
                <Typography>$350.00 MXN</Typography>
              </Grid>
              <Grid item xs={12} md={5} className={plan.number === 3 ? classes.selected : classes.containerPlan } onClick={() => setPlan({
                number: 3,
                name: 'Intermedio',
                cost: 450,
                subscription_id: 'price_1KwrmNLONI3gdtL5bI0IUIqE'
              })}>
                <Typography>Intermedio</Typography>
                <Typography>$450.00 MXN</Typography>
              </Grid>
              <Grid item xs={12} md={5} className={plan.number === 4 ? classes.selected : classes.containerPlan } onClick={() => setPlan({
                number: 4,
                name: 'Avanzado',
                cost: 550,
                subscription_id: 'price_1KwrmrLONI3gdtL5hCc4yDHb'
              })}>
                <Typography>Avanzado</Typography>
                <Typography>$550.00 MXN</Typography>
              </Grid>
              <Grid item xs={12} md={5} className={plan.number === 5 ? classes.selected : classes.containerPlan }onClick={() => setPlan({
                number: 5,
                name: 'Premium',
                cost: 650,
                subscription_id: 'price_1KwrnDLONI3gdtL5nvGt5BT6'
              })}>
                <Typography>Premium</Typography>
                <Typography>$650.00 MXN</Typography>
              </Grid>
              </Grid>
          </Grid>
          <Grid item md={6} >
          <Typography sx={{textAlign: 'center', fontWeight: 'bold'}}>Elige tu forma de pago</Typography>
          <Typography>Elegiste el plan: {plan.name}</Typography>
          <Typography>El importe a pagar es de:</Typography>
          <CurrencyFormat value={plan.cost} displayType={'text'} thousandSeparator={true} prefix={'$'} suffix={' MXN'} renderText={value => <Typography id="modal-modal-title" variant="h6" component="h2">{value}</Typography>} />
          <Grid item sx={{py: 2}}> 
                    {clientSecret && 
                    <Elements stripe={stripePromise} options={options}>
                      <PaymentElement />
                      <ContinueButton isLoading={isLoading} setIsLoading={setIsLoading} setMessage={setMessage} />
                    </Elements>
                    }
          </Grid>
             
          <Grid item>
              {message && <Alert severity="error">{message}</Alert>} 
          </Grid>
          </Grid>
          </Grid>
          
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2
          }}
        >
          {/* <Button
            color="primary"
            variant="contained"
            type='submit'
          >
            Enviar
          </Button> */}
        </Box>
      </Card>
      
    </form>
  );
};

const ContinueButton = ({setIsLoading, isLoading, setMessage}) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage('')

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmSetup({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: 'http://localhost:3000/user/confirmacionPago'
      },
    });


    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error){
      if (error.type === "card_error" || error.type === "validation_error" || error.type === 'invalid_request_error') {
        setMessage(error.message);
      } else {
        setMessage("Un error ha ocurrido. Intentar nuevamente.");
      }  
    }
    
    setIsLoading(false);
  };
  return(
    <Grid container sx={{py: 2, justifyContent: 'end'}}>        
    <Grid item sx={{}} >
      {!isLoading ? <Button variant='contained' onClick={handleSubmit}>Continuar</Button>
      : <Button variant='contained' disabled>Procesando...</Button>
      }
    </Grid>
    </Grid>
  )
}
