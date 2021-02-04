import React, { useContext, createContext, useState, useEffect } from 'react';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation,
} from 'react-router-dom';

import LoadingPage from './components/pages/LoadingPage';
import TagContructorPage from './components/pages/TagConstructorPage';
import HomePage from './components/pages/HomePage';
import SignInPage from './components/pages/SignInPage';

import AuthExample from './components/appRouter';

firebase.initializeApp({
  apiKey: 'AIzaSyA4eAACl-RFWCXGhryzunfYneOBAuZmPXk',
  authDomain: 'my-app-fba6c.firebaseapp.com',
  databaseURL: 'https://my-app-fba6c-default-rtdb.firebaseio.com',
  projectId: 'my-app-fba6c',
  storageBucket: 'my-app-fba6c.appspot.com',
  messagingSenderId: '129573863830',
  appId: '1:129573863830:web:8865bff753e5aef0d71db7',
  measurementId: 'G-DQPHS5JE14',
});

const auth = firebase.auth();
const firestore = firebase.firestore();
const analytics = firebase.analytics();

/**
 * App function
 */
export default function App() {
  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState(true);

  // timer 1 seg to simulate loading
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setLoading(false);
  //   }, 1000);
  //   return () => clearTimeout(timer);
  // }, []);

  return (
    <>
      {loading ? (
        <AuthExample />
      ) : (
        <Router>
          <>
            <section>
              <Switch>
                <Route path="/login">
                  {user ? (
                    <Redirect
                      to={{
                        pathname: '/',
                      }}
                    />
                  ) : (
                    <SignInPage googleSignIn={signInWithGoogle} />
                  )}
                </Route>
                <Route path="/register">{/* <Users /> */}</Route>
                <Route path="/">
                  <HomePage user={user} />
                </Route>
              </Switch>
            </section>
          </>
        </Router>
      )}
    </>
  );
}
/**
 *
 * App function ends here
 *
 */
export function SignOut({ onSignOut }) {
  const signOut = () =>
    auth
      .signOut()
      .then(() => {
        // Sign-out successful.
        onSignOut();
      })
      .catch((error) => {
        // An error happened.
      });

  return (
    auth.currentUser && (
      <button className="sign-out" onClick={signOut}>
        Sign Out
      </button>
    )
  );
}

function signInWithGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth
    .signInWithPopup(provider)
    .then((result) => {
      /** @type {firebase.auth.OAuthCredential} */
      var credential = result.credential;

      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
}
