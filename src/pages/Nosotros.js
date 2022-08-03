import React, { useEffect, useRef } from 'react';
import {  Grid, Typography, Card} from '@mui/material';
import { Box } from '@mui/system';
import Image from 'next/image'
import { makeStyles } from '@mui/styles';

const Hero = 'https://images.unsplash.com/photo-1505664063603-28e48ca204eb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80';

import IconoCompromiso from '../../public/static/images/ICONOCOMPROMISO.png';
import IconoConfianza from '../../public/static/images/ICONOCONFIANZA.png';
import IconoVision from '../../public/static/images/ICONOTRANSPARENCIA.png'

import { useRouter } from 'next/router';
import Layout from 'src/components/landingPage/Layout';



const infoNosotros = [
    {
        title: 'Misión',
        img: IconoCompromiso.src,
        text: 'Resolver las necesidades de nuestros clientes en el área contable, fiscal y financiero.'
    },
    {
        title: 'Visión',
        img: IconoVision.src,
        text: 'Convertirnos en el mejor despacho contable de México, con objetivos a corto, mediano y largo plazo.' 
    },
    {
        title: 'Valores',
        img: IconoConfianza.src,
        text: 'Honestidad, Responsabilidad, Profesionalismo'
    }
    
]

const useStyles = makeStyles((theme) => ({
    containerBanner: {
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5),
        rgba(0, 0, 0, 0.5)), url(${Hero})`,
        backgroundSize: 'cover',
        backgroundPosition:'bottom',
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

}))

export default function Nosotros() {

    const classes = useStyles()
    return (
        <>

        <Box className={classes.containerBanner}>
            <Grid container sx={{justifyContent: 'center', marginTop: {xs:0 , md: '8vh'},py: {xs: '10vh', md: 0}}} >
                <Grid item xs={10} md={5} color="#FFFFFF" >
                <Typography variant="h3" textTransform='uppercase'  letterSpacing='0.15em' py={1}>Nosotros</Typography>
                <Typography variant='p'>Somos un despacho creado en el 2007 diseñado con el objetivo de resolver completamente las necesidades de nuestros clientes en el aspecto contable, fiscal y financiero. Estamos ubicados en Hacienda Coyoacán No. 4112 Col. Residencial La Hacienda, C.P. 64890 Monterrey N.L. México.</Typography>
                </Grid>        
            </Grid>
        </Box>
        <Box>
            <Grid container sx={{justifyContent: 'center', py: '10vh'}} spacing={3}>
                {infoNosotros.map((info, index) => {
                    return (
                        <Grid item xs={10} md={3} key={index}>
                            <Card sx={{textAlign: 'center', boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)', py: '2vh'}}>
                                <Image src={info.img} width={130} height={130}/>
                                <Typography variant='h5'>{info.title}</Typography>
                                <Grid item sx={{height: '20vh', padding: '4vh'}}>
                                <Typography>{info.text}</Typography>
                                </Grid>
                            </Card>
                        </Grid>
                    )
                })}
            </Grid>
        </Box>
        <Box sx={{backgroundColor: '#010226'}}>
            <Grid container sx={{justifyContent: 'center', color: 'white', textAlign: 'center'}}>
                <Grid item xs={10}>
                    <Typography py={4} variant="h5" textTransform='uppercase'  letterSpacing='0.15em'>
                        Siempre listo para servir
                    </Typography>
                    <Typography variant='h5'>
                        Saludos Cordiales
                    </Typography>
                    <Typography variant='h6' py={2}>
                        Despacho MONTECAVA Consultores S.C. <br/>
                        MBA y C.P. Hugo César Montemayor Cavazos
                    </Typography>
                </Grid>
            </Grid>
        </Box>
        </>
    )
}

Nosotros.getLayout = (page) => (
    <Layout>
      {page}
    </Layout>
  );
