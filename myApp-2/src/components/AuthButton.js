import { useCallback } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from 'reactstrap';

export const AuthButton = () => {
  const { isAuthenticated, loginWithPopup, logout } = useAuth0();

  const clickHandler = useCallback(() => {
    if (isAuthenticated) {
      logout({ logoutParams: { returnTo: window.location.origin } }).then(
        () => {
          window.parent.postMessage(
            {
              source: 'embedded-app',
              type: 'logout',
            },
            '*'
          );
        }
      );
    } else {
      loginWithPopup().then(() => {
        window.parent.postMessage(
          {
            source: 'embedded-app',
            type: 'login',
          },
          '*'
        );
      });
    }
  }, [isAuthenticated, loginWithPopup, logout]);

  return (
    <Button color='primary' block onClick={clickHandler}>
      {isAuthenticated ? 'Log Out' : 'Log In'}
    </Button>
  );
};
