import Head from 'next/head';
import { CacheProvider } from '@emotion/react';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import React from 'react'
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { createEmotionCache } from '../utils/create-emotion-cache';
import { theme } from '../theme';

import { AuthContextProvider } from '../context/AuthContext';
import AuthRoute from 'src/HOC/authRoute';



const clientSideEmotionCache = createEmotionCache();

function App (props)  {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  const getLayout = Component.getLayout ?? ((page) => page);

  
  

  return (
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
    
  );
};

export default App;
