
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, CardContent, Typography } from '@mui/material';

interface Product {
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

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("productData") || "[]");
    setProductData(storedData);
  }, []);

  const handleDelete = (index: number) => {
    const updatedData = productData.filter((_, i) => i !== index);
    setProductData(updatedData);
    localStorage.setItem("productData", JSON.stringify(updatedData));
  };

  const handleNavigate = (product: Product) => {
    navigate(`/product-details`, { state: { product } });
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Product List</h1>
      {productData.length === 0 ? (
        <p>No products available. Please add some products.</p>
      ) : (
        productData.map((product, index) => (
          <Card
            key={index}
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
                handleDelete(index);
              }}
            >
              Delete
            </Button>
          </Card>
        ))
      )}
    </div>
  );
};

export default ListItems;
