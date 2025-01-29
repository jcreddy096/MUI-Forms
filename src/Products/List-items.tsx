
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, Button, Card, CardContent, Typography, TextField, FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import { IProduct } from './Schema';
import { useDebounce } from 'use-debounce';


const ListItems: React.FC = () => {
  const [productData, setProductData] = useState<IProduct[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [inputValue, setInputValue] = React.useState("");
  const[selectBrand, setSelectBrand] = useState<string[]>([]);
  const navigate = useNavigate();
  const location = useLocation();
  
  const [debouncedValue] = useDebounce(inputValue,500);

  const handleDelete = (id: string | undefined) => {
    if (id) {
      const updatedData = productData.filter((product) => product.id !== id);
      setProductData(updatedData);
      localStorage.setItem("productData", JSON.stringify(updatedData));
    }
  };

  const handleNavigate = (id: string | undefined) => {
    navigate(`/list-items/product-details/${id}`);
  };

  const handleBrandChange = (e: React.ChangeEvent<HTMLInputElement>) => { 
    const brand = e.target.name; 
    setSelectBrand(prevSelectedBrands => 
      prevSelectedBrands.includes(brand) 
      ? prevSelectedBrands.filter(b => b !== brand) 
      : [...prevSelectedBrands, brand] 
    ); 
  };

  const brands = Array.from(new Set(productData.map(product => product.brand)));

  const filteredProducts = productData.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  )
    .filter((product) =>
       selectBrand.length === 0 || selectBrand.includes(product.brand)
       );

  const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
    setInputValue(e.target.value);
  }

   
  useEffect(() => {
    if (debouncedValue) {
      //console.log('Debounced search query:', debouncedValue);
      setSearchQuery(debouncedValue);
      
      navigate(`?search=${debouncedValue}`);
    }
  },[debouncedValue, navigate]);


  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get("search") || "";
    setSearchQuery(query);
    setInputValue(query);

    const storedData: IProduct[] = JSON.parse(localStorage.getItem("productData") || "[]");
    setProductData(storedData);
  }, [location.search]);

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
        value={inputValue}
        onChange={handleInputChange}
        style={{ marginBottom: '20px' }}
      />

      <FormGroup>
         {brands.map((brand) => (
             <FormControlLabel 
                key={brand}
                control={<Checkbox 
                checked={selectBrand.includes(brand)}
                onChange={handleBrandChange}
                name={brand}
  
              />
             } 
            label={brand} 
          />
        ))}
      </FormGroup>

      {filteredProducts.length === 0 ? (
        <p>No products found matching your search.</p>
      ) : (
        filteredProducts.map((product) => (
          <Card
            key={product.id}
            sx={{
              marginBottom: '20px',
              cursor: 'pointer',
              position: 'relative',
            }}
            onClick={() => handleNavigate(product.id)}
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
              sx={{
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
