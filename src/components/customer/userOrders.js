import {
    Avatar,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Divider,
    Typography,
    Grid
  } from '@mui/material';
import moment from 'moment';
import UploadFileModal from './uploadFileModal';
import React, {useState, useEffect} from 'react';
import OrderDocViewComponent from './orderDocumentDisplay';
import { useAuthContext } from 'src/hooks/useAuthContext';

  
  export const UserOrders  = ({orderData, id, orders}) => {
  
   const [currentOrder, setCurrentOrder] = useState()
   const [orderView, setOrderView] = useState()


   const {data} = useAuthContext()

   useEffect(() => {
    currentOrder && setOrderView(orderData.data.find( item => item.id === currentOrder ))
    orderView && console.log(orderView.line_items)
    console.log(currentOrder)
    console.log(orders)
   }, [currentOrder, orderView])
   
   
   
    return(
    <>
    <Grid
    item
    md={4}
    xs={12}
    >    
    <Card>
      <CardContent>
        <Box
          sx={{
            alignItems: 'center',
            justifyContent: 'center',
            display: 'flex',
            flexDirection: 'column',
            minHeight: '31vh'
          }}
        >
          {data.credentials === 'user' ? 
          <Typography
            color="textPrimary"
            gutterBottom
            variant="h5"
          >
           Mis Compras
            
          </Typography>
          :
          <Typography
            color="textPrimary"
            gutterBottom
            variant="h5"
          >
           Compras
            
          </Typography>
          } 
          {orderData && orderData.data.map((item, index) => {
            return (
            <>
            {item.status === 'complete' && (
            <Button key={index} onClick={() => setCurrentOrder(item.id)}>
              Orden {moment.unix(item.created).format('DD/MM/YYYY')}
            </Button>
            )}
            </>
            
            )
        })}
        </Box>
      </CardContent>
      <Divider />
    </Card>
    </Grid>
     <Grid
     item
    
     md={8}
     xs={12}
     >
    {currentOrder && 
    <Card>
      <CardContent>
        <Box
          sx={{
            alignItems: 'center',
            justifyContent: 'center',
            display: 'flex',
            flexDirection: 'column',
            minHeight: '31vh'
          }}
        >
          <Grid container>
          <Grid item>
          <Typography
            color="textPrimary"
            gutterBottom
            variant="h5"
          >
           Servicios Adquiridos
            
          </Typography>
          </Grid>
          <Grid item>
          {data.credentials === 'admin' && <UploadFileModal name={'Orders'} id={id} order={currentOrder}/>}
          </Grid>
          </Grid>
          <Grid item>
          {orderView && orderView.line_items && orderView.line_items.data.map((item, index) => {
            return(
              <React.Fragment key={index}>
                <Typography>{item.description}</Typography>
              </React.Fragment>
            )
          })}
          </Grid>
        {orders && orders[currentOrder] &&  (
         <OrderDocViewComponent id={id} data={orders[currentOrder]} credentials={data.credentials} orderId={currentOrder}/>
        )}
          
        </Box>
      </CardContent>
      <Divider />
    </Card>
  }
    </Grid>
    </>    
    )
  };
  