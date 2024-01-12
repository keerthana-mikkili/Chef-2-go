import express from 'express';
import bodyParser from 'body-parser';
import {payment} from '../controllers/payment-controller.js';

const Paymentrouter = express.Router();


Paymentrouter.route('/')
.post(payment)
// post method for payment
export default Paymentrouter;
