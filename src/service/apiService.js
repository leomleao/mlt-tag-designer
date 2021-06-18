import http from '../service/http-common';

/**
 * GET    /api        => Server Running
 */
async function getServerRunning() {
  const res = await http.get('/api');
  return res;
}

/**
 *
 * POST   /orders
 * @param {String} uid
 * @param {Object} newOrder
 */
async function postNewOrder(uid, newOrder) {}

/**
 * GET    /orders/all
 */
async function getAllOrders() {}

/**
 *
 * GET    /orders?uid=
 * @param {String} uid
 */
async function getOrdersByUid(uid) {}

/**
 *
 * PUT    /orders?id=
 * @param {String} id
 * @param {Object} update
 */
async function updateOrdersById(id, update) {}

/**
 *
 * DELETE /orders?id=
 * @param {String} id
 */
async function deleteOrdersById(id) {}

export {
  getServerRunning,
  postNewOrder,
  getAllOrders,
  getOrdersByUid,
  updateOrdersById,
  deleteOrdersById,
};

/**
 * POST   /orders
 * GET    /orders/all
 * GET    /orders?uid=
 * PUT    /orders?id=
 * DELETE /orders?id=
 */
