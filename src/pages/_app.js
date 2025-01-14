import Head from 'next/head';
import { CacheProvider } from '@emotion/react';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import React from 'react'
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { createEmotionCache } from '../utils/create-emotion-cache';
import { theme } from '../theme';
import { CartProvider } from "react-use-cart";
import { AuthContextProvider } from '../context/AuthContext';
import AuthRoute from 'src/HOC/authRoute';




const clientSideEmotionCache = createEmotionCache();

function App (props)  {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  const getLayout = Component.getLayout ?? ((page) => page);

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  
  

  return (

    <AuthContextProvider>
    <CartProvider>
    {/* <CacheProvider value={emotionCache}> */}
      <Head>
        <title>
          MonteCava App
        </title>
        <meta
          name="viewport"
          content="initial-scale=1, width=device-width"
        />
      </Head>
      {/* <LocalizationProvider dateAdapter={AdapterDateFns}> */}
        <ThemeProvider theme={theme}>
          <CssBaseline />
          
          {/* <RouteProtection props={props} /> */}
          <AuthRoute>
          {getLayout(<Component {...pageProps} />)}
          </AuthRoute>
          
        </ThemeProvider>
      {/* </LocalizationProvider> */}
    {/* </CacheProvider> */}
    </CartProvider>
    </AuthContextProvider>

  );
};

export default App;
