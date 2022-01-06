import { AuthProvider } from '../components/authprovider'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css'
import { Provider, useStore } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '../redux/store';

function MyApp({ Component, pageProps }) {


  return (
    <>
      <link
        rel="preload"
        href="/fonts/electrica/Electrica-Regular.ttf"
        as="font"
        crossOrigin=""
      />
      <link
        rel="preload"
        href="/fonts/electrica/Electrica-Medium.ttf"
        as="font"
        crossOrigin=""
      />
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AuthProvider>
            <Component {...pageProps} />
          </AuthProvider>
        </PersistGate>
      </Provider>
    </>
  )
}

export default MyApp
