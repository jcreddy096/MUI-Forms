
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, FormGroup, FormControlLabel, Checkbox, Typography } from '@mui/material';
import { IProduct } from '../Schema/Schema';
import { useDebounce } from 'use-debounce';
import ProductCard from '../components/ProducrCard';
import SearchBar from '../components/searchBar';

const ListItems = () => {
  const [productData, setProductData] = useState<IProduct[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [inputValue, setInputValue] = useState("");
  const [selectBrand, setSelectBrand] = useState<string[]>([]);
  const navigate = useNavigate();

  const [debouncedValue] = useDebounce(searchQuery, 500);

  

  const handleDelete = (id: string | undefined) => {
    if (id) {
      const updatedData = productData.filter((product) => product.id !== id);
      setProductData(updatedData);
      localStorage.setItem("productData", JSON.stringify(updatedData));
    }
  };

  const handleNavigate = (id: string | undefined) => {
    navigate(`/listitems/product-details/${id}`);
  };

  const handleBrandChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const brand = e.target.name;
    setSelectBrand((prevSelectedBrands) =>
      prevSelectedBrands.includes(brand)
        ? prevSelectedBrands.filter((b) => b !== brand)
        : [...prevSelectedBrands, brand]
    );
  };

  const brands = Array.from(new Set(productData.map((product) => product.brand)));

  const filteredProducts = productData
    .filter((product) => product.title.toLowerCase().includes(searchQuery.toLowerCase()))
    .filter((product) => selectBrand.length === 0 || selectBrand.includes(product.brand));
    //console.log("Filtered Products:", filteredProducts);

    useEffect(() => {
      const storedData: IProduct[] = JSON.parse(localStorage.getItem("productData") || "[]");
      //console.log("Stored Data:", storedData);
      setProductData(storedData);
    }, []);
  
    useEffect(() => {
      if (debouncedValue) {
        setSearchQuery(debouncedValue);
        navigate(`?search=${debouncedValue}`);
      }
    }, [debouncedValue, navigate]);


  return (
    <Box style={{ padding: '20px' }}>
      <Button variant="contained" color="primary" style={{ marginBottom: '20px' }} onClick={() => navigate("/")}>
        Back
      </Button>

      <Typography variant='h2'>Product List</Typography>

      <SearchBar inputValue={inputValue} handleInputChange={(e) => setInputValue(e.target.value)} />

      <FormGroup>
        {brands.map((brand) => (
          <FormControlLabel
            key={brand}
            control={
              <Checkbox checked={selectBrand.includes(brand)} onChange={handleBrandChange} name={brand} />
            }
            label={brand}
          />
        ))}
      </FormGroup>

      {filteredProducts.length === 0 ? (
        <p>No products found.</p>
      ) : (
        filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} onDelete={handleDelete} onNavigate={handleNavigate} />
        ))
      )}
    </Box>
  );
};

export default ListItems;
