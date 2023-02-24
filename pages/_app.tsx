import React from 'react';
import 'tailwindcss/tailwind.css';
import '../styles/globals.scss'
import { SessionProvider } from 'next-auth/react'
import SessionProviderContext from '../context/sessionContext'

function App({ Component, pageProps }) {
  return (
    <SessionProviderContext>
    {/* <SessionProvider session={pageProps.session}> */}
      <Component {...pageProps} />
    {/* </SessionProvider> */}
    </SessionProviderContext>
  )
}

export default App
