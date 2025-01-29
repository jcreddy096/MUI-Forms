import  { useEffect, useState } from 'react';
import { Box, Button, Typography, FormControl, InputLabel, Select, MenuItem, FormHelperText, OutlinedInput, InputAdornment, RadioGroup, Radio, Rating, FormLabel, TextField, FormControlLabel } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { IProduct, productSchema } from '../Schema/Schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useProductStore} from  '../store/ProductStore';

const ProductPage = () => {
  // const [productData, setProductData] = useState<IProduct[]>([]);
  // const [savedBrand, setSavedBrand] = useState<string>('');
  const navigate = useNavigate();

  const { formData, setFormData, resetForm} = useProductStore();
  const [savedBrand, setSavedBrand] = useState<string>(formData.brand);

  const { register, handleSubmit, control, setValue, formState: { errors } } = useForm<IProduct>({
    resolver: zodResolver(productSchema),
  });

  
  // const onSubmit = (data: IProduct) => {
  //   const newProduct = { ...data, id: crypto.randomUUID() };
  //   const updatedProductData = [...productData, newProduct];
  //   setProductData(updatedProductData);
  //   localStorage.setItem("productData", JSON.stringify(updatedProductData));
  //   toast.success("Product added successfully!");
  //   navigate("/list-items"); 
  // };

  const onSubmit = (data: IProduct) => {
    const newProduct = { ...data, id: crypto.randomUUID() };

    const storedData: IProduct[] = JSON.parse(localStorage.getItem("productData") || "[]");
    storedData.push(newProduct);
    localStorage.setItem("productData", JSON.stringify(storedData));

    setFormData(newProduct)
    resetForm();
    toast.success("Product added successfully!");
    navigate("/list-items");

  }


  // useEffect(() => {
  //   const storedBrand = localStorage.getItem('brand');
  //   if (storedBrand) {
  //     setSavedBrand(storedBrand);
  //     setValue('brand', storedBrand);
  //   }

  //   const storedData: IProduct[] = JSON.parse(localStorage.getItem("productData") || "[]");
  //   setProductData(storedData);
  // }, [setValue]);


  useEffect(() => {
    Object.keys(formData).forEach(key => {
      setValue(key as keyof IProduct, formData[key as keyof IProduct]);
    });
  },[formData,setValue]);
  

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h2" sx={{ marginBottom: 3 }}>Add Product</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ marginBottom: 2 }}>
          <TextField
            label="Title"
            {...register("title")}
            error={!!errors.title}
            helperText={errors.title ? errors.title.message : ""}
            fullWidth
          />
        </Box>

        <Box sx={{ marginBottom: 2 }}>
          <TextField
            label="Description"
            multiline
            rows={2}
            {...register("description")}
            error={!!errors.description}
            helperText={errors.description ? errors.description.message : ""}
            fullWidth
          />
        </Box>

        <Box sx={{ marginBottom: 2 }}>
          <FormControl fullWidth>
            <InputLabel>Brand</InputLabel>
            <Select
              {...register('brand')}
              value={savedBrand}
              label="Brand"
              error={!!errors.brand}
              onChange={(e) => {
                const brand = e.target.value;
                setSavedBrand(brand);  
                localStorage.setItem('brand', brand); 
              }}
            >
              <MenuItem value="">Select the brand</MenuItem>
              <MenuItem value="Apple">Apple</MenuItem>
              <MenuItem value="Xiomi">Xiomi</MenuItem>
              <MenuItem value="Realme">Realme</MenuItem>
            </Select>
            {errors.brand && <FormHelperText error>{errors.brand.message}</FormHelperText>}
          </FormControl>
        </Box>

        <Box sx={{ marginBottom: 2 }}>
          <FormControl fullWidth>
            <InputLabel htmlFor="price">Price</InputLabel>
            <OutlinedInput
              id="price"
              startAdornment={<InputAdornment position="start">₹</InputAdornment>}
              type="number"
              {...register("price", { valueAsNumber: true })}
              error={!!errors.price}
            />
            {errors.price && <FormHelperText error>{errors.price.message}</FormHelperText>}
          </FormControl>
        </Box>

        <Box sx={{ marginBottom: 2 }}>
          <FormControl fullWidth>
            <InputLabel htmlFor="mrp">MRP</InputLabel>
            <OutlinedInput
              id="mrp"
              startAdornment={<InputAdornment position="start">₹</InputAdornment>}
              type="number"
              {...register("mrp", { valueAsNumber: true })}
              error={!!errors.mrp}
            />
            {errors.mrp && <FormHelperText error>{errors.mrp.message}</FormHelperText>}
          </FormControl>
        </Box>

        <Box sx={{ marginBottom: 2 }}>
          <FormLabel>Status</FormLabel>
          <Controller
            name="status"
            control={control}
            defaultValue="active"
            render={({ field }) => (
              <RadioGroup row {...field}>
                <FormControlLabel value="active" control={<Radio />} label="Active" />
                <FormControlLabel value="inactive" control={<Radio />} label="Inactive" />
              </RadioGroup>
            )}
          />
          {errors.status && <FormHelperText error>{errors.status.message}</FormHelperText>}
        </Box>

        <Box sx={{ marginBottom: 2 }}>
          <FormLabel>Rating</FormLabel>
          <Controller
            name="rating"
            control={control}
            render={({ field: { value, onChange, ...field } }) => (
              <Rating
                {...field}
                value={value ?? 0}
                onChange={(_, newValue) => onChange(newValue != null ? parseFloat(newValue.toString()) : 0)}
                precision={0.5}
              />
            )}
          />
          {errors.rating && <FormHelperText error>{errors.rating.message}</FormHelperText>}
        </Box>

        <Box sx={{ marginBottom: 2 }}>
          <TextField
            label="Review"
            multiline
            rows={2}
            {...register("review")}
            error={!!errors.review}
            helperText={errors.review ? errors.review.message : ""}
            fullWidth
          />
        </Box>

        <Box sx={{ marginBottom: 2 }}>
          <Button type="submit" variant="contained" fullWidth>
            Add
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default ProductPage;
