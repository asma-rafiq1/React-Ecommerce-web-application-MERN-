const express=require('express');
const { newOrder, getSingleOrder, myOrders, updateOrderStatus, getAllOrdersAdmin, deleteOrder } = require('../controllers/orderControllers');
const { isAuthenticated,authorizeRoles } = require('../middleware/auth');

const router=express.Router();

router.route('/order/new').post(isAuthenticated,newOrder);
router.route('/order/me').get(isAuthenticated,myOrders);  //exchange as it was going to 2nd route first as same structure
router.route('/order/:id').get(isAuthenticated,getSingleOrder);

//admin
router.route('/admin/order').get(isAuthenticated,authorizeRoles('admin'),getAllOrdersAdmin); 
router.route('/order/:id').put(isAuthenticated,authorizeRoles('admin'),updateOrderStatus).delete(isAuthenticated,authorizeRoles('admin'),deleteOrder)



module.exports=router;