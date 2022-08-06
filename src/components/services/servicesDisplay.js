import { Box, Card, CardContent, Typography, Grid, IconButton, Tooltip} from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import React from 'react';
import CurrencyFormat from 'react-currency-format';
import useCartActions from 'src/hooks/useCartActions';
import { useAuthContext } from 'src/hooks/useAuthContext';
import { useCart } from "react-use-cart";

const env = process.env.NODE_ENV

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

let individualServices;

if(env === 'development'){
  const Prueba = require('../../utils/suscription-info-prueba')
  individualServices = Prueba.individualServices
} else {
  require('../../utils/suscription-info')
  const Live = require('../../utils/suscription-info')
  individualServices = Live.individualServices
}

const services = {
    'Declaraciones': [
    individualServices[0],
    individualServices[1],
    individualServices[2]
  ],
  'Folios': [
    individualServices[4],
    individualServices[5],
    individualServices[6],
    individualServices[7]
  ],
  'Contabilidad': [
    individualServices[3]
  ],
  'IMAFIN': [
    individualServices[8]
  ],
  'Tesoreria': [
    individualServices[9]
  ],
  'EstadosFinancieros': [
    individualServices[14]
  ],
  'TablerosControl': [
    individualServices[10]
  ],
  'Consultoria': [
    individualServices[11]
  ],
  'Seguro': [
    individualServices[12]
  ],
  'Presentacion': [
    individualServices[13]
  ]
}



export default function ServicesDisplay({currentServiceView}) {

  const {data} = useAuthContext()
  // const {cart, setCart} = useCartContext()
  const { setItems, addItem } = useCart();

  // setItems(products)
  
  const {createCart, retrieveCart, cartId} = useCartActions()
  
  const addToCart = (product) => {
    // setCart([...cart, service])
    addItem(product, 1);
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
                <IconButton color="secondary" aria-label="add to shopping cart" onClick={() => addToCart(service)}>
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
