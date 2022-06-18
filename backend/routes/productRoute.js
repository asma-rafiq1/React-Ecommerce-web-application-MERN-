const express=require('express');
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails, createProductReview, getAllReviews, deleteReview } = require('../controllers/productControllers');
const { isAuthenticated,authorizeRoles } = require('../middleware/auth');

const router=express.Router();

router.route('/products').get(getAllProducts)
router.route('/product/:id').get(getProductDetails)
router.route('/product/review').post(isAuthenticated,createProductReview)
router.route('/reviews').get(getAllReviews).delete(isAuthenticated,deleteReview)
router.route('/admin/product/new').post(isAuthenticated,createProduct)
router.route('/admin/product/:id').put(isAuthenticated,authorizeRoles("admin"),updateProduct).delete(isAuthenticated,authorizeRoles("admin"),deleteProduct).get(getProductDetails)

module.exports=router;