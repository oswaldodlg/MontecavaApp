import Head from 'next/head';
import { CacheProvider } from '@emotion/react';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import React from 'react'
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { createEmotionCache } from '../utils/create-emotion-cache';
import { theme } from '../theme';

import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';


// const stripePromise = loadStripe('pk_test_51KW3K3IRdJgHOkTq299TgYNvXjauKnJfHbYYUmnN6gsNpKbHweb6FsO2AzMOqITmteVKxw089tUz9ZCNTpVIp5PE00K6aMQUj3');

import { AuthContextProvider } from '../context/AuthContext';
import AuthRoute from 'src/HOC/authRoute';



const clientSideEmotionCache = createEmotionCache();

function App (props)  {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  const getLayout = Component.getLayout ?? ((page) => page);

  const options = {
    // passing the client secret obtained from the server
    clientSecret: process.env.NEXT_PUBLIC_STRIPE_SECRET,
    LocalizationProvider
  };


  
  

  return (
    // <Elements stripe={stripePromise} options={options}>
    <AuthContextProvider>
    <CacheProvider value={emotionCache}>
      <Head>
        <title>
          MonteCava App
        </title>
        <meta
          name="viewport"
          content="initial-scale=1, width=device-width"
        />
      </Head>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          
          <AuthRoute>
          {getLayout(<Component {...pageProps} />)}
          </AuthRoute>
          
        </ThemeProvider>
      </LocalizationProvider>
    </CacheProvider>
    </AuthContextProvider>
    // </Elements>
  );
};

export default App;
