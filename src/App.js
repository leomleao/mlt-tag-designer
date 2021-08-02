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
import { MessageModal, useMessageModal } from './components/MessageModal';

// Providers
import { ProvideAuth, useAuth } from './helpers/use-auth.js';
import { ProvideOrder } from './helpers/use-order.js';

export default function App() {
  const auth = useAuth();
  const [modalState, dispatch] = useMessageModal();

  return (
    <ProvideAuth>
      <BrowserRouter>
        <ScrollToTop />
        <MessageModal state={modalState} dispatch={dispatch} />
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route path="/login/register">
            {auth ? (
              <Redirect
                to={{
                  pathname: '/',
                }}
              />
            ) : (
              <RegisterPage showMessage={dispatch} />
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
              <LoginPage showMessage={dispatch} />
            )}
          </Route>
          <Route path="/tag-constructor">
            <ProvideOrder>
              <Switch>
                <Route path="/tag-constructor/sumary">
                  <TagSumaryPage />
                </Route>
                <Route path="/tag-constructor/shipping">
                  <TagShippingPage />
                </Route>
                <Route path="/tag-constructor/payment">
                  <TagPaymentPage />
                </Route>
                <Route path="/tag-constructor/submited">
                  <TagSubmitedPage />
                </Route>
                <Route path="/tag-constructor">
                  <TagConstructorPage showMessage={dispatch} />
                </Route>
              </Switch>
            </ProvideOrder>
          </Route>
          <Route path="/user/profile">
            <UserProfilePage />
          </Route>
          <Route path="/user/addresses">
            <UserAddressesPage showMessage={dispatch} />
          </Route>
          <Route path="/user/orders">
            <UserOrdersPage />
          </Route>
          <Route path="/contact-form">
            <HomeContactForm showMessage={dispatch} />
          </Route>
        </Switch>
      </BrowserRouter>
    </ProvideAuth>
  );
}
