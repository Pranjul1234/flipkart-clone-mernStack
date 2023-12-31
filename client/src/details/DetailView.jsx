import React from 'react'

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { styled, Box, Grid } from '@mui/material';

import { useParams } from 'react-router-dom';

import { getProductDetails } from '../redux/actions/productActions';

import ProductDetail from "./producDetail";
import ActionItem from './Actionitem';


const Component = styled(Box)`
    margin-top: 55px;
    background: #F2F2F2;
`;

const Container = styled(Grid)(({ theme }) => ({
  background: '#FFFFFF',
  display: 'flex',
  [theme.breakpoints.down('md')]: {
    margin: 0
  }
}))

const RightContainer = styled(Grid)`
    margin-top: 50px;
   
    & > p {
        marginTop:'10px'
   }
`;

function DetailView() {



  const { id } = useParams();
  const dispatch = useDispatch();
  const { loading, product } = useSelector(state => state.getProductDetails);

  useEffect(() => {
    if (product && id !== product.id)
      dispatch(getProductDetails(id));
  }, [dispatch, product, id, loading]);

  return (

    <Component>
      <Box></Box>
      {product && Object.keys(product).length &&
        <Container container>
          <Grid item lg={4} md={4} sm={8} xs={12}>
            <ActionItem product={product} />
          </Grid>
          <RightContainer item lg={8} md={8} sm={8} xs={12}>
            <ProductDetail product={product} />
          </RightContainer>
        </Container>
      }
    </Component>
  )
}

export default DetailView;