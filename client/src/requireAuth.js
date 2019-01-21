import React from 'react';
import { Redirect } from 'react-router-dom';
import jwt from 'jsonwebtoken';

const keyName = 'login_token';

export default ComposedComponent => {
  function requireAuth(props) {
    console.log(props);
    const token = localStorage.getItem(keyName);

        const token = window.localStorage.getItem(keyName);

      if (decoded && currentTime > decoded.exp) {
        localStorage.removeItem(keyName);
        return <Redirect to={'/login'} />;
      }

      return <ComposedComponent {...props} />;
    }

    return <Redirect to={'/login'} />;
  }

  return requireAuth;
};
