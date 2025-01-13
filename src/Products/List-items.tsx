
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Card, CardContent, Typography } from '@mui/material';

type Product = {
  id: string;
  title: string;
  description: string;
  price: number;
  mrp: number;
  status: string;
  rating: number;
  review: string;
}

const ListItems: React.FC = () => {
  const [productData, setProductData] = useState<Product[]>([]);
  const navigate = useNavigate();

 
  const handleDelete = (id: string) => {
    const updatedData = productData.filter((product) => product.id  !== id);
    setProductData(updatedData);
    localStorage.setItem("productData", JSON.stringify(updatedData));
  };

  const handleNavigate = (product: Product) => {
    navigate(`/listitems/product-details/${product.id}`, {state: {product} });
  };


  useEffect(() => {
    
    const storedData : Product[] = JSON.parse(localStorage.getItem("productData") || "[]");
    setProductData(storedData);
  }, []);

  return (
    <Box style={{ padding: '20px' }}>
     
     <Button 
      variant="contained" 
      color="primary" 
      style={{ marginBottom: '20px' }} 
      onClick={() => navigate("/")} 
      > 
      Back 
      </Button>

      <h1>Product List</h1>
         {productData.length === 0 ? (
        <p>No products available. Please add some products.</p>
      ) : (
        productData.map((product) => (
          <Card
            key={product.id}
            style={{
              marginBottom: '20px',
              cursor: 'pointer',
              position: 'relative',
            }}
            onClick={() => handleNavigate(product)}
          >
            <CardContent>
              <Typography variant="h6">{product.title}</Typography>
              <Typography>Description: {product.description}</Typography>
              <Typography>Price: ₹{product.price}</Typography>
              <Typography>MRP: ₹{product.mrp}</Typography>
              <Typography>Status: {product.status}</Typography>
              <Typography>Rating: {product.rating} Stars</Typography>
              <Typography>Review: {product.review}</Typography>
            </CardContent>
            <Button
              variant="outlined"
              color="error"
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
              }}
              onClick={(e) => {
                e.stopPropagation(); 
                handleDelete(product.id);
              }}
            >
              Delete
            </Button>
          </Card>
        ))
      )}
    </Box>
  );
};

export default ListItems;



