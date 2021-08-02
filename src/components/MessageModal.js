// Libs
import React from 'react';

// Helpers
import Modal from 'react-responsive-modal';

// style Components
import Button from './styleComponents/Button';
import Input from './styleComponents/Input';

// Styles
import styles from '../styles/styles';

export function MessageModal({ state, dispatch }) {
  const { showModal, method, message, value, callback } = state;
  // method =  alert || prompt || confirm
  // const { code, message, values } = props;
  const [respValue, setRespValue] = React.useState(value);

  React.useEffect(() => {
    setRespValue(value);
  }, [value]);

  const handleResponse = (bool) =>
    bool
      ? dispatch({
          code: 'modal/response',
          values: { value: respValue, callback },
        })
      : dispatch({ code: 'modal/response', values: {} });

  return (
    <Modal
      open={showModal}
      onClose={() => {
        dispatch({ code: 'modal/response', values: {} });
      }}
      showCloseIcon={false}
      center
    >
      <div style={{ ...styles.modalFlexColumn, alignItems: 'center' }}>
        <div style={{ justifySelf: 'center', color: '#37474f' }}>{message}</div>
        {method === 'prompt' && (
          <div>
            <Input
              type="text"
              label="prompt"
              value={respValue}
              onChange={(newValue) => setRespValue(newValue)}
            />
          </div>
        )}
        <div style={styles.divFlexRow}>
          <Button
            style={styles.btnFilledPurple}
            onClick={() => handleResponse(true)}
            icon={''}
          >
            Ok
          </Button>
          {method === 'confirm' && (
            <Button
              style={styles.btnFilledPurple}
              onClick={() => handleResponse(false)}
              icon={''}
            >
              Cancel
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
}

export function useMessageModal() {
  const [modalState, modalDispatch] = React.useReducer(modalReducer, {
    showModal: false,
    method: null,
    message: null,
    value: null,
    callback: null,
  });

  return [modalState, modalDispatch];
}

function modalReducer(_, action) {
  const { code, message, values } = action;
  switch (code) {
    // Login errors
    case 'auth/user-not-found':
      return {
        showModal: true,
        method: 'confirm',
        message: `${message} Do you want to register insted? `,
        value: values.email,
        callback: values.callback,
      };
    case 'auth/invalid-email':
    case 'auth/wrong-password':
      return { showModal: true, method: 'alert', message };
    case 'auth/cancelled-popup-request':
      return;
    // Register Errors
    case 'input/password-different':
    case 'auth/weak-password':
    case 'auth/email-already-in-use':
    case 'auth/invalid-email':
      return { showModal: true, method: 'alert', message };
    // profile/addresses Errors
    case 'address/invalid':
    case 'address/hide-unsaved':
      return { showModal: true, method: 'alert', message };
    case 'address/leave-unsaved':
      return {
        showModal: true,
        method: 'confirm',
        message: message,
        callback: values.callback,
      };
    case 'form/response':
      return {
        showModal: true,
        method: 'alert',
        message: message,
        callback: values.callback,
      };
    case 'tag/missingName':
      return {
        showModal: true,
        method: 'alert',
        message: message,
      };
    case 'modal/response':
      const { value, callback } = values;
      if (callback) {
        callback(value);
      }
      return { showModal: false };
    default:
      console.log({ code, message, values });
      throw new Error(message);
  }
}
