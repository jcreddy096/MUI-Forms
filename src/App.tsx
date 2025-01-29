
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// import ProductPage from './Products/Product-Page';
// import ListItems from './Products/List-items';
// import ProductDetails from './Products/Product-Details';
// import { Toaster } from 'sonner';
// import { Box } from '@mui/material';

// const App = () => {
//   return (

//     <><Box>
//       <Toaster position="top-right" />
      
//     </Box>
//     <Router>
//         <Routes>
//           <Route path="/" element={<ProductPage />} />
//           <Route path="/listitems" element={<ListItems />} />
//           <Route path="/listitems/product-details/:id" element={<ProductDetails />} />
//         </Routes>
//       </Router></>
     
//   );
// };

// export default App;


import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ListItems from './pages/List-Items';
import ProductDetails from './pages/Product-Details';
import ProductPage from './pages/Product-Page';
import { Toaster } from 'sonner';
import { Box } from '@mui/material';
import { ToastContainer } from 'react-toastify';

const App: React.FC = () => {
  return (
    <Router>
      <Box>
        <Routes>

          <Route path="/" element={<ProductPage />} />
          <Route path="/list-items" element={<ListItems />} />
          <Route path="/list-items/product-details/:id" element={<ProductDetails />} />
          
        </Routes>
        <Toaster position='top-right' />
          <ToastContainer
          autoClose={5000} />
       </Box>
    </Router>
  );
};

export default App;
