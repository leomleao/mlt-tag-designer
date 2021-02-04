import React from 'react';
import { useLocation } from 'react-router-dom';

export default function SignInPage({ googleSignIn }) {
  let location = useLocation();
  let { from } = location.state;
  console.log(from.pathname);
  return (
    <>
      <button className="sign-in" onClick={googleSignIn}>
        Sign in with Google
      </button>
    </>
  );
}
