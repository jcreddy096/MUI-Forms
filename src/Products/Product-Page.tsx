
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { productSchema } from './Schema';
import {v4 as uuidv4} from 'uuid';
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Radio,
  RadioGroup,
  Rating,
  TextField,
  FormHelperText,
  Box,
  Typography,
  Select,
  MenuItem
} from '@mui/material';
import { useState } from 'react';

type IFormValues = Omit<z.infer<typeof productSchema>, 'id'>;

const ProductPage = () => {
  const [savedBrand, setSavedBrand] = useState<string>('');

  const { register, control, handleSubmit, formState: { errors } } = useForm<IFormValues>({
    resolver: zodResolver(productSchema),
  });

  const navigate = useNavigate();

  const onSubmit = (data: IFormValues) => {
    const existingData = JSON.parse(localStorage.getItem("productData") || "[]") || [];
    const newProduct = { ...data, id: uuidv4(), brand: savedBrand };
    const updatedData = [...existingData, newProduct];

    localStorage.setItem("productData", JSON.stringify(updatedData));
    
    alert("Data added successfully");
    navigate("/list-items", { state: { productData: updatedData } });
  };
  

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" sx={{ marginBottom: 3 }}>
        Please add your Product details
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ marginBottom: 2 }}>
          <TextField
            label="Title"
            {...register("title")}
            error={!!errors.title}
            helperText={errors.title ? errors.title.message : ""}
            fullWidth
            sx={{ marginBottom: 2 }}
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
              <MenuItem key ="Select-Brand" value="">Select the brand</MenuItem>
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
              sx={{ marginBottom: 2 }}
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
              sx={{ marginBottom: 2 }}
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
                sx={{ marginBottom: 2 }}
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
