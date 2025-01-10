import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import ProductPage from './Products/Product-Page';


const App: React.FC = () => {
  return (
        <Router>
          <Routes>
            
            <Route path="/" element={<ProductPage />} />
    </Routes>
    </Router>
  )
}
export default App;