import firebase from '../firebase';
import { addressDetailsFirestoreConverter } from '../helpers/validations/Address';

class DB {
  #db;
  #userColectionRef;
  #ordersColectionRef;
  #availabilityColectionRef;

  constructor() {
    this.#db = firebase.firestore();
    this.#userColectionRef = this.#db.collection('users');
    this.#ordersColectionRef = this.#db.collection('orders');
    this.#availabilityColectionRef = this.#db.collection('availability');
  }

  async postNewUser(uid, userData) {
    try {
      await this.#db.runTransaction(async (transaction) => {
        const docRef = this.#userColectionRef.doc(uid);
        const doc = await transaction.get(docRef);
        if (!doc.exists) transaction.set(docRef, userData);
      });
      console.log('User Document successfully added!');
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  }

  async updateUserByUid(uid, update) {
    try {
      const docRef = await this.#userColectionRef.doc(uid).update(update);
      console.log('User Document successfully updated!');
      return update;
    } catch (error) {
      console.error('Error updating document: ', error);
    }
  }

  async getUserAddressesByUid(uid) {
    const docRef = this.#userColectionRef.doc(uid);
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
  }

  async updateUserAddressByUidAndIndex(uid, index, newAddressDetails) {
    const docRef = this.#userColectionRef.doc(uid);
    try {
      return await this.#db.runTransaction(async (t) => {
        const docData = await t.get(docRef);
        const newAddressArray = docData.data().addresses;
        const convertedAddressDetails =
          addressDetailsFirestoreConverter.toFirestore(newAddressDetails);
        newAddressArray[index] = convertedAddressDetails;
        t.update(docRef, {
          addresses: newAddressArray,
        });
        console.log('User Document Address successfully updated!');
        return newAddressArray;
      });
    } catch (error) {
      console.error('Error updating document: ', error);
    }
  }

  async deleteUserAddressByUidAndIndex(uid, index) {
    const docRef = this.#userColectionRef.doc(uid);
    try {
      return await this.#db.runTransaction(async (t) => {
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
  }

  async postNewOrder(uid, newOrder) {
    try {
      const docRef = await this.#ordersColectionRef.add({ uid, newOrder });
      return docRef.id;
    } catch (error) {
      console.error('Error adding document: ', error);
      Promise.reject(error);
    }
  }

  async getAllOrders() {}

  async getOrdersByUid(uid) {}

  async updateOrdersById(id, update) {}

  async getAvailability() {
    const docRef = this.#availabilityColectionRef.doc('standards');
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
  }
}

export default new DB();
