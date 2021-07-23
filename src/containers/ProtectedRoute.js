import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { isAuthenticated } from '../utils/auth';

export default function ProtectedRoute({ path = '/', children, ...props }) {
  const logged = isAuthenticated();

  return (
    <Route path={path} {...props}>
      {logged ? children : <Redirect to="/login" />}
    </Route>
  );
}
