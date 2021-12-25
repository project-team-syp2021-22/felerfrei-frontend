import { AuthProvider } from '../components/authprovider'
import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider, useStore } from 'react-redux';
import store from '../redux/store';
import { createStore } from 'redux';


function MyApp({ Component, pageProps }) {

  const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

  return (
    <Provider store={store}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </Provider>
  )
}

export default MyApp
