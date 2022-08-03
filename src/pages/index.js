import React, { useEffect } from 'react'
import { Box, Grid, Typography, Link } from '@mui/material';
import {useRouter} from 'next/router'
import { CircularProgress } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Layout from 'src/components/landingPage/Layout';

const Hero = "https://images.unsplash.com/photo-1560179707-f14e90ef3623"

const useStyles = makeStyles((theme) => ({
  
  hero: {
    
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.22),
    rgba(0, 0, 0, 0.22)),url(${Hero})`,
    minHeight: '100vh',
    backgroundPosition: 'center',
    backgroundRepeat: "no-repeat",
    backgroundSize:'cover',
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color:'#fff',
    flexDirection: 'column'
    
},
}
))

export default function Home() {

const router = useRouter()
const classes = useStyles()

// useEffect(() => {
//     router.push('/login')
// }, [])
      
      return (
        <Box className={classes.hero}>
        <Grid container sx={{justifyContent: 'center', paddingY: {xs: '10vh', md: '25vh'}}}>
        <Grid item xs={10} sx={{textAlign: 'center'}}>
            <Typography variant='h2'> Servicios y Soluciones <br /> en Contaduría</Typography>
        </Grid>
        </Grid>
        <Grid container sx={{justifyContent: 'center', textAlign: 'end', }}>
          <Grid item xs={10}>
            {/* <Typography variant='textoHero' sx={{display: 'block'}}><Link className={classes.links} underline="hover" color="inherit">Facebook</Link></Typography>
            <Typography variant='textoHero' sx={{display: 'block'}}><Link className={classes.links} underline="hover" color="inherit">Linkedin</Link></Typography> */}
          </Grid>
          </Grid>  
      </Box>
      )

}

Home.getLayout = (page) => (
  <Layout>
    {page}
  </Layout>
);
