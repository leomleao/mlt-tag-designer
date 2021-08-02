import * as yup from 'yup';

export const addressDetailsFirestoreConverter = {
  toFirestore: function (addressDetails) {
    const {
      address: {
        address_line_1,
        address_line_2,
        admin_area_1,
        admin_area_2,
        postal_code,
        country_code,
      } = {},
    } = addressDetails;
    return {
      ...addressDetails,
      address: {
        address_line_1,
        address_line_2,
        admin_area_1,
        admin_area_2,
        postal_code,
        country_code,
      },
    };
  },
  fromFirestore: function (snapshot, options) {
    const data = options ? snapshot.data(options) : snapshot;
    return { ...data, address: new Address(data.address) };
  },
};

export const addressYupSchema = yup.object().shape({
  address_line_1: yup.string().required(), // String number and street
  address_line_2: yup.string().default(''), // Suite or apartament
  admin_area_1: yup.string().required(), // province or state (UK= A county.)
  admin_area_2: yup.string().required(), // city, town or village
  postal_code: yup.string().required(), // https://en.wikipedia.org/wiki/Postal_code#United_Kingdom
  country_code: yup.string().required(), //The two-character ISO 3166-1 code that identifies the country or region.
});

export class Address {
  constructor({
    address_line_1 = '', // String number and street
    address_line_2 = '', // Suite or apartament
    admin_area_1 = '', // province or state (UK= A county.)
    admin_area_2 = '', // city, town or village
    postal_code = '', // https://en.wikipedia.org/wiki/Postal_code#United_Kingdom
    country_code = '', //The two-character ISO 3166-1 code that identifies the country or region.
  } = {}) {
    this.address_line_1 = address_line_1;
    this.address_line_2 = address_line_2;
    this.admin_area_1 = admin_area_1;
    this.admin_area_2 = admin_area_2;
    this.postal_code = postal_code;
    this.country_code = country_code;
  }
}
