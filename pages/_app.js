import { AuthProvider } from '../components/authprovider'
import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider, useStore } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '../redux/store';

function MyApp({ Component, pageProps }) {


  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </PersistGate>
    </Provider>
  )
}

export default MyApp
