import express from 'express';
import { addProduct, deleteProduct, getProducts, updateProduct } from '../controllers/productControllers.js';
import { AuthorizeRole, IsAuthenticated } from '../middlewares/IsAuthenticated.js';

const router = express.Router();


router.get('/getAllProducts',getProducts);
router.route('/addProduct').post(IsAuthenticated,AuthorizeRole('admin'),addProduct);
router.route('/updateProduct/:id').patch(IsAuthenticated,AuthorizeRole('admin'),updateProduct);
router.route('/deleteProduct/:id').delete(IsAuthenticated,AuthorizeRole('admin'),deleteProduct);





export default router;