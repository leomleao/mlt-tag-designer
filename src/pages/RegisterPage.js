// Libs
import React from 'react';

// Helpers
import { useAuth } from '../helpers/use-auth';
import { useHistory, useLocation } from 'react-router-dom';

// Components
import Button from '../components/styleComponents/Button';
import Footer from '../components/styleComponents/Footer';
import RegisterForm from '../components/RegisterForm';
import SettingsButton from '../components/styleComponents/SettingsButton';
import LoadingComponent from '../components/styleComponents/LoadingComponent';

// Styles
import styles from '../styles/styles';

export default function RegisterPage({ showMessage }) {
  const auth = useAuth();
  const history = useHistory();
  const { email: receivedEmail } = useLocation().state || { email: '' };

  const [isLoading, setIsLoading] = React.useState(false);

  const handleChange = (update) => {
    const { input, value } = update;
    setUserInput((prevState) => {
      return { ...prevState, [input]: value };
    });
  };

  const [userInput, setUserInput] = React.useState({
    name: '',
    password: '',
    repeatedPassword: '',
    email: '',
    address: null,
  });

  React.useEffect(() => {
    if (receivedEmail) handleChange({ input: 'email', value: receivedEmail });
  }, [receivedEmail]);

  const handleRegister = () => {
    setIsLoading(true);
    const { name, password, repeatedPassword, email, address } = userInput;
    if (password !== repeatedPassword) {
      showMessage({
        code: 'input/password-different',
        message: 'The two fields with password must be equal.',
      });
      return;
    }
    auth
      .signUp(email, password, name, address)
      .then((user) => {
        setIsLoading(false);
        history.push('/');
      })
      .catch((err) => {
        showMessage(err);
      });
  };

  const signInWithGoogle = () => {
    setIsLoading(true);
    auth.signInWithGooglePopup(() => {
      history.push('/');
      setIsLoading(false);
    });
  };

  return (
    <>
      <header style={styles.loginHeader}>
        <div
          style={{
            minWidth: '270px',
            maxWidth: '450px',
            width: '80%',
            height: '2vh',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'stretch',
            flexDirection: 'row-reverse',
          }}
        >
          <SettingsButton />
          <Button onClick={() => history.push('/')} icon={'navigate_before'} />
        </div>
        <img
          src={'../logoLogin.svg'}
          alt={''}
          style={{ height: '60vh', maxHeight: '120px' }}
        />
        <span style={{ fontSize: 'calc(20px + 1.8vmin)', margin: '10px' }}>
          M.L.T. Designs
        </span>
      </header>
      <div style={styles.divFlexColumn}>
        <span style={styles.loginHeading1}>Register</span>
        <span style={styles.loginHeading2}>Hello! Please to meet you.</span>
        {isLoading ? (
          <LoadingComponent height={'20vh'} />
        ) : (
          <>
            <RegisterForm state={userInput} onChange={handleChange} />
            <Button
              style={styles.btnFilledPurple}
              onClick={handleRegister}
              icon={''}
            >
              Register
            </Button>
            <div style={{ position: 'relative' }}>
              <img
                src={'../google.jpg'}
                alt={''}
                style={{
                  height: 'calc(29px + 1vh)',
                  width: 'calc(29px + 1vh)',
                  position: 'absolute',
                  left: '0',
                  bottom: '0',
                  padding: '0px',
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
                sign up with Google
              </Button>
            </div>
          </>
        )}
      </div>
      <Footer defaultButtons />
    </>
  );
}
