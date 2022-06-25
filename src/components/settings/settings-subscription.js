import { useState, useEffect } from 'react';
import { Box, Button, Card, CardContent, CardHeader, Divider, TextField, Typography, Grid, Alert, List, ListItem, ListSubheader} from '@mui/material';
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

const env = process.env.NODE_ENV


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

const monthlyPlans = [
  {
    number: 1,
    name: 'Principiante',
    cost: 1450,
    term: 'Mensual',
    subscription_id: 'price_1LCvoRLONI3gdtL5Zxhjzm5b',
    privileges: ['Contabilidad Fiscal', 'Declaraciones de Impuestos Mensuales', 'Envio de Comprobantes de Impuestos', 'Envio de Opinión de Cumplimiento de Obligaciones', '5 Folios para facturar']
  },
  {
    number: 2,
    name: 'Básico',
    term: 'Mensual',
    cost: 4060,
    subscription_id: 'price_1LCvpPLONI3gdtL5mNPLbpP3',
    privileges: ['Contabilidad Fiscal', 'Declaraciones de Impuestos Mensuales', 'Envio de Comprobantes de Impuestos', 'Envio de Opinión de Cumplimiento de Obligaciones', 'IMSS, Afore, INFONAVIT', 'Tesoreria de NL', 'Estados Financieros','10 Folios para facturar']
  },
  {
    number: 3,
    name: 'Intermedio',
    term: 'Mensual',
    cost: 6500,
    subscription_id: 'price_1LCvs1LONI3gdtL5KZ0D8HQG',
    privileges: ['Contabilidad Fiscal', 'Declaraciones de Impuestos Mensuales', 'Envio de Comprobantes de Impuestos', 'Envio de Opinión de Cumplimiento de Obligaciones', 'IMSS, Afore, INFONAVIT', 'Tesoreria de NL', 'Estados Financieros','Tableros de Control','25 Folios para facturar']
  },
  {
    number: 4,
    name: 'Avanzado',
    term: 'Mensual',
    cost: 8700,
    subscription_id: 'price_1KwrmrLONI3gdtL5hCc4yDHb',
    privileges: ['Contabilidad Fiscal', 'Declaraciones de Impuestos Mensuales', 'Envio de Comprobantes de Impuestos', 'Envio de Opinión de Cumplimiento de Obligaciones', 'IMSS, Afore, INFONAVIT', 'Tesoreria de NL', 'Estados Financieros','Tableros de Control','Presentación y explicación de los números en sala de juntas','35 Folios para facturar']
  },
  {
    number: 5,
    name: 'Premium',
    term: 'Mensual',
    cost: 19140,
    subscription_id: 'price_1LCvueLONI3gdtL5MfF42ZH8',
    privileges: ['Contabilidad Fiscal', 'Declaraciones de Impuestos Mensuales', 'Envio de Comprobantes de Impuestos', 'Envio de Opinión de Cumplimiento de Obligaciones', 'IMSS, Afore, INFONAVIT', 'Tesoreria de NL', 'Estados Financieros','Tableros de Control','Presentación y explicación de los números en sala de juntas', 'Consultoría','35 Folios para facturar',  ]
  },
]

const bimestralPlans = [
  {
    number: 1,
    name: 'Básico',
    term: 'Bimestral',
    cost: 1740,
    subscription_id: 'price_1LEbyPLONI3gdtL5q23WwwNi',
    privileges: ['Contabilidad Fiscal', 'Declaraciones de Impuestos Bimestral', 'Envio de Comprobantes de Impuestos', 'Envio de Opinión de Cumplimiento de Obligaciones', 'IMSS, Afore, INFONAVIT', 'Tesoreria de NL', 'Estados Financieros','10 Folios para facturar']
  },
]

const anualPlans = [
  {
    number: 1,
    name: 'Anual',
    term: 'Anual',
    cost: 812,
    subscription_id: 'price_1LEbzILONI3gdtL5AfnCnyyK',
    privileges: ['Declaración Anual']
  },
]



export const CheckoutForm = () => {

  const [clientSecret, setClientSecret] = useState()
  const [message, setMessage] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const [term, setTerm] = useState('monthly')
  const [paymentId, setPaymentId] = useState()
  const [plan, setPlan] = useState({})

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
    
  }, [plan])



  const options = {
    // passing the client secret obtained from the server
    clientSecret: clientSecret,
  };

  return (
    <form>
         <Card>
        <CardHeader
          subheader="¡Bienvenido! Para empezar a utilizar la aplicación debes elegir un plan"
          title="Suscripción"
        />
        <Divider />
        <CardContent>
          <Grid container sx={{justifyContent: 'center'}}>
          <Grid item xs={10} md={6} rowSpacing={10}>
          <Typography sx={{textAlign: 'center',  fontWeight: 'bold'}}>Elige un plan</Typography>
            <Grid item py={2}>
                <Button onClick={() => setTerm('monthly')} color='info'>Mensual</Button>
                <Button onClick={() => setTerm('bimestral')}  color='info'>Bimestral</Button>
                <Button onClick={() => setTerm('anual')}  color='info'>Anual</Button>
              </Grid>
            <Grid container sx={{placeContent: 'center', py: 2}}>
              
              {term === 'monthly' && monthlyPlans.map((monthlyPlan, index) => {
                return(
                  <PlanButton plan={monthlyPlan} key={index} setPlan={setPlan} />
                )
              })}
              {term === 'bimestral' && bimestralPlans.map((bimestralPlan, index) => {
                return(
                  <PlanButton plan={bimestralPlan} key={index} setPlan={setPlan} />
                )
              })}
              {term === 'anual' && anualPlans.map((anualPlan, index) => {
                return(
                  <PlanButton plan={anualPlan} key={index} setPlan={setPlan} />
                )
              })}
            </Grid>
          </Grid>
          {plan && plan.cost &&
          <Grid item md={6} >
          <Typography sx={{textAlign: 'center', fontWeight: 'bold'}}>Detalles</Typography>
          <Typography >Elegiste el plan: <span style={{fontWeight: 'bold'}}>{plan.name} </span></Typography>
          <Typography >Facturación: <span style={{fontWeight: 'bold'}}>{plan.term} </span></Typography>
          <List sx={{py: 2}}>
          <ListSubheader >
            <Typography sx={{fontWeight: 'bold', color: 'black'}}>Privilegios:</Typography>
          </ListSubheader>
          {plan && plan.privileges && plan.privileges.map((item, index) => {
              return(
                <ListItem key={index}>
                  -{item}
                </ListItem>
              )
            })}
          </List>
          </Grid>}
          {plan && plan.cost &&
          <Grid item xs={11} margin={'0 auto'}>
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
          }
             
          
          
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
        return_url: env === 'development' ? 'http://localhost:3000/user/confirmacionPago' : 'https://montecavaapp.netlify.app/user/confirmacionPago',
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


const PlanButton = ({plan, setPlan}) => {
  const classes= useStyles()
  return (
    <Grid item xs={12} md={5} className={classes.containerPlan}  onClick={() => setPlan({
      number: plan.number,
      name: plan.name,
      cost: plan.cost,
      term: plan.term,
      subscription_id: plan.subscription_id,
      privileges: plan.privileges
    })}>
      <Typography>{plan.name}</Typography>
      <CurrencyFormat value={plan.cost} displayType={'text'} thousandSeparator={true} prefix={'$'} suffix={' MXN'} renderText={value => <Typography id="modal-modal-title" variant="h6" component="h2">{value}</Typography>} />
    </Grid>
  )
}