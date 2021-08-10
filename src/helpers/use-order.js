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
      stringifyTag: tag.toString(),
      description: tag.toDescripton(),
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
    updateOrder({ type: 'updateShippingAddress', newValue: changedAddress });
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

  const updateUser = (user) => {
    updateOrder({ type: 'updateUser', newValue: user });
  };

  const updatePayPalData = (data) => {
    updateOrder({ type: 'updateWithPaypalData', newValue: data });
  };

  const closeOrder = () => {
    localStorage.removeItem('order');
    updateOrder({ type: 'closeOrder' });
  };

  const { user } = useAuth();
  React.useEffect(() => {
    if (user) updateUser(user);
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
    updatePayPalData,
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
    case 'updateWithPaypalData':
      const { create_time, id, payer, purchase_units, status } = newValue;
      order.create_time = create_time;
      order.paypalOrderId = id;
      order.payer = payer;
      order.status = status;
      const { amount, items, shipping } = purchase_units[0];
      order.purchase_units[0].amount = amount;
      order.purchase_units[0].items = items;
      order.purchase_units[0].shipping = {
        ...order.purchase_units[0].shipping,
        ...shipping,
      };
      break;
    case 'updateUser':
      order.loggedUser = newValue.uid;
      order.purchase_units[0].shipping.name.full_name = newValue.displayName;
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
    case 'addItem':
      order.purchase_units[0].items.push(newValue);
      break;
    case 'changeItemQuantity':
      order.purchase_units[0].items[index].quantity = newValue;
      break;
    case 'changeItem':
      order.purchase_units[0].items[index] = newValue;
      break;
    case 'removeItem':
      order.purchase_units[0].items.splice(index, 1);
      break;
    case 'updateShipping':
      order.purchase_units[0].shipping = newValue;
      break;
    case 'updateShippingAddress':
      order.purchase_units[0].shipping.address = newValue;
      break;
    case 'changeShippingType':
      order.purchase_units[0].shipping.type = newValue;
      break;
    case 'changeRegiteredPost':
      order.purchase_units[0].shipping.registeredPost = newValue;
      break;
    case 'updateStatus':
      order.status = newValue;
      break;
    case 'closeOrder':
      return new Order();
    default:
      throw new Error('No such reducer type developed');
  }
  const newOrder = new Order(order);
  localStorage.setItem('order', JSON.stringify(newOrder));
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
