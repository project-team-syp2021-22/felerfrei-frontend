import { AuthProvider } from '../components/authprovider'
import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider, useStore } from 'react-redux';
import store from '../redux/store';
import { createStore } from 'redux';


function MyApp({ Component, pageProps }) {

  return (
    <Provider store={store}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </Provider>
  )
}

export default MyApp
