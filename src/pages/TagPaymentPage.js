// Libs
import React from 'react';

// Helpers
import { useHistory, useLocation } from 'react-router-dom';
// import { useOrderManager } from '../helpers/use-order';
import { useAuth } from '../helpers/use-auth';

// style Components
import Header from '../components/styleComponents/Header';
import AppBody from '../components/styleComponents/AppBody';
import Button from '../components/styleComponents/Button';
import Footer from '../components/styleComponents/Footer';
// import AddressToShipCard from '../components/styleComponents/AddressToShipCard';

// functional Components
import SummaryTable from '../components/styleComponents/SummaryTable';
// import PaypalButton from '../components/PaypalButton';

// Styles
import styles from '../styles/styles';

export default function TagPaymentPage({ order, standards, changeOrder }) {
  const auth = useAuth();
  const location = useLocation();
  const history = useHistory();
  const { from } = location.state || { from: '/tag-constructor/shipping' };
  const { tag_std_price, shipping_price } = standards;

  const [creditSelected, setCreditSelected] = React.useState(false);
  const [paypalSelected, setPaypalSelected] = React.useState(false);

  return (
    <>
      <Header subtitle={'Payment Options'}>
        <Button onClick={() => history.push('/')} icon={'home'} />
        <Button onClick={() => history.push(from)} icon={'navigate_before'} />
      </Header>

      <AppBody>
        <div style={styles.cardParent}>
          <div style={{ ...styles.card, alignItems: 'flex-start' }}>
            <Button
              onClick={() => {
                setCreditSelected(true);
                setPaypalSelected(false);
              }}
              icon={
                creditSelected
                  ? 'radio_button_checked'
                  : 'radio_button_unchecked'
              }
            >
              CreditCard
            </Button>
          </div>
        </div>
        <div style={styles.cardParent}>
          <div style={{ ...styles.card, alignItems: 'flex-start' }}>
            <Button
              onClick={() => {
                setPaypalSelected(true);
                setCreditSelected(false);
              }}
              icon={
                paypalSelected
                  ? 'radio_button_checked'
                  : 'radio_button_unchecked'
              }
            >
              Paypal
            </Button>
          </div>
        </div>
        <SummaryTable
          TAGs={order.TAGs}
          shippingPrice={shipping_price}
          tag_std_price={tag_std_price}
        />
        <div style={styles.divFlexRow}>
          <Button
            style={styles.btnFilledPurple}
            onClick={() => history.push('/tag-constructor/shipping')}
          >
            Shipping
          </Button>
          <Button
            style={styles.btnFilledPurple}
            onClick={() => history.push('/tag-constructor/submited')}
          >
            Pay
          </Button>
        </div>
      </AppBody>
      <Footer defaultButtons />
    </>
  );
}
