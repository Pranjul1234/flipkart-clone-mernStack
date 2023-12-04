import Header from './Components/header/Header';
import Home from "./Components/home/Home";
import DetailView from './details/DetailView';
import Cart from "./Components/cart/Cart";



import { Box } from '@mui/material';


import ContextProvider from './context/ContextProvider';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <ContextProvider className="App">
      
      <BrowserRouter>
          <Header />
          <Box style={{marginTop: 54}}>
            <Routes>
              <Route exact path= '/' element={<Home />} />
              <Route path= '/cart' element={<Cart />} />
              <Route path= '/product/:id' element={<DetailView />} />
            </Routes>
          </Box>
        </BrowserRouter>
      
    </ContextProvider>
  );
}

export default App;
