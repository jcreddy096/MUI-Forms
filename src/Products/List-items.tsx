
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, Button, Card, CardContent, Typography, TextField } from '@mui/material';
import { IProduct } from './Schema';

const ListItems: React.FC = () => {
  const [productData, setProductData] = useState<IProduct[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleDelete = (id: string | undefined) => {
    if (id) {
      const updatedData = productData.filter((product) => product.id !== id);
      setProductData(updatedData);
      localStorage.setItem("productData", JSON.stringify(updatedData));
    }
  };

  const handleNavigate = (product: IProduct) => {
    navigate(`/listitems/product-details/${product.id}`, { state: { product } });
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredProducts = productData.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const storedData: IProduct[] = JSON.parse(localStorage.getItem("productData") || "[]");
    setProductData(storedData);
  }, [location]);

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

      <TextField
        label="Search by Title"
        variant="outlined"
        fullWidth
        value={searchQuery}
        onChange={handleSearch}
        style={{ marginBottom: '20px' }}
      />

      {filteredProducts.length === 0 ? (
        <p>No products found matching your search.</p>
      ) : (
        filteredProducts.map((product) => (
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
