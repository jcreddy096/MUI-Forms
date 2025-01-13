import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import ProductPage from './Products/Product-Page';
import ListItems from './Products/List-items';
import ProductDetails from './Products/Product-Details';

const App: React.FC = () => {
  return (
        <Router>
          <Routes>
            
            <Route path="/" element={<ProductPage />} />
            <Route path="/listitems" element={<ListItems />} />
            <Route path="/listitems/product-details/:productId" element={<ProductDetails />} />


    </Routes>
    </Router>
  )
}
export default App;