// libs
import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

// high order comppnents
import ParentTagContructor from './components/Parents/ParentTagConstructor';
import ParentUser from './components/Parents/ParentUser';

// pages
import HomePage from './components/pages/HomePage';
import LoginPage from './components/pages/LoginPage';
import RegisterPage from './components/pages/RegisterPage';
import HomeContactForm from './components/pages/HomeContactForm';

// providers
import { ProvideAuth, useAuth } from './helpers/use-auth.js';
import { CookiesProvider } from 'react-cookie';

export default function App() {
  const auth = useAuth();
  return (
    <CookiesProvider>
      <ProvideAuth>
        <BrowserRouter>
          <Switch>
            <Route path="/login/register">
              {auth ? (
                <Redirect
                  to={{
                    pathname: '/',
                  }}
                />
              ) : (
                <RegisterPage />
              )}
            </Route>
            <Route path="/login">
              {auth ? (
                <Redirect
                  to={{
                    pathname: '/',
                  }}
                />
              ) : (
                <LoginPage />
              )}
            </Route>
            <Route path="/tag-constructor">
              <ParentTagContructor />
            </Route>
            <Route path="/contact-form">
              <HomeContactForm />
            </Route>
            <Route path="/user">
              <ParentUser />
            </Route>
            <Route path="/">
              <HomePage />
            </Route>
          </Switch>
        </BrowserRouter>
      </ProvideAuth>
    </CookiesProvider>
  );
}
