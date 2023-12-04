import React, { Fragment, useEffect } from 'react'


import NavBar from "./NavBar";
import Banner from './Banner';
import Slide from './slide';
import MidSlide from './MidSlide';
import MidSection from './MidSection';


import { Box, styled } from "@mui/material";

import { getProducts } from '../../redux/actions/productActions';
import { useDispatch, useSelector } from "react-redux";



const Component = styled(Box)`
     padding:10px;
     background:#f2f2f2;

`;


function Home() {

 
    const products = useSelector(state => state.getProducts.products);
    // console.log(products);
  
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts())
  }, [dispatch])
  return (
    <Fragment>
      <NavBar />
      <Component>
        <Banner />
        <MidSlide products={products} title={"Deal of the day"} timer={true}/>
        <MidSection />
        <Slide products={products}/>
        <Slide products={products}/>
        <Slide products={products}/>
        <Slide products={products}/>


      </Component>

    </Fragment>
  )
}

export default Home;