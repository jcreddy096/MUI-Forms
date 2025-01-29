
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, Button, FormGroup, FormControlLabel, Checkbox, Typography } from '@mui/material';
import { IProduct } from '../Schema/Schema';
import { useDebounce } from 'use-debounce';
import ProductCard from '../components/ProducrCard';
import SearchBar from '../components/SearchBar';

const ListItems = () => {
  const [productData, setProductData] = useState<IProduct[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [inputValue, setInputValue] = useState<string>("");
  const [selectBrand, setSelectBrand] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState<string>("");
  const navigate = useNavigate();
  const location = useLocation();
  const [debouncedValue] = useDebounce(inputValue, 500);

  useEffect(() => {
    const storedData: IProduct[] = JSON.parse(localStorage.getItem("productData") || "[]");
    setProductData(storedData);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get("search") || "";
    setSearchQuery(query);
    setInputValue(query);
    const brandParams = params.getAll("brand");
    setSelectBrand(brandParams);
    const sort = params.get("sort") || "";
    setSortOrder(sort);
  }, [location.search]);

  useEffect(() => {
    const params = new URLSearchParams();
    console.log(debouncedValue)
    if (debouncedValue) {
      params.set("search", debouncedValue);
    }
    selectBrand.forEach((brand) => {
      params.append("brand", brand);
    });
    if (sortOrder) {
      params.set("sort", sortOrder);
    }
    navigate({ search: params.toString() }, { replace: true });
  }, [debouncedValue, selectBrand, sortOrder, navigate]);

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
    setSelectBrand((prevSelectedBrands) => {
      const newSelectedBrands = prevSelectedBrands.includes(brand)
        ? prevSelectedBrands.filter((b) => b !== brand)
        : [...prevSelectedBrands, brand];

      return newSelectedBrands;
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
  };

  const handleSortChange = (order: string) => {
    setSortOrder(order);
  };

  const handleResetSorting = () => {
    setSortOrder("");
  };

  const brands = Array.from(new Set(productData.map((product) => product.brand)));

  const filteredProducts = productData
    .filter((product) => product.title.toLowerCase().includes(searchQuery.toLowerCase()))
    .filter((product) => selectBrand.length === 0 || selectBrand.includes(product.brand))
    .sort((a, b) => (sortOrder === "asc" ? a.mrp - b.mrp : sortOrder === "desc" ? b.mrp - a.mrp : 0));

  return (
    <Box sx={{ padding: 4 }}>
      <Button
        variant="contained"
        color="primary"
        sx={{ marginBottom: 2 }}
        onClick={() => navigate("/")}
      >
        Back
      </Button>

      <Typography variant='h2' sx={{ marginBottom: 3 }}>Product List</Typography>

      <SearchBar inputValue={inputValue} handleInputChange={handleInputChange} />

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

      <Box sx={{ marginBottom: 2, display: 'flex', gap: 5}}>
        <Button variant="contained"  onClick={() => handleSortChange('asc')}>Low to High</Button>
        <Button variant="contained" onClick={() => handleSortChange('desc')}>High to Low</Button>
        <Button variant="contained" onClick={handleResetSorting}>Reset</Button>
      </Box>

      {filteredProducts.length === 0 ? (
        <Typography>No products found matching your search.</Typography>
      ) : (
        filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} onDelete={handleDelete} onNavigate={handleNavigate} />
        ))
      )}
    </Box>
  );
};

export default ListItems;