import React, {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import { Badge, Typography, Tooltip, Grid, Button} from '@mui/material';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ClearIcon from '@mui/icons-material/Clear';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CurrencyFormat from 'react-currency-format';
import { useCart } from "react-use-cart";
import Link from 'next/link';
import useCartActions from 'src/hooks/useCartActions';
import { useAuthContext } from 'src/hooks/useAuthContext';


export default function CartDrawer() {

  const { items, isEmpty, removeItem, updateItemQuantity, emptyCart, cartTotal} = useCart();
  const {isLoading, createOrder} = useCartActions()
  const {data} = useAuthContext()

  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });


  
  

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const createCartOrder = () => {
    createOrder(items, data.stripeCustomerId)
  }

  return (
    <div>
      {['right'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Tooltip title="Carrito">
          <IconButton sx={{ ml: 1 }} onClick={toggleDrawer(anchor, true)}>
            <Badge badgeContent={items.length} color="primary">
            <ShoppingCartIcon  color="action" />
            </Badge>
          </IconButton>
          </Tooltip>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={!isLoading && toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
            
          >
              <Box
                fullWidth
                sx={{ height: '100vh', overflowY: 'scroll', backgroundColor:'neutral.900', color: 'white', p: 5, alignContent:'space-evenly'}}
                width={300}
                // onClick={toggleDrawer(anchor, false)}
                // onKeyDown={toggleDrawer(anchor, false)} 
              >
            <Tooltip title="Regresar">     
            <IconButton onClick={toggleDrawer(anchor, false)}>
              <ArrowBackIcon  color="primary" />
            </IconButton>
            </Tooltip>
            <Typography variant='h4'>Mi orden</Typography>
            {isEmpty && 
              <Grid item py={4}>
                <Typography paddingBottom={2}>Aún no tienes algun producto agregado en tu orden...</Typography>
                <Link href={'../user/servicios'} passHref><Button variant='contained' onClick={toggleDrawer(anchor, false)}>Ir a Servicios</Button></Link>
              </Grid>
            }
            <Grid container paddingTop={4}>
            {/* {cart && list(anchor, cart, index)} */}
            {items && items.map((item, index) => {
              return(
                <ItemInCart item={item} key={index} updateItemQuantity={updateItemQuantity} removeItem={removeItem}/>
              )
            })}
            </Grid>
             
            
            {!isEmpty && 
            <Grid item py={4}>
              <CurrencyFormat value={cartTotal} displayType={'text'} thousandSeparator={true} prefix={'$'} suffix={' MXN'} renderText={value => <Typography id="modal-modal-title" variant="h6">Total: {value}</Typography>} />
            {!isLoading ? <Button variant='contained' sx={{my: 2}} onClick={() => createCartOrder()} >Comprar</Button> : <Button variant='contained' sx={{my: 2}} disabled >Cargando...</Button> }
            <Button color="error" onClick={() => emptyCart() }>Vaciar Carrito</Button>
            </Grid>
            }
            </Box>
          </SwipeableDrawer>
        </React.Fragment>
      ))}

      
     

    </div>
  );
}

const ItemInCart = ({item, updateItemQuantity, removeItem}) => {
  const [isHovered, setIsHovered] = useState(false)

  return(
    <Grid  onMouseOver={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} py={1}>
    <Grid container>
    <Grid item xs={8}>
    <Typography sx={{fontWeight: 'bold'}}>{item.name}</Typography>
    <CurrencyFormat value={item.price} displayType={'text'} thousandSeparator={true} prefix={'$'} suffix={' MXN'} renderText={value => <Typography id="modal-modal-title" variant="p">{value}</Typography>} />
    </Grid>
    <Grid item xs={4}>
    {isHovered && 
      <Tooltip title="Remover de Carrito" arrow>
        <IconButton sx={{ ml: 1 }} onClick={() => removeItem(item.id)}>
          <ClearIcon  color="error" />
        </IconButton>
      </Tooltip>
    }
    </Grid>
    <Grid item sx={{display: 'flex', flexDirection: 'row', textAlign: 'center'}}>
    <Button onClick={() => updateItemQuantity(item.id, item.quantity - 1 )}>-</Button>
    <Typography sx={{alignSelf: 'center'}}>{item.quantity}</Typography>
    <Button onClick={() => updateItemQuantity(item.id, item.quantity + 1)}>+</Button>
    </Grid>
    </Grid>
    
 
    
    
  </Grid>
  )
}