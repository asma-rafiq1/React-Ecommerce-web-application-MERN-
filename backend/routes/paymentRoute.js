const express=require('express');
const { sendApiKey , processPayment} = require('../controllers/payemntControllers');
const { isAuthenticated } = require('../middleware/auth');

const router=express.Router();

router.route("/payment/process").post(isAuthenticated, processPayment);

router.route('/stripekey').get(sendApiKey);


module.exports=router;