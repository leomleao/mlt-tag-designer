// Libs
import React from 'react';

// Misc
import PropTypes from 'prop-types';

// Styles
import styles from '../../styles/styles';

export default function SummaryTable({
  order: {
    purchase_units: [
      {
        amount: {
          value: totalAmount,
          breakdown: {
            item_total: { value: item_total_value = '0.00' } = {},
            shipping: { value: shipping_value = '0.00' } = {},
            handling: { value: handling_value = '0.00' } = {},
            shipping_discount: { value: shipping_discount_value = '0.00' } = {},
            discount: { value: discount_value = '0.00' } = {},
          } = {},
        } = {},
        items,
      },
    ],
  } = {},
  shipping,
}) {
  const totalTagsQuantity = items.reduce((acc, item) => {
    return acc + parseInt(item.quantity);
  }, 0);

  const shipping_price = (
    parseFloat(shipping_value) - parseFloat(shipping_discount_value)
  )
    .toFixed(2)
    .toString();
  if (!shipping) {
    totalAmount = (parseFloat(totalAmount) - parseFloat(shipping_price))
      .toFixed(2)
      .toString();
  }

  return (
    <div style={styles.cardParent}>
      <div
        style={{
          width: '100%',
          textAlign: 'left',
          fontWeight: 'bold',
          marginLeft: '10px',
        }}
      >
        Summary
      </div>
      <div
        style={{
          margin: '5px 5%',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <span
          style={{
            width: '30%',
            color: '#37474f',
          }}
        >
          {totalTagsQuantity} {`Tag${totalTagsQuantity > 1 ? 's' : ''}`}
        </span>
        <span
          style={{
            width: '20%',
          }}
        ></span>
        <span
          style={{
            width: '50%',
            textAlign: 'right',
            color: '#37474f',
          }}
        >
          {`${item_total_value} `}&#163;
        </span>
      </div>
      {handling_value !== '0.00' && (
        <div
          style={{
            margin: '5px 5%',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <span
            style={{
              width: '50%',
              color: '#37474f',
            }}
          >
            Handling:
          </span>
          <span
            style={{
              width: '50%',
              textAlign: 'right',
              color: '#37474f',
            }}
          >
            {`${handling_value} `}&#163;
          </span>
        </div>
      )}
      {shipping !== undefined && (
        <div
          style={{
            margin: '5px 5%',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <span
            style={{
              width: '30%',
              color: '#37474f',
            }}
          >
            Shipping:
          </span>

          {shipping_price === '0.00' ? (
            <span
              style={{
                width: '20%',
              }}
            >
              FREE
            </span>
          ) : (
            <span
              style={{
                width: '20%',
              }}
            ></span>
          )}
          <span
            style={{
              width: '50%',
              textAlign: 'right',
              color: '#37474f',
            }}
          >
            {`${shipping_price} `}&#163;
          </span>
        </div>
      )}
      {discount_value !== '0.00' && (
        <div
          style={{
            margin: '5px 5%',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <span
            style={{
              width: '50%',
              color: '#37474f',
            }}
          >
            Discount:
          </span>
          <span
            style={{
              width: '50%',
              textAlign: 'right',
              color: '#37474f',
            }}
          >
            {`${discount_value} `}&#163;
          </span>
        </div>
      )}
      <div
        style={{
          margin: '6px 5%',
          display: 'flex',
          justifyContent: 'space-between',
          borderTop: '2px solid #DCDCDC',
          paddingTop: '10px',
          marginTop: '8px',
        }}
      >
        <span
          style={{
            width: '25%',
            textAlign: 'left',
          }}
        >
          Total:
        </span>
        <span
          style={{
            width: '20%',
          }}
        ></span>
        <span
          style={{
            width: '50%',
            textAlign: 'right',
            color: '#37474f',
          }}
        >
          {`${totalAmount} `}&#163;
        </span>
      </div>
    </div>
  );
}

SummaryTable.propTypes = {
  order: PropTypes.object.isRequired,
  shippingPrice: PropTypes.number,
};
