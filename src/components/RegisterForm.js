import React from 'react';
import PropTypes from 'prop-types';
import Input from './styleComponents/Input';
import AddressCard from './AddressCard';

import styles from '../styles/styles';
import Button from './styleComponents/Button';

function RegisterForm({ state, onChange }) {
  const { name, password, repeatedPassword, email, address } = state;

  const handleChange = ({ input, newValue }) => {
    onChange({ input, value: newValue });
  };

  const [showAddressInput, setShowAddressInput] = React.useState(false);

  const openAddressForm = () => {
    handleChange({
      input: 'address',
      newValue: {
        firstName: '',
        lastName: '',
        street: '',
        country: '',
        city: '',
        postalCode: '',
        saved: false,
        detailed: true,
      },
    });
    setShowAddressInput(true);
  };

  return (
    <>
      <Input
        type="text"
        label="Username"
        value={name}
        onChange={(newValue) => handleChange({ input: 'name', newValue })}
      />
      <Input
        type="password"
        label="Password"
        value={password}
        onChange={(newValue) => handleChange({ input: 'password', newValue })}
        regExpPattern={/[\w\W]{6}/gm}
      />
      <Input
        type="password"
        label="Repeat Password"
        value={repeatedPassword}
        onChange={(newValue) =>
          handleChange({ input: 'repeatedPassword', newValue })
        }
        regExpPattern={/[\w\W]{6}/gm}
      />
      <Input
        type="email"
        label="Email"
        value={email}
        onChange={(newValue) => handleChange({ input: 'email', newValue })}
      />
      {showAddressInput ? (
        <div style={styles.cardParent}>
          <AddressCard
            address={address}
            index={0}
            handleChange={(newValue) =>
              handleChange({ input: 'address', newValue })
            }
          />
          <div style={styles.divStyle}>
            <Button
              onClick={() => setShowAddressInput(false)}
              icon={'edit_location'}
              style={styles.btnUnfilledColor}
            >
              Inform address later
            </Button>
          </div>
        </div>
      ) : (
        <div style={styles.divFlexRow}>
          <Button
            onClick={openAddressForm}
            icon={'add_location'}
            style={styles.btnUnfilledColor}
          >
            Add Address to Shipping
          </Button>
        </div>
      )}
    </>
  );
}

RegisterForm.propTypes = {};

export default RegisterForm;
