import {AuthProvider} from '../components/authprovider'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css'
import {Provider, useStore} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from '../redux/store';
import NavigationBar from '../components/navbar';
import React from "react";

function MyApp({Component, pageProps}) {


    return (
        <>
            <link
                rel="preload"
                href="/fonts/electrica/Electrica-Regular.ttf"
                as="font"
                crossOrigin="*"
            />
            <link
                rel="preload"
                href="/fonts/electrica/Electrica-Medium.ttf"
                as="font"
                crossOrigin="*"
            />
            <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no"></meta>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <AuthProvider>
                        <div>
                            <style global jsx>{`
                              html,
                              body,
                              body > div:first-child,
                              div#__next,
                              div#__next > div {
                                height: 100%;
                              }
                            `}</style>
                            <NavigationBar/>

                            <Component {...pageProps} />
                        </div>
                    </AuthProvider>
                </PersistGate>
            </Provider>
        </>
    )
}

export default MyApp
