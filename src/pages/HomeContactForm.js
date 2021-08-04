// Libs
import React from 'react';

// Helpers
import { useAuth } from '../helpers/use-auth';
import { useHistory, useLocation } from 'react-router-dom';

// style Components
import Header from '../components/styleComponents/Header';
import AppBody from '../components/styleComponents/AppBody';
import Button from '../components/styleComponents/Button';
import Footer from '../components/styleComponents/Footer';

// functional Components
import SettingsButton from '../components/styleComponents/SettingsButton';
import Input from '../components/styleComponents/Input';

// Styles
import styles from '../styles/styles';
import TextArea from '../components/styleComponents/TextArea';
import LoadingComponent from '../components/styleComponents/LoadingComponent';

export default function HomeContactForm({ showMessage }) {
  const auth = useAuth();
  const location = useLocation();
  const history = useHistory();
  const { from } = location.state || { from: '/' };

  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    if (auth.user) {
      const { user } = auth;
      const { displayName, email, phoneNumber } = user;
      if (displayName) {
        dispatchForm({
          type: 'change',
          input: 'name',
          value: displayName,
        });
      }
      if (email) {
        dispatchForm({
          type: 'change',
          input: 'email',
          value: email,
        });
      }
      if (phoneNumber) {
        dispatchForm({
          type: 'change',
          input: 'phoneNumber',
          value: phoneNumber,
        });
      }
    }
  }, [auth]);

  const formReducer = (state, action) => {
    const { type, input, value } = action;
    switch (type) {
      case 'change':
        return { ...state, [input]: value };

      default:
        throw new Error();
    }
  };

  const [form, dispatchForm] = React.useReducer(formReducer, {
    name: '',
    email: '',
    phoneNumber: '',
    subject: '',
    message: '',
  });

  const sendMessage = () => {
    // http.sendMessage(form)
    console.log(form);
    showMessage({
      code: 'form/response',
      message:
        'We received your message, we will be in touch as soon as possible',
      values: {
        callback: () => history.push('/'),
      },
    });
  };
  // prettier-ignore
  const ukNumberRegExp = /^(((\+44\s?\d{4}|\(?0\d{4}\)?)\s?\d{3}\s?\d{3})|((\+44\s?\d{3}|\(?0\d{3}\)?)\s?\d{3}\s?\d{4})|((\+44\s?\d{2}|\(?0\d{2}\)?)\s?\d{4}\s?\d{4}))(\s?\#(\d{4}|\d{3}))?$/gm

  return (
    <>
      <Header>
        <SettingsButton />
        <Button onClick={() => history.push(from)} icon={'navigate_before'} />
      </Header>
      {isLoading ? (
        <LoadingComponent height={'80vh'} />
      ) : (
        <AppBody>
          <form style={{ ...styles.divFlexColumn, alignItems: 'center' }}>
            <Input
              type="text"
              label="Name"
              value={form.name}
              onChange={(newName) => {
                dispatchForm({ type: 'change', input: 'name', value: newName });
              }}
              width={'80%'}
            />
            <Input
              type="email"
              label="E-mail"
              value={form.email}
              onChange={(newName) => {
                dispatchForm({
                  type: 'change',
                  input: 'email',
                  value: newName,
                });
              }}
              width={'80%'}
            />
            <Input
              type="text"
              label="Phone Number"
              helper="Optional"
              value={form.phoneNumber}
              onChange={(newPhone) => {
                dispatchForm({
                  type: 'change',
                  input: 'phoneNumber',
                  value: newPhone,
                });
              }}
              width={'80%'}
              regExpPattern={ukNumberRegExp}
            />
            <Input
              type="text"
              label="Subject"
              value={form.subject}
              onChange={(newValue) => {
                dispatchForm({
                  type: 'change',
                  input: 'subject',
                  value: newValue,
                });
              }}
              width={'80%'}
            />
            <TextArea
              label="Message"
              helper=""
              value={form.message}
              onChange={(newValue) => {
                dispatchForm({
                  type: 'change',
                  input: 'message',
                  value: newValue,
                });
              }}
              width={'80%'}
            />
            <Button
              style={{
                ...styles.btnFilledPurple,
                // this btn inst in a parent div with width, alignSelf is solution
                alignSelf: 'center',
              }}
              onClick={sendMessage}
              icon={''}
            >
              Send message
            </Button>
          </form>
        </AppBody>
      )}
      <Footer defaultButtons />
    </>
  );
}
