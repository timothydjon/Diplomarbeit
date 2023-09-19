import React from 'react';
import 'tailwindcss/tailwind.css';
import '../styles/globals.scss'
import SessionProviderContext from '../context/sessionContext'
import Head from 'next/head';

function App({ Component, pageProps }) {
  return (
    <SessionProviderContext>
      <Head>
      <link rel="icon" type="image/png" sizes="32x32" href="/assets/favicon-32x32.png"/>
      </Head>
    {/* <SessionProvider session={pageProps.session}> */}
      <Component {...pageProps} />
    {/* </SessionProvider> */}
    </SessionProviderContext>
  )
}

export default App


