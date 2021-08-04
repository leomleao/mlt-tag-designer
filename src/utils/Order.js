export const orderConverter = {
  toFirestore: function (order) {
    return {
      create_time: order.create_time,
      paypalOrderId: order.paypalOrderId,
      loggedUser: order.loggedUser,
      payer: order.payer,
      purchase_units: order.purchase_units,
      status: order.status,
      update_time: order.update_time,
    };
  },
  fromFirestore: function (snapshot, options) {
    const data = snapshot.data(options);
    return new Order(data);
  },
};

export class Order {
  constructor({
    create_time = null,
    paypalOrderId = '',
    loggedUser = null,
    payer = null,
    purchase_units: [
      {
        amount: {
          //https://developer.paypal.com/docs/api/reference/currency-codes/
          currency_code = 'GBP',
          breakdown: {
            item_total: { value: item_total_value = '0.00' } = {},
            shipping: { value: shipping_value = '0.00' } = {},
            handling: { value: handling_value = '0.00' } = {},
            shipping_discount: { value: shipping_discount_value = '0.00' } = {},
            discount: { value: discount_value = '0.00' } = {},
          } = {},
        } = {},
        description = '',
        items = [],
        shipping: {
          name: { full_name = '' } = {},
          type = 'SHIPPING', // 'SHIPPING' OR 'PICKUP_IN_PERSON'
          registeredPost = false,
          address: {
            address_line_1 = '', // String number and street
            address_line_2 = '', // Suite or apartament
            admin_area_1 = '', // province or state (UK= A county.)
            admin_area_2 = '', // city, town or village
            postal_code = '', // https://en.wikipedia.org/wiki/Postal_code#United_Kingdom
            country_code = '', //The two-character ISO 3166-1 code that identifies the country or region.
          } = {},
        } = {},
      } = {},
    ] = [],
    status = null, // CREATED, SAVED, APPROVED, VOIDED, COMPLETED, PAYER_ACTION_REQUIRED
    update_time = null,
  } = {}) {
    // calculations:
    // purchase_units.amount.value.breakdown.item_total
    if (items.length > 0) {
      item_total_value = items.reduce((acc, item) => {
        const {
          unit_amount: { value },
          quantity,
        } = item;
        const amountByItem = parseFloat(value) * parseInt(quantity);
        return acc + amountByItem;
      }, 0);
      item_total_value = item_total_value;
      if (loggedUser) {
        description = full_name ? `${full_name} Tags` : 'Custom Tags';
      }
    }
    // purchase_units.amount.value
    item_total_value = parseFloat(item_total_value);
    shipping_value = parseFloat(shipping_value);
    handling_value = parseFloat(handling_value);
    shipping_discount_value = parseFloat(shipping_discount_value);
    discount_value = parseFloat(discount_value);
    const value =
      item_total_value +
      shipping_value +
      handling_value -
      shipping_discount_value -
      discount_value;

    this.create_time = create_time;
    this.paypalOrderId = paypalOrderId;
    this.loggedUser = loggedUser;
    this.payer = payer;
    this.intent = 'CAPTURE';
    this.purchase_units = [
      {
        amount: {
          currency_code,
          value: value.toFixed(2).toString(),
          breakdown: {
            item_total: {
              currency_code,
              value: item_total_value.toFixed(2).toString(),
            },
            shipping: {
              currency_code,
              value: shipping_value.toFixed(2).toString(),
            },
            handling: {
              currency_code,
              value: handling_value.toFixed(2).toString(),
            },
            shipping_discount: {
              currency_code,
              value: shipping_discount_value.toFixed(2).toString(),
            },
            discount: {
              currency_code,
              value: discount_value.toFixed(2).toString(),
            },
          },
        },
        description,
        items,
        shipping: {
          name: { full_name },
          type: type,
          registeredPost: registeredPost,
          address: {
            address_line_1,
            address_line_2,
            admin_area_1,
            admin_area_2,
            postal_code,
            country_code,
          },
        },
      },
    ];
    this.status = status;
    this.update_time = update_time;
  }
  closeOrder() {
    localStorage.removeItem('order');
  }
}

export const ShippingMethodEnum = Object.freeze({
  SHIPPING: 'SHIPPING',
  PICKUP_IN_PERSON: 'PICKUP_IN_PERSON',
});

export const OrderStatusEnum = Object.freeze({
  CREATED: 'CREATED',
  SAVED: 'SAVED',
  APPROVED: 'APPROVED',
  VOIDED: 'VOIDED',
  COMPLETED: 'COMPLETED',
  PAYER_ACTION_REQUIRED: 'PAYER_ACTION_REQUIRED',
});
