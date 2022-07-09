import React, {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import { Badge, Typography, Tooltip, Grid, Button} from '@mui/material';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import useCartActions from 'src/hooks/useCartActions';
import { useAuthContext } from 'src/hooks/useAuthContext';
import { useCartContext } from 'src/hooks/useCartContext';
import CurrencyFormat from 'react-currency-format';
import { useCart } from "react-use-cart";


export default function CartDrawer() {

  const {retrieveCart, cartId} = useCartActions()
  // const {cart, setCart} = useCartContext()
  const {data} = useAuthContext()
  const { items, isEmpty, removeItem, updateItemQuantity, emptyCart, cartTotal} = useCart();

  const [total, setTotal] = useState(0)
 
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  useEffect(() => {
    cartId && retrieveCart(cartId)
   
  }, [cartId])

  useEffect(() => {
    return retrieveCart(cartId)
  }, [])
  
  const removeFromCart = (index) => {
    // cart.splice(index, 1)
    // console.log(cart)
  }
  

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

  

  const list = (anchor, cart, index) => (
  
      
      <Grid container>
        <Grid item>
          <Typography>{cart[index].name}</Typography>
        </Grid>
      </Grid>
    
 
  );

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
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
           
          >
              <Box
                sx={{ width: 300, height: '100vh', overflowY: 'scroll', backgroundColor:'neutral.900', color: 'white', p: 5, alignContent:'space-evenly'}}
                role="presentation"
                // onClick={toggleDrawer(anchor, false)}
                // onKeyDown={toggleDrawer(anchor, false)} 
              >  
            <Typography variant='h4'>Mi orden</Typography>
            {/* {cart && list(anchor, cart, index)} */}
            {items && items.map((item, index) => {
              return(
              <Grid container key={index}>
              <Grid item>
                <Typography>{item.name}</Typography>
                <CurrencyFormat value={item.price} displayType={'text'} thousandSeparator={true} prefix={'$'} suffix={' MXN'} renderText={value => <Typography id="modal-modal-title" variant="p">{value}</Typography>} />
                
              <Grid item sx={{display: 'flex', flexDirection: 'row'}}>
                <Button onClick={() => updateItemQuantity(item.id, item.quantity - 1 )}>-</Button>
                <Typography sx={{alignSelf: 'center'}}>{item.quantity}</Typography>
              <Button onClick={() => updateItemQuantity(item.id, item.quantity + 1)}>+</Button>
              </Grid>
                <Button color='error' onClick={() => removeItem(item.id)}>Eliminar del carrito</Button>
              </Grid>
            </Grid>
              )
            })}
             <CurrencyFormat value={cartTotal} displayType={'text'} thousandSeparator={true} prefix={'$'} suffix={' MXN'} renderText={value => <Typography id="modal-modal-title" variant="h6">Total: {value}</Typography>} />
            
            {!isEmpty && 
            <>
            <Button>Comprar</Button>
            <Button color="error" onClick={() => emptyCart() }>Vaciar Carrito</Button>
            </>
            }
            </Box>
          </SwipeableDrawer>
        </React.Fragment>
      ))}

      
     

    </div>
  );
}