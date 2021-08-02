import React from 'react';
import AddressCard from './AddressCard';

// Styles
import styles from '../styles/styles';
import Button from './styleComponents/Button';
import Input from './styleComponents/Input';
import { useFirestore } from '../service/use-firestore';
import { useAuth } from '../helpers/use-auth';
import { addressYupSchema } from '../helpers/validations/Address';

export default function AddressCardParent({
  userAddresses,
  setUserAddresses,
  showMessage,
}) {
  const firestore = useFirestore();
  // get user addresses
  const { user } = useAuth();

  const handleSave = async (index) => {
    if (!(await addressYupSchema.isValid(userAddresses[index].address))) {
      const error = {
        code: 'address/invalid',
        message: 'Provided address invalid',
      };
      showMessage(error);
      return;
    }
    const newAddressArray = Array.from(userAddresses);
    newAddressArray[index].saved = true;
    try {
      const addresses = await firestore.updateUserAddressByUidAndIndex(
        user.uid,
        index,
        newAddressArray[index]
      );
      setUserAddresses(addresses);
    } catch (error) {
      showMessage(error);
    }
  };
  const handleChange = (newAddress, index) => {
    setUserAddresses((prevState) => {
      const newAddressArray = Array.from(prevState);

      newAddressArray[index] = newAddress;

      return newAddressArray;
    });
  };
  const handleDelete = async (index) => {
    setUserAddresses((prevState) => {
      const newAddressArray = Array.from(prevState);
      newAddressArray[index].loading = true;
      return newAddressArray;
    });
    try {
      const addresses = await firestore.deleteUserAddressByUidAndIndex(
        user.uid,
        index
      );
      setUserAddresses(addresses);
    } catch (error) {
      showMessage(error);
    }
  };

  const handleShowDetails = (index) => {
    setUserAddresses((prevState) => {
      const newAddressArray = Array.from(prevState);
      newAddressArray[index].short = false;
      return newAddressArray;
    });
  };

  const handleHideDetails = (index) => {
    if (!userAddresses[index].saved) {
      const error = {
        code: 'address/hide-unsaved',
        message: 'You cannot hide unsaved changes',
      };
      showMessage(error);
    } else {
      setUserAddresses((prevState) => {
        const newAddressArray = Array.from(prevState);
        newAddressArray[index].short = true;
        return newAddressArray;
      });
    }
  };

  return (
    <div>
      {userAddresses.map((addressDetails, index) => {
        return (
          <div key={`A${index}`}>
            {!addressDetails.short ? (
              <div style={styles.cardParent}>
                <AddressCard
                  key={`B${index}`}
                  addressDetails={addressDetails}
                  index={index}
                  handleDeleteClick={handleDelete}
                  handleSaveClick={handleSave}
                  handleChange={handleChange}
                />
                <div style={styles.divFlexRow}>
                  <Button
                    onClick={() => handleHideDetails(index)}
                    icon={'info'}
                    style={{
                      ...styles.btnUnfilledGray,
                      fontSize: 'calc(6px + 0.8vmin)',
                      margin: '10px 0px',
                    }}
                  >
                    Hide details
                  </Button>
                </div>
              </div>
            ) : (
              <div style={styles.cardParent}>
                <div>
                  <div style={{ ...styles.divFlexRow, width: '100%' }}>
                    {index === undefined ? (
                      <span style={{ alignSelf: 'center', margin: '10px' }}>
                        Address Details
                      </span>
                    ) : (
                      <div style={styles.divFlexRow}>
                        <span style={{ alignSelf: 'center', margin: '10px' }}>
                          Address {index + 1}
                        </span>
                      </div>
                    )}
                    {index !== 0 && (
                      <Button
                        onClick={() => handleDelete(index)}
                        icon={'delete_forever'}
                      />
                    )}
                  </div>
                  <div style={styles.card}>
                    <Input
                      type="text"
                      label="Street:"
                      value={addressDetails.address.address_line_1}
                      onChange={() => {
                        console.log('readOnly');
                      }}
                    />
                  </div>
                </div>
                <div style={styles.divFlexRow}>
                  <Button
                    onClick={() => handleShowDetails(index)}
                    icon={'info'}
                    style={{
                      ...styles.btnUnfilledGray,
                      fontSize: 'calc(6px + 0.8vmin)',
                      margin: '10px 0px',
                    }}
                  >
                    Show details
                  </Button>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
