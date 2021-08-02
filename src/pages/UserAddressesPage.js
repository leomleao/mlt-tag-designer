// Libs
import React from 'react';

// Helpers
import { useAuth } from '../helpers/use-auth';
import { useHistory, useLocation } from 'react-router-dom';

// style Components
import Header from '../components/styleComponents/Header';
import AppBody from '../components/styleComponents/AppBody';
import Button from '../components/styleComponents/Button';
import Footer from '../components/styleComponents/Footer';
import AddressCardParent from '../components/AddressCardParent';
import LoadingComponent from '../components/styleComponents/LoadingComponent';

// functional Components
import SettingsButton from '../components/styleComponents/SettingsButton';

// Styles
import styles from '../styles/styles';

// Validations
import { Address } from '../helpers/validations/Address';

// DataBank
import { useFirestore } from '../service/use-firestore';

export default function AddressesPage({ showMessage }) {
  const location = useLocation();
  const history = useHistory();
  const { from } = location.state || { from: '/' };

  const firestore = useFirestore();

  // get user addresses
  const { user } = useAuth();

  const [userAddresses, setUserAddresses] = React.useState(null);

  const getAddresses = async () => {
    try {
      const addresses = await firestore.getUserAddressesByUid(user.uid);
      const addressesWithoutDetails = addresses.map((address) => {
        return {
          ...address,
          detailed: false,
          loading: false,
        };
      });
      setUserAddresses(addressesWithoutDetails);
    } catch (error) {
      console.error('Cannot retrive addresses data' + error);
    }
  };
  React.useEffect(() => {
    if (user) {
      getAddresses();
    }
  }, [user]);
  // End get user addresses

  const addNewAddress = () => {
    setUserAddresses((prevState) => {
      return [...prevState, { address: new Address(), saved: false }];
    });
  };

  const goBack = () => {
    if (userAddresses.some(({ saved }) => !saved)) {
      const error = {
        code: 'address/leave-unsaved',
        message:
          'Leave this page will lost unsaved changes. Do you want leave anyway?',
        values: { callback: () => history.push(from) },
      };
      showMessage(error);
    } else {
      history.push(from);
    }
  };

  return (
    <>
      <Header subtitle="My Addresses">
        <SettingsButton />
        <Button onClick={goBack} icon={'navigate_before'} />
      </Header>
      <AppBody>
        {userAddresses ? (
          <>
            <AddressCardParent
              userAddresses={userAddresses}
              setUserAddresses={setUserAddresses}
              showMessage={showMessage}
            />
            <div style={styles.divFlexRow}>
              <Button
                onClick={addNewAddress}
                icon={'add_location'}
                style={{ ...styles.btnUnfilledColor, margin: '10px 0px' }}
              >
                Add New Address
              </Button>
            </div>
          </>
        ) : (
          <LoadingComponent height={'40vh'} />
        )}
      </AppBody>
      <Footer defaultButtons />
    </>
  );
}
