import React from 'react';
import { Typography } from '@mui/material';
import { IProduct } from './Schema';


const ProductDetailsText: React.FC<{ product: IProduct }> = ({ product }) => {
  return (
    <Typography>
      Description: {product.description} 
      Price: ₹{product.price} 
      MRP: ₹{product.mrp} 
      Status: {product.status} 
      Rating: {product.rating} Stars
      Review: {product.review}
    </Typography>
  );
};

export default ProductDetailsText;
