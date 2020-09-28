/* eslint-disable react/jsx-props-no-spreading */

import React, { useEffect } from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import ScopedCssBaseline from '@material-ui/core/ScopedCssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';

import theme from '../styles/theme';

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');

    if (jssStyles) jssStyles.parentElement.removeChild(jssStyles);
  }, []);

  return (
    <>
      <Head>
        <title>Edukat</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <ScopedCssBaseline>
          <Component {...pageProps} />
        </ScopedCssBaseline>
      </ThemeProvider>
    </>
  );
}
