import React from 'react';
import { Typography } from '@mui/material';

type Product = {
  title: string;
  description: string;
  price: number;
  mrp: number;
  status: string;
  rating: number;
  review: string;
};

const ProductDetailsText: React.FC<{ product: Product }> = ({ product }) => {
  return (
    <Typography>
      Description: {product.description} <br />
      Price: ₹{product.price} <br />
      MRP: ₹{product.mrp} <br />
      Status: {product.status} <br />
      Rating: {product.rating} Stars <br />
      Review: {product.review}
    </Typography>
  );
};

export default ProductDetailsText;
