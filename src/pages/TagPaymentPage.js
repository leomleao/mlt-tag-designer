// Libs
import React from 'react';

// Helpers
import { useHistory, useLocation } from 'react-router-dom';
import { useOrderManager } from '../helpers/use-order';

// style Components
import Header from '../components/styleComponents/Header';
import AppBody from '../components/styleComponents/AppBody';
import Button from '../components/styleComponents/Button';
import Footer from '../components/styleComponents/Footer';
import AddressToShipCard from '../components/styleComponents/AddressToShipCard';

// functional Components
import SummaryTable from '../components/styleComponents/SummaryTable';
import PaypalButton from '../components/PaypalButton';

// Styles
import styles from '../styles/styles';

// DataBank
import firestore from '../service/use-firestore';
import LoadingComponent from '../components/styleComponents/LoadingComponent';

export default function TagPaymentPage() {
  const location = useLocation();
  const history = useHistory();
  const { from } = location.state || { from: '/tag-constructor/shipping' };

  const [isLoading, setIsLoading] = React.useState(false);

  const orderManager = useOrderManager();
  const { order, updatePayPalData, closeOrder } = orderManager;
  const {
    purchase_units: [
      {
        shipping: { address },
      },
    ],
  } = order;

  const handleApprovedPayment = async (data) => {
    updatePayPalData(data);

    try {
      const firstTagDescription = order.purchase_units[0].items[0].description;
      const orderId = await firestore.postNewOrder(order);
      closeOrder();
      history.push({
        pathname: '/tag-constructor/submited',
        state: { tag: firstTagDescription },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header subtitle={'Payment Options'}>
        <Button onClick={() => history.push('/')} icon={'home'} />
        <Button onClick={() => history.push(from)} icon={'navigate_before'} />
      </Header>
      <AppBody>
        {isLoading ? (
          <div style={styles.cardParent}>
            <LoadingComponent height={'25vh'} />
          </div>
        ) : (
          <>
            <SummaryTable order={order} shipping />
            <div style={styles.cardParent}>
              <AddressToShipCard address={address} />
            </div>
          </>
        )}
        <PaypalButton
          order={order}
          onApprove={handleApprovedPayment}
          onClick={() => setIsLoading(true)}
        />
      </AppBody>
      <Footer defaultButtons />
    </>
  );
}
