import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import InputField from '../components/InputField';
import SelectField from '../components/SelectField';
import { SelectChangeEvent } from '@mui/material';

const ProductPage = () => {
  const [productData, setProductData] = useState({
    title: '',
    description: '',
    status: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProductData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (e: SelectChangeEvent<string>) => {  
    const { value } = e.target;
    setProductData((prev) => ({ ...prev, status: value }));
  };

  const handleSubmit = () => {
    if (!productData.title || !productData.description || !productData.status) {
      setErrors({
        title: 'Title is required',
        description: 'Description is required',
        status: 'Status is required',
      });
    } else {
      console.log('Product Data Submitted:', productData);
    }
  };

  return (
    <Box sx={{ padding: '20px' }}>
      <Typography variant="h4">Add Product</Typography>

      <InputField
        label="Title"
        value={productData.title}
        onChange={handleChange}
        name="title"
        error={Boolean(errors.title)}
        helperText={errors.title} variant={'outlined'}      />

      <InputField
        label="Description"
        value={productData.description}
        onChange={handleChange}
        name="description"
        error={Boolean(errors.description)}
        helperText={errors.description} variant={'outlined'}      />

      <SelectField
        label="Status"
        value={productData.status}
        options={['Available', 'Out of Stock']}
        onChange={handleSelectChange}  
        error={Boolean(errors.status)}
        helperText={errors.status}
      />

      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Submit
      </Button>
    </Box>
  );
};

export default ProductPage;
