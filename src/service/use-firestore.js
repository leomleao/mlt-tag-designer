import firebase from '../firebase';

export const useFirestore = () => {
  const db = firebase.firestore();
  const userColectionRef = db.collection('users');
  const availabilityColectionRef = db.collection('availability');

  /**
   *
   */
  const getServerRunning = async () => {
    return 'server_running_OK';
  };
  // End getServerRunning

  /**
   *
   * POST   /users?uid=  Complete User
   * @param {String} uid
   * @param {Object} userData
   */
  const postNewUser = async (uid, userData) => {
    try {
      const docRef = await userColectionRef.doc(uid).set(userData);
      console.log('User Document successfully added!');
      return docRef;
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };
  // End postNewUser

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
      return docRef;
    } catch (error) {
      console.error('Error updating document: ', error);
    }
  };
  // End updateUserByUid


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
        return userDoc.addresses;
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
  const updateUserAddressByUidAndIndex = async (uid, index, newAddress) => {
    const docRef = userColectionRef.doc(uid);
    try {
      await db.runTransaction(async (t) => {
        const docData = await t.get(docRef);
        const addressArray = docData.data();
        const newAddressArray = addressArray.map((address, i) => {
          if (i === index) {
            return newAddress;
          } else {
            return address;
          }
        });
        t.update(docRef, {
          addresses: newAddressArray,
        });
        console.log('User Document Address successfully updated!');
        return { addresses: newAddressArray };
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
    console.log('deleteUserAddressByUidAndIndex: NOT DEVELOPED');
  };
  // End deleteUserAddressByUidAndIndex

  /**
   *
   * POST   /orders
   * @param {String} uid
   * @param {Object} newOrder
   */
  const postNewOrder = async (uid, newOrder) => {};
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
   * GET /availability
   */
  const getAvailability = async () => {
    const docRef = availabilityColectionRef.doc('standards');
    try {
      const document = await docRef.get();
      if (document.exists) {
        return document.data();
      } else {
        // doc.data() will be undefined in this case
        console.log('Standards not found in the DataBank');
      }
    } catch (error) {
      console.error('Error getting document: ', error);
    }
  };
  // End getAvailability

  return {
    getServerRunning,
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
