import express from  'express';
import { getProducts ,getProductById} from '../controllers/productController.js';


import { userSignUp,userLogIn} from '../controllers/user-controller.js';
import { addPaymentGateway ,paymentResponse } from '../controllers/paytm-controoler.js';





const router = express.Router();

router.post('/signup', userSignUp);
router.post('/login',userLogIn);


router.get('/products' ,getProducts);
router.get('/product/:id', getProductById);


router.post('/payment', addPaymentGateway);
router.post('/callback', paymentResponse);


export default router;