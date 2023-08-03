import { useEffect } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';
import Loading from './components/Loading';
import Home from './views/Home';
import Profile from './views/Profile';
import ExternalApi from './views/ExternalApi';
import { useAuth0 } from '@auth0/auth0-react';
import history from './utils/history';

// styles
import './App.css';

// fontawesome
import initFontAwesome from './utils/initFontAwesome';
initFontAwesome();

const App2 = () => {
  const { isLoading, getAccessTokenSilently, isAuthenticated } = useAuth0();

  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }
    getAccessTokenSilently().catch((e) => {
      console.error(e);
    });
  }, [getAccessTokenSilently, isAuthenticated]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Router history={history}>
      <div id='app' className='d-flex flex-column h-100'>
        <Container className='flex-grow-1'>
          <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/profile' component={Profile} />
            <Route path='/external-api' component={ExternalApi} />
          </Switch>
        </Container>
      </div>
    </Router>
  );
};

export default App2;
