import React from 'react'
import { useEffect ,useState } from 'react';

import { Box, Typography, Button, Grid, styled } from '@mui/material';
import { useParams } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { addToCart, removeFromCart } from '../../redux/actions/cartActions';

import TotalView from './TotalView';
import EmptyCart from './EmptyCart';
import CartItem from './CartItem';

import axios  from 'axios';

// import { payUsingPaytm } from '../../service/api';
// import { post } from '../../utils/paytm'; 


const Component = styled(Grid)(({ theme }) => ({
    padding: '30px 135px',
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
        padding: '15px 0'
    }
}));

const LeftComponent = styled(Grid)(({ theme }) => ({
    paddingRight: 15,
    [theme.breakpoints.down('sm')]: {
        marginBottom: 15
    }
}));

const Header = styled(Box)`
    padding: 15px 24px;
    background: #fff;
`;

const BottomWrapper = styled(Box)`
    padding: 16px 22px;
    background: #fff;
    box-shadow: 0 -2px 10px 0 rgb(0 0 0 / 10%);
    border-top: 1px solid #f0f0f0;
`;

const StyledButton = styled(Button)`
    display: flex;
    margin-left: auto;
    background: #fb641b;
    color: #fff;
    border-radius: 2px;
    width: 250px;
    height: 51px;
`;



function Cart() {

    const cartDetails = useSelector(state => state.cart);
    const { cartItems } = cartDetails;
    const { id } = useParams();
    const [price, setPrice] = useState(0);
    const [discount, setDiscount] = useState(0)

    const dispatch = useDispatch();

    useEffect(() => {
        if (cartItems && id !== cartItems.id)
            dispatch(addToCart(id));
            totalAmount();

    }, [dispatch, cartItems, id]);

    const totalAmount = () => {
        let price = 0, discount = 0;
        cartItems.map(item => {
            price += item.price.mrp
            discount += (item.price.mrp - item.price.cost) 
        })
        setPrice(price);
        setDiscount(discount)
    }
    const totalOrderAmmount =price-discount+40;

    const placeOrder = async () => {
        const amount = totalOrderAmmount*100; // Replace with the actual amount
        const currency = 'INR'; // Replace with the desired currency
        const receipt = 'Your orde'; // Replace with the unique receipt ID
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
            amount: totalOrderAmmount*100,
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
        <>
        { cartItems.length ?
            <Component container>
                <LeftComponent item lg={9} md={9} sm={12} xs={12}>
                    <Header>
                        <Typography style={{fontWeight: 600, fontSize: 18}}>My Cart ({cartItems?.length})</Typography>
                    </Header>
                        {   cartItems.map(item => (
                                <CartItem item={item} />
                            ))
                        }
                    <BottomWrapper>
                        <StyledButton onClick={() => placeOrder()}  variant="contained">Place Order</StyledButton>
                    </BottomWrapper>
                </LeftComponent>
                <Grid item lg={3} md={3} sm={12} xs={12}>
                    <TotalView cartItems={cartItems} />
                </Grid>
            </Component>:<EmptyCart />
        }
        </>
    );
}

export default Cart