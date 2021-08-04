// React
import React, {
  useReducer,
  useContext,
  createContext,
  useState,
  useEffect,
} from 'react';

// DataBank
import firestore from '../service/use-firestore';
import { useAuth } from './use-auth';
import { Order, ShippingMethodEnum } from '../utils/Order';

const orderContext = createContext();

// Provider component that wraps your app and makes order object ...
// ... available to any child component that calls useOrderManager().
export function ProvideOrder({ children }) {
  const orderManager = useProvideOrder();
  return (
    <orderContext.Provider value={orderManager}>
      {children}
    </orderContext.Provider>
  );
}

// Hook for child components to get the order object ...
// ... and re-render when it changes.
export const useOrderManager = () => {
  return useContext(orderContext);
};

// Provider hook that creates order object and handles state
function useProvideOrder() {
  const [tagPrice, setTagPrice] = useState(null);
  const [availability, setAvailability] = useState(null);
  useEffect(() => {
    if (!availability || !tagPrice) {
      firestore
        .getAvailability()
        .then(
          ({
            fontsArray,
            tag_prices: { shipping_price, tag_std_price } = {},
            outsideColorArray,
            insideColorArray,
          }) => {
            setAvailability({
              fontsArray,
              outsideColorArray,
              insideColorArray,
            });
            setTagPrice(tag_std_price);
            updateOrder({
              type: 'updateShippingValue',
              newValue: shipping_price,
            });
          }
        )
        .catch((err) => {
          console.error(err);
        });
    }
  }, [availability, tagPrice]);

  const [order, updateOrder] = useReducer(
    orderReducer,
    new Order(),
    getOrderFromLocalStorage
  );

  const addTag = (tag) => {
    const { typedName, fontFamily, insideColor, outsideColor } = tag;
    const newItem = {
      name: `${typedName}`,
      unit_amount: {
        currency_code: 'GBP',
        value: `${tagPrice}`,
      },
      quantity: '1',
      stringifyTag: JSON.stringify(tag),
      description: `"${typedName}" with font ${fontFamily} - ${insideColor} & ${outsideColor}`,
      category: 'PHYSICAL_GOODS',
    };
    updateOrder({ type: 'addItem', newValue: newItem });
  };

  const changeTag = (index, tag) => {
    updateOrder({ type: 'changeItem', index, newValue: tag });
  };

  const changeItemQuantity = (index, newQuantity) => {
    updateOrder({ type: 'changeItemQuantity', index, newValue: newQuantity });
  };

  const removeTag = (index) => {
    updateOrder({ type: 'removeItem', index });
  };

  const updateAddress = (changedAddress) => {
    updateOrder({ type: 'updateShipping', newValue: changedAddress });
  };

  const changeShippingMethod = (type) => {
    if (type === ShippingMethodEnum.PICKUP_IN_PERSON) {
      updateOrder({
        type: 'updateShippingDiscountValue',
        newValue: order.purchase_units[0].amount.breakdown.shipping.value,
      });
    } else {
      updateOrder({
        type: 'updateShippingDiscountValue',
        newValue: '0.00',
      });
    }
    updateOrder({ type: 'changeShippingType', newValue: type });
  };

  const changeRegiteredPost = (newValue) => {
    updateOrder({ type: 'changeRegiteredPost', newValue });
  };

  const updateRecipentName = (newValue) => {
    updateOrder({ type: 'updateRecipentName', newValue });
  };

  const updateLoggerUser = (userName) => {
    updateOrder({ type: 'updateLoggedUser', newValue: userName });
  };

  const closeOrder = () => {
    localStorage.removeItem('order');
  };

  const { user } = useAuth();
  React.useEffect(() => {
    const updateUserData = async () => {
      updateLoggerUser(user.displayName);
      updateRecipentName(user.displayName);
      // const savedAddress = await firestore.getUserAddressesByUid(user.uid);
      // console.log(savedAddress);
    };
    if (user) updateUserData();
  }, [user]);

  // Return the order object and order methods
  return {
    order,
    availability,
    changeItemQuantity,
    addTag,
    changeTag,
    removeTag,
    updateAddress,
    updateRecipentName,
    changeShippingMethod,
    changeRegiteredPost,
    closeOrder,
  };
}

/**
 *
 * @param {*} prevOrder
 * @param {Object} action object with type
 * function to change the order
 */
function orderReducer(prevOrder, action) {
  const { type, index, newValue } = action;
  const order = Object(prevOrder);

  switch (type) {
    case 'create_time':
      break;
    case 'paypalOrderId':
      break;
    case 'updateLoggedUser':
      order.loggedUser = newValue;
      break;
    case 'updateRecipentName':
      order.purchase_units[0].shipping.name.full_name = newValue;
      break;
    case 'updateShippingValue':
      order.purchase_units[0].amount.breakdown.shipping.value = newValue;
      break;
    case 'updateHandlingValue':
      order.purchase_units[0].amount.breakdown.handling.value = newValue;
      break;
    case 'updateShippingDiscountValue':
      order.purchase_units[0].amount.breakdown.shipping_discount.value =
        newValue;
      break;
    case 'updateDiscountValue':
      order.purchase_units[0].amount.breakdown.discount.value = newValue;
      break;
    case 'purchase_units.description':
      break;
    case 'addItem':
      order.purchase_units[0].itens.push(newValue);
      break;
    case 'changeItemQuantity':
      order.purchase_units[0].itens[index].quantity = newValue;
      break;
    case 'changeItem':
      order.purchase_units[0].itens[index] = newValue;
      break;
    case 'removeItem':
      order.purchase_units[0].itens.splice(index, 1);
      break;
    case 'updateShipping':
      order.purchase_units[0].shipping = newValue;
      break;
    case 'changeShippingType':
      order.purchase_units[0].shipping.type = newValue;
      break;
    case 'changeRegiteredPost':
      order.purchase_units[0].shipping.registeredPost = newValue;
      break;
    case 'status':
      break;
    default:
      throw new Error('No such reducer type developed');
  }
  const newOrder = new Order(order);
  localStorage.setItem('order', JSON.stringify(newOrder));
  console.log(newOrder);
  return newOrder;
}

/**
 *
 * @param {Order} newOrder  helper funtion to init a new order.
 */
function getOrderFromLocalStorage(newOrder) {
  const storedOrder = JSON.parse(localStorage.getItem('order'));
  if (storedOrder) {
    return new Order(storedOrder);
  }
  return newOrder;
}

class Order {
  constructor({
    create_time = null,
    paypalOrderId = '',
    loggedUser = null,
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
        itens = [],
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
    if (itens.length > 0) {
      item_total_value = itens.reduce((acc, item) => {
        const {
          unit_amount: { value },
          quantity,
        } = item;
        const amountByItem = parseFloat(value) * parseInt(quantity);
        return acc + amountByItem;
      }, 0);
      item_total_value = item_total_value;
      if (loggedUser) {
        description = `${loggedUser} Tags`;
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
        itens,
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
}

export class Tag {
  constructor(
    {
      typedName = '',
      fontFamily = 'serif',
      insideColor = 'black',
      outsideColor = 'white',
    } = {},
    stringifyedTag
  ) {
    if (stringifyedTag) {
      const storedTag = JSON.parse(stringifyedTag);
      typedName = storedTag.typedName;
      fontFamily = storedTag.fontFamily;
      insideColor = storedTag.insideColor;
      outsideColor = storedTag.outsideColor;
    }
    this.typedName = typedName;
    this.fontFamily = fontFamily;
    this.insideColor = insideColor;
    this.outsideColor = outsideColor;
  }
  logTag() {
    console.log(this);
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
