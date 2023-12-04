import { Button, Box, styled } from '@mui/material';
import { ShoppingCart as Cart, FlashOn as Flash } from '@mui/icons-material';

import { Link } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { useState } from 'react';

import { addToCart } from "../redux/actions/cartActions";

import axios from 'axios';

// import Razorpay from 'razorpay';


// import {payUsingPaytm} from "../service/api"
// import {post} from "../utils/paytm"

const LeftContainer = styled(Box)(({ theme }) => ({
    minWidth: '40%',
    padding: '40px 0 0 80px',
    [theme.breakpoints.down('md')]: {
        padding: '20px 40px'
    }
}))

const Image = styled('img')({
    padding: '15px'
});

const StyledButton = styled(Button)`
    width: 44%;
    border-radius: 2px;
    height: 50px;
    color: #FFF;
`;


function Actionitem({ product }) {

    const { id ,price ,title} = product;

    const [quantity, setQuantity] = useState(1);
    const dispatch = useDispatch();
    // console.log(product);


    const addItemToCart = () => {
        dispatch(addToCart(id, quantity));
        // navigate('/cart');
    }

   

    const buyNow = async () => {
        const amount = price.cost*100; // Replace with the actual amount
        const currency = 'INR'; // Replace with the desired currency
        const receipt = title.shortTitle; // Replace with the unique receipt ID
        const notes = 'Test payment'; // Replace with any additional notes

        const url = 'http://localhost:8000';
      
        try {
          const response = await axios.post(`${url}/payment`, {
            amount,
            currency,
            receipt,
            notes,
          });
          
          const orderId = response.data.orderId;


          const options = {
            key: 'rzp_test_JO61kByLvVWuHB',
            amount: price.cost*100,
            currency: 'INR',
            name: 'Flipkart Clone',
            description: 'Product Purchase',
            order_id: orderId,
            handler: function (response) {
              // Handle the successful payment response
              // ...
              // axios.post('http://localhost:8000/callback' ,(response))
              //  .then(res =>{
              //   console.log(res,37)
              //  }).catch(error=>{
              //   console.log(error)
              //  })


            },
            prefill: {
              name: 'John Doe',
              email: 'john.doe@example.com',
              contact: '9876543210',
            },
            theme: {
                color: '#F37254',
              },
          };
    
          const razorpayInstance = new window.Razorpay(options);
          razorpayInstance.open();
          
        } catch (error) {
          console.error('Error initiating purchase:', error);
        }
      }



    return (
        <LeftContainer>
            <Box style={{ border: '1px solid #f0f0f0', width: '90%' }}>
                <Image src={product.detailUrl} /><br />
            </Box>
            <Link to={'/cart'} onClick={() => addItemToCart()} >
                <StyledButton style={{ marginRight: 10, background: '#ff9f00' }} variant="contained"><Cart />Add to Cart</StyledButton>
            </Link>

            <StyledButton onClick={() => buyNow()} style={{ background: '#fb641b' }} variant="contained"><Flash /> Buy Now</StyledButton>
        </LeftContainer>
    )
}

export default Actionitem;