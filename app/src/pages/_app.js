import React from 'react';
import '../styles/null.css'
import '../styles/global.css'
import { AppWrapper } from '../context/context'


const MyApp = ({ Component, pageProps }) => {
    return (
        <AppWrapper>
            <Component {...pageProps} />
        </AppWrapper>
    );
};

export default MyApp;