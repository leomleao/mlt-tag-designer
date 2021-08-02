// Libs
import React from 'react';

// Helpers
import { useHistory, useLocation } from 'react-router-dom';
import { useOrderManager } from '../helpers/use-order';
import { useAuth } from '../helpers/use-auth';

// style Components
import Header from '../components/styleComponents/Header';
import AppBody from '../components/styleComponents/AppBody';
import Button from '../components/styleComponents/Button';
import Footer from '../components/styleComponents/Footer';
import AddressToShipCard from '../components/styleComponents/AddressToShipCard';

// functional Components
import SummaryTable from '../components/styleComponents/SummaryTable';
// import PaypalButton from '../components/PaypalButton';

// Styles
import styles from '../styles/styles';

export default function TagPaymentPage() {
  const location = useLocation();
  const history = useHistory();
  const { from } = location.state || { from: '/tag-constructor/shipping' };

  const orderManager = useOrderManager();
  const { order } = orderManager;
  const { purchase_units: [{ shipping: { address } = {} } = {}] = [] } = order;

  const handleApprovedPayment = (data) => {
    localStorage.removeItem('order');
    console.log(data);
    history.push('/tag-constructor/submited');
  };

  return (
    <>
      <Header subtitle={'Payment Options'}>
        <Button onClick={() => history.push('/')} icon={'home'} />
        <Button onClick={() => history.push(from)} icon={'navigate_before'} />
      </Header>
      <AppBody>
        <SummaryTable order={order} shipping />
        <div style={styles.cardParent}>
          <AddressToShipCard address={address} />
        </div>
        {/* <PaypalButton order={order} onApprove={handleApprovedPayment} /> */}
      </AppBody>
      <Footer defaultButtons />
    </>
  );
}
