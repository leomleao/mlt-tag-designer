import React from 'react';
import Input from './styleComponents/Input';
import Button from './styleComponents/Button';

// Validations
import { Address } from '../utils/Address';

import styles from '../styles/styles';

import PropTypes from 'prop-types';
import LoadingComponent from './styleComponents/LoadingComponent';

export default function AddressCard({
  addressDetails,
  index,
  handleDeleteClick,
  handleSaveClick,
  handleChange,
}) {
  if (!addressDetails) return null;
  const {
    saved = false,
    short = false,
    loading = false,
    address,
  } = addressDetails;

  const handleInputChange = (identifier, newValue) => {
    const newAddress = new Address({ ...address, [identifier]: newValue });
    handleChange({ address: newAddress, saved: false, short }, index);
  };

  const {
    address_line_1, // String number and street
    address_line_2, // Suite or apartament
    admin_area_1, // province or state (UK= A county.)
    admin_area_2, // city, town or village
    postal_code, // https://en.wikipedia.org/wiki/Postal_code#United_Kingdom
    country_code, //The two-character ISO 3166-1 code that identifies the country or region.
  } = address;

  return (
    <div>
      {loading ? (
        <LoadingComponent height={'12rem'} />
      ) : (
        <>
          <div style={{ ...styles.divFlexRow, width: '100%' }}>
            {index === undefined ? (
              <span style={{ alignSelf: 'center', margin: '10px' }}>
                Shipping Details
              </span>
            ) : (
              <div style={styles.divFlexRow}>
                <span style={{ alignSelf: 'center', margin: '10px' }}>
                  Address {index + 1}
                </span>
              </div>
            )}
            {saved ? (
              <>
                {handleDeleteClick !== undefined ? (
                  <Button
                    onClick={() => handleDeleteClick(index)}
                    icon={'delete_forever'}
                  />
                ) : (
                  ''
                )}
              </>
            ) : (
              <>
                {handleSaveClick !== undefined ? (
                  <Button
                    onClick={() => handleSaveClick(index)}
                    icon={'save'}
                  />
                ) : (
                  ''
                )}
              </>
            )}
          </div>
          <div style={styles.card}>
            <div style={styles.divFlexRow}>
              <Input
                type="text"
                label="Street and Number:" // String number and street
                width={'65%'}
                value={address_line_1}
                autoComplete="street-address"
                onChange={(value) => handleInputChange('address_line_1', value)}
              />
              <Input
                type="text"
                helper="Optional"
                label="Apt:" // Suite or apartament
                width={'30%'}
                value={address_line_2}
                autoComplete="off"
                onChange={(value) => handleInputChange('address_line_2', value)}
              />
            </div>
            <div style={styles.divFlexRow}>
              <Input
                type="text"
                label="City:" // city, town or village
                width={'50%'}
                value={admin_area_2}
                autoComplete="address-level2"
                onChange={(value) => handleInputChange('admin_area_2', value)}
              />
              <Input
                type="text"
                label="Postal Code:" // https://en.wikipedia.org/wiki/Postal_code#United_Kingdom
                width={'45%'}
                value={postal_code}
                autoComplete="postal-code"
                onChange={(value) => handleInputChange('postal_code', value)}
              />
            </div>
            <div style={styles.divFlexRow}>
              <Input
                type="text"
                label="County/State:"
                width={'50%'}
                value={admin_area_1} // province or state (UK= A county.)
                autoComplete="address-level1"
                onChange={(value) => handleInputChange('admin_area_1', value)}
              />
              <Input
                type="text"
                label="Country:" //The two-character ISO 3166-1 code that identifies the country or region.
                width={'20%'}
                value={country_code}
                autoComplete="country"
                onChange={(value) => handleInputChange('country_code', value)}
              />
              <div style={{ width: '20%' }}></div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

AddressCard.propTypes = {
  addressDetails: PropTypes.shape({
    name: PropTypes.shape({ full_name: PropTypes.string }),
    saved: PropTypes.bool,
    detailed: PropTypes.bool,
    address: PropTypes.shape({
      address_line_1: PropTypes.string,
      address_line_2: PropTypes.string,
      admin_area_1: PropTypes.string,
      admin_area_2: PropTypes.string,
      postal_code: PropTypes.string,
      country_code: PropTypes.string,
    }),
  }),
  handleChange: PropTypes.func.isRequired,
  index: PropTypes.number,
  handleDeleteClick: PropTypes.func,
  handleSaveClick: PropTypes.func,
  setDefault: PropTypes.func,
};
