import React from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import AppBody from '../AppBody';
import Footer from '../Footer';
import Header from '../Header';
import { SignOut } from '../../App';

export default function HomePage({ user }) {
  let history = useHistory();
  let location = useLocation();

  return (
    <>
      <Header>
        {user ? (
          <SignOut onSignOut={() => history.push('/')} />
        ) : (
          <p>
            You are not logged in.
            <button>
              <Link to={{ pathname: '/Login', state: { from: location } }}>
                Login
              </Link>
            </button>
          </p>
        )}
      </Header>

      <AppBody>
        {user ? (
          <>
            <h3>Hello {user.displayName}!</h3>
            <p>User ID: {user.uid}</p>
          </>
        ) : (
          '<></>'
        )}
      </AppBody>
      <Footer>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
          </ul>
        </nav>
      </Footer>
    </>
  );
}
