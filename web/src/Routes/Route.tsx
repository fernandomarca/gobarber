/* eslint-disable indent */
/* eslint-disable react/jsx-indent */
/* eslint-disable prettier/prettier */
import React from 'react';
import {
  RouteProps as ReactDomRouteProps,
  Route as ReactDomRoute,
  Redirect,
} from 'react-router-dom';
import { useAuth } from '../hooks/AuthContext';

interface RouteProps extends ReactDomRouteProps {
  isPrivate?: boolean;
  component: React.ComponentType;
}

const Route: React.FC<RouteProps> = ({
  isPrivate = false,
  component: Component,
  ...rest
}) => {
  const { user } = useAuth();

  return (
    <ReactDomRoute
      {...rest}
      render={({ location }) => {
        return isPrivate === !!user ? (
          <Component />
        ) : (
            <Redirect to={{
              pathname: isPrivate ? '/' : '/dashboard',
              state: { from: location },
            }}
            />
          );
      }}
    />
  );
};

export default Route;

// isPrivete=true && user=true = ok - vai para dashboard
// isPrivete=false && user=true = dashboard

// isPrivete=true && user=false = login
// isPrivete=false && user=false = login
