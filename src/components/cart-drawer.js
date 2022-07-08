import React, {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import { Badge, Typography, Tooltip } from '@mui/material';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import useCartActions from 'src/hooks/useCartActions';
import { useAuthContext } from 'src/hooks/useAuthContext';



export default function CartDrawer() {

  const {retrieveCart, cart, cartId} = useCartActions()
  const {data} = useAuthContext()
 
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  useEffect(() => {
    cartId && retrieveCart(cartId)
    console.log(cart)
  }, [cartId])
  

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

  

  const list = (anchor) => (
    <Box
      sx={{ width: 300, height: '100vh', backgroundColor:'neutral.900', color: 'white', p: 5, alignContent:'space-evenly'}}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)} 
    >  
      
      <Typography>Mi orden</Typography>
    
    </Box>
  );

  return (
    <div>
      {['right'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Tooltip title="Carrito">
          <IconButton sx={{ ml: 1 }} onClick={toggleDrawer(anchor, true)}>
            <Badge badgeContent={4} color="primary">
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
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}

      
     

    </div>
  );
}