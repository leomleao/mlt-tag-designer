import React, { useEffect, useRef } from 'react';

import PropTypes from 'prop-types';

import styles from '../styles/styles';

export default function PaypalButton({
  order: { purchase_units: [purchase_unit] } = {},
  onApprove,
  onInit,
  onClick,
}) {
  const {
    amount: { value, currency_code, breakdown } = {},
    description,
    items,
    shipping,
  } = purchase_unit;
  const paypalRef = useRef();

  useEffect(() => {
    window.paypal
      .Buttons({
        env: 'sandbox',
        style: {
          color: 'silver',
        },
        // Execute payment on authorize
        commit: true,
        createOrder: (_, actions, err) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value,
                  currency_code,
                  breakdown,
                },
                description: description,
                items: items,
                shipping: shipping,
              },
            ],
            application_context: {
              brand_namestring: 'MLT Tag Designs',
              shipping_preference: 'SET_PROVIDED_ADDRESS',
              user_action: 'PAY_NOW',
            },
          });
        },
        onApprove: async (_, actions) => {
          const paypalOrder = await actions.order.capture();
          onApprove(paypalOrder);
        },
        // onInit is called when the button first renders
        onInit: () => {},
        // onClick is called when the button is clicked
        onClick: onClick,
        onCancel: () => {},
        onError: (err) => {
          console.log(err);
        },
      })
      .render(paypalRef.current);
  }, []);

  return <div style={styles.cardParent} ref={paypalRef}></div>;
}

PaypalButton.propTypes = {
  order: PropTypes.object.isRequired,
};