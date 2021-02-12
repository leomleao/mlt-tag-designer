import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import TagContructorPage from './components/pages/TagConstructorPage';
import LoadingPage from './components/pages/LoadingPage';
import HomePage from './components/pages/HomePage';
import SignInPage from './components/pages/SignInPage';

import { ProvideAuth } from './helpers/use-auth.js';
import { useAuth } from './helpers/use-auth.js';

export default function App() {
  // Get auth state and re-render anytime it changes
  const auth = useAuth();

  // timer 1 seg to simulate loading
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ProvideAuth className="container">
      {loading ? (
        <LoadingPage />
      ) : (
        <Router>
          <Switch>
            <Route path="/login">
              {auth ? (
                <Redirect
                  to={{
                    pathname: '/',
                  }}
                />
              ) : (
                <SignInPage />
              )}
            </Route>
            <Route path="/register">
              {auth ? (
                <Redirect
                  to={{
                    pathname: '/',
                  }}
                />
              ) : (
                <SignInPage />
              )}
            </Route>
            <Route path="/tag-constructor">
              <TagContructorPage />
            </Route>
            <Route path="/contact-form">{/* <Register /> */}</Route>
            <Route path="/">
              <HomePage />
            </Route>
          </Switch>
        </Router>
      )}
    </ProvideAuth>
  );
}
