// import RazorPay from 'razorpay';

import dotenv from 'dotenv';

dotenv.config();

import Razorpay from 'razorpay';

import { v4 as uuid } from 'uuid';

// Create a new instance of Razorpay with your API credentials
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export const addPaymentGateway = async (req, res) => {
    try {
        const { amount, currency, receipt, notes } = req.body;

        // Create a Razorpay order
        const options = {
            amount,
            currency,
            receipt,
            notes,
        };

        const orderID = uuid()
        const order = await razorpay.orders.create(options);

        // Send the order ID to the frontend
        res.status(200).json(orderID);
    } catch (error) {
        console.error('Error creating Razorpay order:', error);
        res.status(500).json({ error: 'An error occurred while creating the order' });
    }
};

export const paymentResponse = (req,res) => {
//     const { orderId, paymentId, signature } = req.body;

//   // Verify the payment signature
//   const generatedSignature = razorpay.webhooks.generateSignature(
//     JSON.stringify(req.body),
//     'tOxRaB7ob35jmp5Uq01yBv02'
//   );

//   if (generatedSignature === signature) {
//     // Payment verification successful
//     // Update the order status or perform any other required actions
//     res.status(200).json({ message: 'Payment successful' });
//     } else {
//       // Invalid payment signature
//       console.error('Invalid payment signature');
//       res.status(400).send('Invalid payment signature');
//     }
  }
