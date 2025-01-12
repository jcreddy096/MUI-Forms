import React from 'react';
import { useLocation } from 'react-router-dom';
import { Card, CardContent, Typography } from '@mui/material';

const ProductDetails: React.FC = () => {
  const location = useLocation();
  const product = location.state?.product;

  if (!product) {
    return <p>Product not found.</p>;
  }

  return (
    <Card style={{ margin: '20px', padding: '20px' }}>
      <CardContent>
        <Typography variant="h4">{product.title}</Typography>
        <Typography>Description: {product.description}</Typography>
        <Typography>Price: ₹{product.price}</Typography>
        <Typography>MRP: ₹{product.mrp}</Typography>
        <Typography>Status: {product.status}</Typography>
        <Typography>Rating: {product.rating} Stars</Typography>
        <Typography>Review: {product.review}</Typography>
      </CardContent>
    </Card>
  );
};

export default ProductDetails;
