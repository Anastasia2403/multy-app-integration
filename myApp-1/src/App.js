import { useEffect } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { listenToEmbededApp } from './serviceWorker';
import Loading from './components/Loading';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Home from './views/Home';
import { EmbeddedApp } from './views/EmbeddedApp';
import Profile from './views/Profile';
import ExternalApi from './views/ExternalApi';
import { useAuth0 } from '@auth0/auth0-react';
import history from './utils/history';

// styles
import './App.css';

// fontawesome
import initFontAwesome from './utils/initFontAwesome';
initFontAwesome();

const App = () => {
  const { isLoading, getAccessTokenSilently, logout } = useAuth0();

  useEffect(() => {
    listenToEmbededApp({
      onLogin() {
        getAccessTokenSilently()
          .then((accessToken) => {
            console.log({ accessToken });
          })
          .catch((e) => {
            console.error(e);
          });
      },
      onLogout() {
        logout({
          logoutParams: { returnTo: `${window.location.origin}/embedded-app` },
        });
      },
    });
  }, [getAccessTokenSilently, logout]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Router history={history}>
      <div id='app' className='d-flex flex-column h-100'>
        <NavBar />
        <div className='flex-grow-1 my-5'>
          <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/profile' component={Profile} />
            <Route path='/external-api' component={ExternalApi} />
            <Route path='/embedded-app' component={EmbeddedApp} />
          </Switch>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
