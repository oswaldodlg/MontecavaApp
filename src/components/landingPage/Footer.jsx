import React from 'react';
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import Link from 'next/link';


import Logo from '../../../assets/img/MontecavaLogo.png'


import { makeStyles } from '@mui/styles';
import { useTheme } from '@emotion/react';

const useStyles = makeStyles((theme) => ({
  contenedorFooter:{
    backgroundColor: '#010226',
    color: '#FFFFFF',
    display: 'block',
    padding:'5vh 0vh',
    minHeight:'40vh',
    [theme.breakpoints.up('md')]: {
        display:'flex',
        justifyContent:'end'
      },
    [theme.breakpoints.down('md')]: {
    display:'flex',
    justifyContent:'center',
    textAlign: 'center',
    placeContent: 'center'
    },
  },
  containerInfo:{
    display: 'flex',
    minHeight: '30vh',
    
  },
  contactoInfo:{
    borderTop:'inset',
    borderTopColor:'#D9202E'
  },
  contenedorInfoServicios:{
    [theme.breakpoints.up('xs')]: {
      display: 'block',
      textAlign:'center'
    },
    [theme.breakpoints.up('md')]: {
      display:'flex',
      textAlign:'left'
    },
  },
  iconoFooter:{
    padding: '5vh'
  },
  infoServicios:{
    padding: '2vh',
    
    
    [theme.breakpoints.up('md')]: {
      borderTop:'inset',
      borderTopColor:'#D9202E',
    },
  },
  contenedorMarca:{
    borderTop:'inset',
    
    alignItems:'center',
    textAlign:'center',
    backgroundColor:'#010226',
    color: 'white'
  }
}))

export default function Footer() {

  const classes = useStyles()
  const theme = useTheme()

    return (
      <>
        <Box className={classes.contenedorFooter}>
            <Grid container item={true} xs={12} md={10} >
                <Grid item xs={12} md={4} alignSelf='center' sx={{padding: '4h'}}>
                    <Image  src={Logo.src} width={150} height={150}/>
                </Grid>
                
                    <Grid item xs={12} md={4} sx={{justifyContent: 'center', alignSelf: 'center'}} >
                        <Link href={"/Nosotros"} passHref><Typography  sx={{cursor: 'pointer', paddingY: '1vh'}}>Nosotros</Typography></Link>
                        <Link href={"/Servicios"} passHref><Typography  sx={{cursor: 'pointer', paddingY: '1vh'}}>Servicios</Typography></Link>
                        <Link href={"/TerminosyCondiciones"} passHref><Typography sx={{cursor: 'pointer', paddingY: '1vh'}}>Términos y Condiciones</Typography></Link>
                        <Link href={"/login"} passHref><Typography sx={{cursor: 'pointer', paddingY: '1vh'}}>Dashboard</Typography></Link>
                    </Grid>
                    <Grid item xs={12} md={4} sx={{justifyContent: 'center', alignSelf: 'center'}} >
                       <Typography  sx={{cursor: 'pointer', paddingY: '1vh'}}> 8888 888 88</Typography>
                        <Typography  sx={{cursor: 'pointer', paddingY: '1vh'}}>montecavaapp@gmail.com</Typography>
                    </Grid>   
            </Grid>
        </Box>

        <Box className={classes.contenedorMarca} padding="5vh">
          <Typography>© 2022 Montecava - TODOS LOS DERECHOS RESERVADOS.</Typography>
        </Box>
      </>
    )
}

{/* <a href="tel:818-252-9822">818 252 9822</a> */}

