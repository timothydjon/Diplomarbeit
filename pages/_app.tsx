import React from 'react';
import 'tailwindcss/tailwind.css';
import '../styles/globals.scss'

export default function App ({Component, pageProps}){
    return <Component {...pageProps} />
}