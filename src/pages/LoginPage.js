// libs
import React from 'react';

// helpers
import { useHistory, useLocation } from 'react-router-dom';
import { useAuth } from '../../helpers/use-auth';

// components
import Button from '../Button';
import Footer from '../Footer';
import Input from '../Input';
import MessageModal from '../MessageModal';

// style
import styles from '../../styles/styles';

export default function LoginPage() {
  const auth = useAuth();

  const location = useLocation();
  const { from } = location.state || { from: { pathname: '/' } };
  const history = useHistory();

  const userReducer = (state, action) => {
    switch (action.type) {
      case 'email':
        return { ...state, email: action.value };
      case 'password':
        return { ...state, password: action.value };
      default:
        throw new Error();
    }
  };
  const [userInput, dispatchUserInput] = React.useReducer(userReducer, {
    email: '',
    password: '',
  });

  const signInWithEmail = () => {
    const { email, password } = userInput;
    auth
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        // Signed in ... console.log(user);
        history.push(from.pathname);
      })
      .catch((err) => {
        handleShowMessage(err);
      });
  };

  const signInWithGoogle = () => {
    auth.signInWithGooglePopup(() => {
      history.push(from.pathname);
    });
  };

  const handleForgotPassword = () => {
    auth
      .sendPasswordResetEmail(userInput.email)
      .then((res) => {
        handleShowMessage(res);
      })
      .catch((err) => {
        handleShowMessage(err);
      });
  };

  const redirectToRegister = (email) => {
    const userLocation = {
      pathname: '/login/register',
      state: { email: email },
    };
    history.push(userLocation);
  };

  const modalReducer = (_, action) => {
    switch (action.type) {
      case 'trigger':
        const { method, message, value, callback } = action;
        return { showModal: true, method, message, value, callback };
      case 'response':
        if (action.callback) {
          action.callback(action.value);
        }
        return { showModal: false };
      default:
        throw new Error();
    }
  };

  const [modalState, modalDispatch] = React.useReducer(modalReducer, {
    showModal: false,
    method: null,
    message: null,
    value: null,
    callback: null,
  });

  const handleShowMessage = (props) => {
    const { code, message } = props;
    switch (code) {
      case 'auth/user-not-found':
        modalDispatch({
          type: 'trigger',
          method: 'confirm',
          message: `${message} Do you want to register insted? `,
          value: userInput.email,
          callback: redirectToRegister,
        });
        break;
      case 'auth/invalid-email':
      case 'auth/wrong-password':
        modalDispatch({ type: 'trigger', method: 'alert', message });
        break;
      case 'auth/cancelled-popup-request':
        break;
      default:
        console.log(props);
        console.log({ code, message });
        break;
    }
  };

  return (
    <>
      <MessageModal state={modalState} dispatch={modalDispatch} />
      <header style={styles.loginHeader}>
        <img
          src={'logoLogin.svg'}
          alt={''}
          style={{ height: '60vh', maxHeight: '120px' }}
        />
        <span style={{ fontSize: 'calc(20px + 1.8vmin)', margin: '10px' }}>
          M.L.T. Designs
        </span>
      </header>
      <div style={styles.divFlexColumn}>
        <span style={styles.loginHeading1}>Login</span>
        <span style={styles.loginHeading2}>
          Hi there! Nice to see you again
        </span>
        <Input
          type="email"
          label="Email"
          value={userInput.email}
          onChange={(newEmail) =>
            dispatchUserInput({ type: 'email', value: newEmail })
          }
        />
        <Input
          type="password"
          label="Password"
          value={userInput.password}
          onChange={(newPassword) =>
            dispatchUserInput({ type: 'password', value: newPassword })
          }
        />
        <Button
          style={styles.btnFilledPurple}
          onClick={signInWithEmail}
          icon={''}
        >
          Login
        </Button>
        <div style={styles.divFlexRow}>
          <Button style={styles.btnUnfilledGray} onClick={handleForgotPassword}>
            Forgot Password?
          </Button>
          <Button
            style={styles.btnUnfilledColor}
            onClick={() => history.push('/login/register')}
          >
            Register
          </Button>
        </div>
        <div style={{ position: 'relative' }}>
          <img
            src={'google.jpg'}
            alt={''}
            style={{
              height: '36px',
              width: '36px',
              position: 'absolute',
              left: '0',
              bottom: '0',
              margin: '25px 0px 5px 0px',
              border: 'solid 1px #520369',
              borderRadius: '5px',
            }}
          />
          <Button
            style={styles.btnFilledPurple}
            onClick={signInWithGoogle}
            icon={''}
          >
            sign in with Google
          </Button>
        </div>
      </div>
      <Footer defaultButtons />
    </>
  );
}
