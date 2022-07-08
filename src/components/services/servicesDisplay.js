import { Box, Card, CardContent, Typography, Grid, IconButton, Tooltip} from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import React from 'react';
import CurrencyFormat from 'react-currency-format';
import useCartActions from 'src/hooks/useCartActions';
import { useAuthContext } from 'src/hooks/useAuthContext';



const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  //border: '2px solid #000',
  borderRadius: 5,
  boxShadow: 24,
  p: 4,
};

const services = {
    'Declaraciones': [
    {
        name: 'Declaración Mensual',
        id: 'prod_M0HJt5YMpuxW2E',
        price: 700
    },
    {
        name: 'Declaración Bimestral',
        id: 'prod_M0HK8u0E1ti4zs',
        price: 1740
    },
    {
        name: 'Declaración Anual',
        id: 'prod_M0HKwxOz8sW3L0',
        price: 812
    }
  ],
  'Folios': [
    {
      name: '5 Folios',
      id: 'prod_M0HL82uk0tObls',
      price: 250
    },
    {
      name: '10 Folios',
      id: 'prod_M0HLzDGex5nylG',
      price: 450
    },
    {
      name: '25 Folios',
      id: 'prod_M0HMAd12vldr4i',
      price: 750
    },
    {
      name: '35 Folios',
      id: 'prod_M0HMj5fQs0pkhV',
      price: 1100
    },
  ],
  'Contabilidad': [
    {
      name: 'Contabilidad Fiscal',
      id: 'prod_M0HMOtfieq6Mun',
      price: 700
    },
  ],
  'IMAFIN': [
    {
      name: 'IMSS, AFORE, INFONAVIT',
      id: 'prod_M0HND6QMCPr2wF',
      price: 700
    }
  ],
  'Tesoreria': [
    {
      name: 'Tesoreria NL',
      id: 'prod_M0HNQPkHNVVQ3Y',
      price: 700
    }
  ],
  'EstadosFinancieros': [
    {
      name: 'Estados Financieros',
      id: 'prod_M0HNIGJkMVLGyW',
      price: 1500
    }
  ],
  'TablerosControl': [
    {
      name: 'Tableros de Control',
      id: 'prod_M0HOV9G6zJhig3',
      price: 2500
    }
  ],
  'Consultoria': [
    {
      name: 'Consultoria',
      id: 'prod_M0HOvnr21Ve8JS',
      price: 10000
    }
  ],
  'Seguro': [
    {
      name: 'Seguro Anual',
      id: 'prod_M0HPh5YwqxUvMI',
      price: 15000
    }
  ],
  'Presentacion': [
    {
      name: 'Presentación de Resultados',
      id: 'prod_M0HPObLD8nmrl6',
      price: 3000
    }
  ]
}



export default function ServicesDisplay({currentServiceView}) {

  const {data} = useAuthContext()
  const {createCart, addToCart} = useCartActions()

  const handleAddToCart = (service) => {
    if (data && !data.cartId){
      createCart(service.id)
    } else {
      addToCart(service.id)
    }
  }
  return (
      
    <Card>
        <CardContent>
            <Box
            sx={{
                justifyContent: 'center',
                display: 'flex',
                minHeight: '40vh'
              }}
            > 
            <Grid container sx={{justifyContent: {xs: 'center', md: 'left'}}} >
            {
              currentServiceView  && services[currentServiceView].map((service, index) => (
                <Grid item key={index} sx={{
                  backgroundColor: 'neutral.900',
                  color: 'white',
                  margin: 1,
                  padding: 5,
                  height: '25vh',
                  width: '25vh',
                  justifyContent: 'center',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  borderRadius: 3
                }}
                
                >
                <Typography variant='p'>
                  {service.name}
                </Typography>
                <CurrencyFormat value={service.price} displayType={'text'} thousandSeparator={true} prefix={'$'} suffix={' MXN'} renderText={value => <Typography id="modal-modal-title" variant="p">{value}</Typography>} />
                <Tooltip title='Agregar al carrito' arrow>
                <IconButton color="info" aria-label="add to shopping cart" onClick={() => handleAddToCart(service)}>
                  <AddShoppingCartIcon />
                </IconButton>
                </Tooltip>
                </Grid>
              ))
            }   
            </Grid>                   
            </Box>
        </CardContent>
    </Card>
  )
}
