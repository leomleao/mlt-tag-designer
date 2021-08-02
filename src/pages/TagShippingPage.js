// Libs
import React from 'react';

// Helpers
import { useHistory } from 'react-router-dom';
import { useAuth } from '../helpers/use-auth';
import { useOrderManager } from '../helpers/use-order';

// style Components
import Header from '../components/styleComponents/Header';
import AppBody from '../components/styleComponents/AppBody';
import Button from '../components/styleComponents/Button';
import Footer from '../components/styleComponents/Footer';
import MessageStyle from '../components/styleComponents/MessageStyle';
import Input from '../components/styleComponents/Input';

// functional Components
import AddressCard from '../components/AddressCard';
import SummaryTable from '../components/styleComponents/SummaryTable';
import Modal from 'react-responsive-modal';

// Styles
import styles from '../styles/styles';

// DataBank
import { useFirestore } from '../service/use-firestore';

export default function TagShippingPage() {
  const orderManager = useOrderManager();
  const { order } = orderManager;
  const {
    purchase_units: [
      {
        shipping: { name: { full_name } = {}, address, registeredPost } = {},
      } = {},
    ] = [],
  } = order;
  const addressDetails = { address };
  // get user addresses
  const { getUserAddressesByUid } = useFirestore();
  const { user } = useAuth();
  const [addresses, setAddresses] = React.useState([]);

  React.useEffect(() => {
    const getAddresses = async () => {
      try {
        const data = await getUserAddressesByUid(user.uid);
        if (data) setAddresses(data);
      } catch (error) {
        console.error('Cannot retrive addresses data' + error);
      }
    };
    if (user && addresses) {
      if (addresses.length === 0) {
        getAddresses();
      }
    }
  }, [addresses, user]);
  // End get user addresses

  const history = useHistory();

  const handleChangeRegiteredPost = () => {
    orderManager.changeRegiteredPost(!registeredPost);
  };

  const handleAddressChange = (newAddress) => {
    orderManager.updateAddress(newAddress);
  };
  const handleNameChange = (newName) => {
    orderManager.updateRecipentName(newName);
  };

  const [showModal, setShowModal] = React.useState(false);
  const handleOpenAdreessesModal = () => {
    setShowModal(true);
  };

  const handleSelectAddress = (index) => {
    orderManager.updateAddress(addresses[index]);
    setShowModal(false);
  };

  return (
    <>
      <Header subtitle={'Shipping Details'}>
        <Button onClick={() => history.push('/')} icon={'home'} />
        <Button
          onClick={() => history.push('/tag-constructor/sumary')}
          icon={'navigate_before'}
        />
      </Header>
      <AppBody>
        <Modal
          open={showModal}
          onClose={() => setShowModal(false)}
          showCloseIcon={false}
        >
          {addresses.length > 0 ? (
            <div style={styles.modalFlexColumn}>
              {addresses.map(({ address }, index) => {
                return (
                  <div key={index}>
                    <Button
                      onClick={() => {
                        handleSelectAddress(index);
                      }}
                      icon={'place'}
                      style={styles.btnUnfilledGray}
                    >
                      {address.address_line_1}
                    </Button>
                  </div>
                );
              })}
            </div>
          ) : (
            <>
              {user ? (
                <MessageStyle>You dont have any address saved</MessageStyle>
              ) : (
                <MessageStyle>You must be logged in</MessageStyle>
              )}
            </>
          )}
        </Modal>
        <div style={styles.divFlexRow}>
          <Button
            onClick={handleOpenAdreessesModal}
            icon={'cloud_download'}
            style={styles.btnUnfilledGray}
          >
            Load my saved addresses
          </Button>
        </div>
        <div style={styles.cardParent}>
          <Input
            type="text"
            label="Recipient's Name"
            value={full_name}
            autoComplete="name"
            onChange={handleNameChange}
          />
        </div>
        <div style={styles.cardParent}>
          <AddressCard
            addressDetails={addressDetails}
            handleChange={handleAddressChange}
          />
        </div>

        <div style={styles.divFlexRow}>
          <Button
            onClick={handleChangeRegiteredPost}
            icon={registeredPost ? 'check_box' : 'check_box_outline_blank'}
            style={styles.btnUnfilledGray}
          >
            Add registered post
          </Button>
        </div>
        <SummaryTable order={order} shipping />
        <div style={styles.divFlexRow}>
          <Button
            style={styles.btnFilledPurple}
            onClick={() => history.push('/tag-constructor/sumary')}
          >
            Back
          </Button>
          <Button
            style={styles.btnFilledPurple}
            onClick={() => {
              history.push('/tag-constructor/payment');
            }}
          >
            Payment
          </Button>
        </div>
      </AppBody>
      <Footer defaultButtons />
    </>
  );
}
