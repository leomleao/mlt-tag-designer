// Libs
import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

// Components
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomeContactForm from './pages/HomeContactForm';
import UserProfilePage from './pages/UserProfilePage';
import UserAddressesPage from './pages/UserAddressesPage';
import UserOrdersPage from './pages/UserOrdersPage';
import TagSumaryPage from './pages/TagSumaryPage';
import TagShippingPage from './pages/TagShippingPage';
import TagPaymentPage from './pages/TagPaymentPage';
import TagSubmitedPage from './pages/TagSubmitedPage';
import TagConstructorPage from './pages/TagConstructorPage';

// Helpers
import ScrollToTop from './helpers/ScrollToTop';
// import { MessageModal, useMessageModal } from './components/MessageModal';

// Providers
import { ProvideAuth, useAuth } from './helpers/use-auth.js';
// import { ProvideOrder } from './helpers/use-order.js';

export default function App() {
  const auth = useAuth();
  return (
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
          <Route path="/tag-constructor">{/* <ParentTagContructor /> */}</Route>
          <Route path="/contact-form">
            <HomeContactForm />
          </Route>
          <Route path="/user">{/* <ParentUser /> */}</Route>
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
      </BrowserRouter>
    </ProvideAuth>
  );
}
