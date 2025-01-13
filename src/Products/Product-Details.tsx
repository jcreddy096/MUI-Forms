import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Button, Card, CardContent, Typography } from '@mui/material';
import ProductDetailsText from './ProductDetailsText';

const ProductDetails: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product;


  if (!product) {
    return <p>Product not found.</p>;
  }

  return (
    <Box style={{ padding: '20px' }}>
     
     <Button 
      variant="contained" 
      color="primary" 
      style={{ marginBottom: '20px' }} 
      onClick={() => navigate(-1)} 
      > 
      Back 
      </Button>

    <Card style={{ margin: '20px', padding: '20px' }}>
      
      <CardContent>
        <Typography variant="h4">{product.title}</Typography>
        <ProductDetailsText product={product} />
      </CardContent>

    </Card>

    </Box>
  );
};

export default ProductDetails;
