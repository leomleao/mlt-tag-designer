import firebase from '../firebase';
import { addressDetailsFirestoreConverter } from '../helpers/validations/Address';

export const useFirestore = () => {
  const db = firebase.firestore();
  const userColectionRef = db.collection('users');
  const ordersColectionRef = db.collection('orders');
  const availabilityColectionRef = db.collection('availability');

  /**
   *
   * POST   /users?uid=  Complete User
   * @param {String} uid
   * @param {Object} userData
   */
  const postNewUser = async (uid, userData) => {
    try {
      await db.runTransaction(async (transaction) => {
        const docRef = db.collection('users').doc(uid);
        const doc = await transaction.get(docRef);
        if (!doc.exists) transaction.set(docRef, userData);
      });
      console.log('User Document successfully added!');
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };
  // End postNewUser

  /**
   *
   * GET    /users/all
   */
  const getAllUsers = async () => {
    return 'getAllUsers: NOT DEVELOPED';
  };
  // End getAllUsers

  /**
   *
   * GET    /users?uid=
   * @param {String} uid
   */
  const getUserByUid = async (uid) => {
    return 'getUserByUid: NOT DEVELOPED';
  };
  // End getUserByUid

  /**
   *
   * PUT    /users?uid= Field to Update
   * @param {String} uid
   * @param {Object} update
   */
  const updateUserByUid = async (uid, update) => {
    try {
      const docRef = await userColectionRef.doc(uid).update(update);
      console.log('User Document successfully updated!');
      return update;
    } catch (error) {
      console.error('Error updating document: ', error);
    }
  };
  // End updateUserByUid

  /**
   *
   * DELETE /users?uid=
   * @param {String} uid
   */
  const deleteUserByUid = async (uid) => {
    console.log('deleteUserByUid: NOT DEVELOPED');
  };
  // End deleteUserByUid

  /**
   *
   * POST   /users/address?uid=
   * @param {String} uid
   * @param {Object} address
   */
  const postUserNewAddressesByUid = async (uid, address) => {
    return 'postUserNewAddressesByUid: NOT DEVELOPED';
  };
  // End postUserNewAddressesByUid

  /**
   *
   * GET    /users/address?uid=
   * @param {String} uid
   */
  const getUserAddressesByUid = async (uid) => {
    const docRef = userColectionRef.doc(uid);
    try {
      const doc = await docRef.get();
      if (doc.exists) {
        const userDoc = doc.data();
        const addressArray = userDoc.addresses.map((addressDetails) =>
          addressDetailsFirestoreConverter.fromFirestore(addressDetails)
        );
        return addressArray;
      } else {
        // doc.data() will be undefined in this case
        console.log('User Document not found in the DataBank');
      }
    } catch (error) {
      console.error('Error getting address: ', error);
    }
  };
  // End getUserAddressesByUid

  /**
   *
   * PUT    /users/address?uid=_&&index=
   * @param {String} uid
   * @param {Number} index
   * @param {Object} newAddress
   */
  const updateUserAddressByUidAndIndex = async (
    uid,
    index,
    newAddressDetails
  ) => {
    const docRef = userColectionRef.doc(uid);
    try {
      return await db.runTransaction(async (t) => {
        const docData = await t.get(docRef);
        const newAddressArray = docData.data().addresses;
        const convertedAddressDetails =
          addressDetailsFirestoreConverter.toFirestore(newAddressDetails);
        newAddressArray[index] = convertedAddressDetails;

        console.log(newAddressArray);
        t.update(docRef, {
          addresses: newAddressArray,
        });
        console.log('User Document Address successfully updated!');
        return newAddressArray;
      });
    } catch (error) {
      console.error('Error updating document: ', error);
    }
  };
  // End updateUserAddressByUidAndIndex

  /**
   *
   * DELETE /users/address?uid=_&&index=
   * @param {String} uid
   * @param {Number} index
   */
  const deleteUserAddressByUidAndIndex = async (uid, index) => {
    const docRef = userColectionRef.doc(uid);
    try {
      return await db.runTransaction(async (t) => {
        const docData = await t.get(docRef);
        const addressArray = docData.data().addresses;

        const newAddressArray = addressArray.filter((_, i) => i !== index);

        t.update(docRef, {
          addresses: newAddressArray,
        });
        console.log('User Document Address successfully deleted!');
        return newAddressArray;
      });
    } catch (error) {
      console.error('Error updating document: ', error);
    }
  };
  // End deleteUserAddressByUidAndIndex

  /**
   *
   * POST   /orders
   * @param {String} uid
   * @param {Object} newOrder
   */
  const postNewOrder = async (uid, newOrder) => {
    try {
      const docRef = await ordersColectionRef.add({ uid, newOrder });
      return docRef.id;
    } catch (error) {
      console.error('Error adding document: ', error);
      Promise.reject(error);
    }
  };
  // End postNewOrder

  /**
   *
   * GET    /orders/all
   */
  const getAllOrders = async () => {};
  // End getAllOrders

  /**
   *
   * GET    /orders?uid=
   * @param {String} uid
   */
  const getOrdersByUid = async (uid) => {};
  // End getOrdersByUid

  /**
   *
   * PUT    /orders?id=
   * @param {String} id
   * @param {Object} update
   */
  const updateOrdersById = async (id, update) => {};
  // End updateOrdersById

  /**
   *
   * DELETE /orders?id=
   * @param {String} id
   */
  const deleteOrdersById = async (id) => {};
  // End deleteOrdersById

  /**
   *
   * GET /availability
   */
  const getAvailability = async () => {
    const docRef = availabilityColectionRef.doc('standards');
    try {
      const document = await docRef.get();
      if (document.exists) {
        return document.data();
      } else {
        const standards = {
          fontsArray: [
            { description: 'Serif', value: 'serif' },
            { description: 'Arial', value: 'arial' },
            { description: 'Monospace', value: 'monospace' },
            { description: 'Chicle', value: 'Chicle' },
            { description: 'Fredoka One', value: 'Fredoka One' },
            { description: 'Lemon', value: 'Lemon' },
            { description: 'Salsa', value: 'Salsa' },
          ],
          insideColorArray: [
            { description: 'Black', value: 'black' },
            { description: 'Blue', value: 'blue' },
            { description: 'Red', value: 'red' },
          ],
          outsideColorArray: [
            { description: 'White', value: 'white' },
            { description: 'Yellow', value: 'yellow' },
            { description: 'Gray', value: 'light-gray' },
          ],
          tag_prices: { shipping_price: 10, tag_std_price: 1.2 },
        };
        docRef.set(standards);
        return standards;
      }
    } catch (error) {
      Promise.reject(error);
    }
  };
  // End getAvailability

  return {
    postNewUser,
    getAllUsers,
    getUserByUid,
    updateUserByUid,
    deleteUserByUid,
    postUserNewAddressesByUid,
    getUserAddressesByUid,
    updateUserAddressByUidAndIndex,
    deleteUserAddressByUidAndIndex,
    postNewOrder,
    getAllOrders,
    getOrdersByUid,
    updateOrdersById,
    deleteOrdersById,
    getAvailability,
  };
};
