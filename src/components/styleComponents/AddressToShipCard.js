import React from 'react';

// style Components
import PropTypes from 'prop-types';
import FlexRow from './FlexRow';
import Card from './Card';

export default function AddressToShipCard({ address }) {
  if (!address) return null;

  const {
    address_line_1,
    address_line_2,
    admin_area_1,
    admin_area_2,
    postal_code,
    country_code,
  } = address;

  return (
    <div style={{ fontSize: 'calc(10px + 1vmin)', fontWeight: 500 }}>
      <FlexRow>
        <span style={{ alignSelf: 'center', margin: '5px' }}>
          Shipment Address
        </span>
      </FlexRow>
      <Card>
        <FlexRow>
          <div style={{ width: '60%', margin: '5px 0px' }}>
            <span>Address: </span>
            <span style={{ color: '#37474f' }}>{address_line_1}</span>
          </div>
          <div style={{ width: '40%', margin: '5px 0px' }}>
            {address_line_2 && (
              <>
                <span>- Apt: </span>
                <span style={{ color: '#37474f' }}>{address_line_2}</span>
              </>
            )}
          </div>
        </FlexRow>
        <FlexRow>
          <div style={{ width: '50%', margin: '5px 0px' }}>
            <span>City: </span>
            <span style={{ color: '#37474f' }}>{admin_area_2}</span>
          </div>
          <div style={{ width: '50%' }}>
            <span>Postal Code: </span>
            <span style={{ color: '#37474f' }}>{postal_code}</span>
          </div>
        </FlexRow>
        <FlexRow>
          <div style={{ width: '50%', margin: '5px 0px' }}>
            <span>County/State: </span>
            <span style={{ color: '#37474f' }}>{admin_area_1}</span>
          </div>
          <div style={{ width: '50%', margin: '5px 0px' }}>
            <span>Country: </span>
            <span style={{ color: '#37474f' }}>{country_code}</span>
          </div>
        </FlexRow>
      </Card>
    </div>
  );
}

AddressToShipCard.propTypes = {
  address: PropTypes.shape({
    address_line_1: PropTypes.string,
    address_line_2: PropTypes.string,
    admin_area_1: PropTypes.string,
    admin_area_2: PropTypes.string,
    postal_code: PropTypes.string,
    country_code: PropTypes.string,
  }),
};
