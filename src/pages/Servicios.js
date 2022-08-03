import React, { useEffect, useRef, useState } from 'react';
import {  Grid, Typography, Button, Paper, List, ListItem, Card } from '@mui/material';
import { Box, minHeight, textAlign } from '@mui/system';
import Image from 'next/image'
import { makeStyles } from '@mui/styles';

const Hero = 'https://images.unsplash.com/photo-1447126134204-a9a6c70c2c4d';
const fotoGestion = 'https://images.unsplash.com/photo-1423592707957-3b212afa6733';
const fotoAsesoramiento = 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40';
const fotoGestorias = 'https://images.unsplash.com/photo-1627634777217-c864268db30c';
// import fotoElaboracion from '../assets/img/FOTOELABORACION.png'
import { useRouter } from 'next/router';
import Layout from 'src/components/landingPage/Layout';
import { monthlyPlans, bimestralPlans, anualPlans, individualServices } from 'src/utils/suscription-info';
import CurrencyFormat from 'react-currency-format';

const useStyles = makeStyles((theme) => ({
    containerBanner: {
        backgroundImage: `url(${Hero})`,
        backgroundSize: 'cover',
        backgroundPosition:'top',
        minHeight:'62vh',
        position: 'relative',
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
      },
      elementosBanner:{
        padding: '5vh 0vh',
        alignItems:'center',
        justifyContent: 'center'
    },
    contenedorBanner:{
        backgroundImage: `url(${Hero})`,  
        minHeight: '67.5vh',
        backgroundPosition: 'top',
        backgroundRepeat: "no-repeat",
        backgroundSize:'cover',
        position: 'relative',
        display: 'block',
        justifyContent: 'center',
        alignItems: 'center',
        color:'#fff',
    },

    containerSocialMedia:{
        textAlign:'-webkit-right'
    },
    containerBotones:{
     
    },
    bannerButtons:{
        backgroundColor: '#E9E9E9',
        color:'#163860',
        height: '14vh',
        width: '100%',
        '&:hover': {
            backgroundColor:'#163860',
            color:'#FFFFFF'
          },
    },
    contenedor1textoGestion:{
        padding: '5vh'
    },
    contenedorSeccion1:{
        
        paddingBottom: '10vh',
        display:'block',
        height: 'auto'
    },
    contenedorImgSeccion1:{
        backgroundImage:`url(${fotoGestion})`,
       minHeight:'44vh',
       backgroundPosition:'center',
       backgroundSize:'cover',
       backgroundRepeat: 'no-repeat',
    },
    contenedorSeccion2:{
    paddingTop:'10vh',
    paddingBottom: '10vh',
     backgroundColor: '#F1F1F1',
     [theme.breakpoints.down('md')]: {
        paddingTop:'4vh',
        paddingBottom: '4vh',
      },
    },
    contenedorImgSeccion2:{
        backgroundImage:`url(${Hero})`,
        backgroundPosition:'center',
        minHeight:'73vh',
        backgroundSize:'cover',
        backgroundRepeat: 'no-repeat'
    },
    listaSeccion2:{
        paddingTop:'4vh',
        
    },
    contenedorImgSeccion3:{
        backgroundImage:`url(${fotoAsesoramiento.src})`,
        backgroundPosition:'center',
        minHeight:'73vh',
        backgroundSize:'cover',
        backgroundRepeat: 'no-repeat'
    },
    contenedorSeccion3:{
        paddingTop:'10vh',
        paddingBottom: '10vh',
         backgroundColor: '#FFFFF',
         [theme.breakpoints.down('md')]: {
            paddingTop:'4vh',
            paddingBottom: '4vh',
          },
        },
    contenedorImgSeccion4:{
        backgroundImage:`url(${fotoGestorias})`,
        backgroundPosition:'center',
        minHeight:'73vh',
        backgroundSize:'cover',
        backgroundRepeat: 'no-repeat'
    }
}))

export default function Servicios() {

    const [currentPlan, setCurrentPlan] = useState(monthlyPlans)

    // const router = useRouter()

    // const firstRef = useRef(null)
    // const secondRef = useRef(null)
    // const thirdRef = useRef(null)
    // const fourthRef= useRef(null)

    // const executeScroll = (ref) => ref.current.scrollIntoView()    


    // useEffect(() => {
        
    //     const { ref } = router.query
    //     console.log(ref)
    //     if (ref){
    //         if(ref==='firstRef'){
    //             return executeScroll(firstRef)
    //         } else if(ref==='secondRef'){
    //             return executeScroll(secondRef)
    //         } else if(ref==='thirdRef'){
    //             return executeScroll(thirdRef)
    //         } else if(ref==='fourthRef'){
    //             return executeScroll(fourthRef)
    //         }
    //     }
        
    // }, [router.query])

   

    

    

    const classes = useStyles()
    return (
        <>

        <Box className={classes.containerBanner}>
            <Grid container sx={{justifyContent: 'center', marginTop: {xs:0 , md: '5vh'},py: {xs: '10vh', md: 0}}} >
                <Grid item xs={10} md={5} color="#FFFFFF" >
                <Typography variant="h3" textTransform='uppercase'  letterSpacing='0.15em'>Servicios</Typography>
                <Typography variant='p' paddingTop='8vh'>En Montecava nuestra prioridad es superar las expectativas de nuestros clientes, ofreciendo soluciones en todo lo relacionado a contabilidad financiera.</Typography>
                </Grid>        
            </Grid>
            <Grid container justifyContent="center" >
                    <Grid item xs={12} md={10} sx={{ 
                        display: { xs: 'block', md: 'flex' },
                        
                        justifyContent:'center',
                        position: {xs: 'inherit', md:'absolute'},
                        bottom: {xs:'inherit', md: -40},
                        width: '100%'
                        }}>
                        <Grid item xs={12} md={3}>
                            <Button className={classes.bannerButtons} variant="contained" aria-label="large button group" 
                            // onClick={() => executeScroll(firstRef)}
                            onClick={() => setCurrentPlan(monthlyPlans)}
                            >
                               <Typography variant='textoBotonesServiciosBanner'> Planes Mensuales</Typography>
                            </Button>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <Button className={classes.bannerButtons} variant="contained" aria-label="large button group" 
                            // onClick={() => executeScroll(secondRef)}
                            onClick={() => setCurrentPlan(bimestralPlans)}
                            >
                                <Typography variant='textoBotonesServiciosBanner'> Planes Bimestrales </Typography>
                                </Button>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <Button className={classes.bannerButtons} variant="contained" aria-label="large button group" 
                            // onClick={() => executeScroll(thirdRef)}
                            onClick={() => setCurrentPlan(anualPlans)}
                            >
                            <Typography variant='textoBotonesServiciosBanner'>Planes Anuales</Typography>
                            </Button>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <Button className={classes.bannerButtons} variant="contained" aria-label="large button group" 
                            // onClick={() => executeScroll(fourthRef)}
                            onClick={() => setCurrentPlan(individualServices)}
                            >
                            <Typography variant='textoBotonesServiciosBanner'>Servicios Individuales</Typography>
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
        </Box>
        <Box sx={{minHeight: '50vh', paddingTop: '15vh', paddingBottom: '10vh', backgroundColor: '#010226'}}>
                <Grid container sx={{justifyContent: 'center'}}>
                        <Grid item xs={10} sx={{display:'flex', flexWrap: 'wrap', justifyContent:'center'}}>
                         {currentPlan && currentPlan.map((plan, index) => {
                            return(
                                <Grid item key={index} xs={12} md={6} p={2}>
                                <Card sx={{padding: '5vh', backgroundColor: '#f1f58f', boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)'}}> 
                                    {currentPlan === individualServices ?  <Typography variant="h6" sx={{textAlign: 'center'}}>{plan.name}</Typography>
                                    :<Typography variant="h4" sx={{textAlign: 'center'}}>{plan.name}</Typography>
                                    }
                                    {plan.term && <Typography variant="h6" sx={{textAlign: 'center'}}>{plan.term}</Typography>}
                                    {plan.privileges && 
                                    <Grid item py={2} sx={{height: {xs:'auto', md: '35vh'}, alignItems: 'center' , display: 'flex', flexWrap: 'wrap'}}>
                                    {plan.privileges.map((privilege, index) => {
                                        return(
                                            <Typography key={index}>-{privilege}</Typography>
                                        )
                                    })}
                                    </Grid>
                                    }
                                    {Number.isInteger(plan.cost) ? 
                                    <CurrencyFormat value={plan.cost} displayType={'text'} thousandSeparator={true} prefix={'$'} suffix={' MXN'} renderText={value => <Typography id="modal-modal-title" variant="h6" component="h2" sx={{textAlign: 'center', py: 2}}>{value}</Typography>} />
                                    : <Typography id="modal-modal-title" variant="h6" component="h2" sx={{textAlign: 'center', py: 2}}>{plan.cost}</Typography>
                                    }
                                </Card>
                                </Grid>
                            )
                            })}
                        </Grid>
                </Grid>
        </Box>


          
        </>
    )
}

Servicios.getLayout = (page) => (
    <Layout>
      {page}
    </Layout>
  );
