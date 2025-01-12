
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
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
  Typography
} from '@mui/material';

const schema = z.object({
  title: z.string().min(16, { message: "Title must be at least 16 characters" }),
  description: z.string().min(30, { message: "Description must be at least 30 characters" }),
  price: z.number({ invalid_type_error: "Price must be a number" }).positive({ message: "Price must be a positive number" }),
  mrp: z.number({ invalid_type_error: "MRP must be a number" }).positive({ message: "MRP must be a positive number" }),
  status: z.string().min(1, { message: "Status is required" }),
  rating: z.number().min(0).max(5, { message: "Rating must be between 0 and 5" }),
  review: z.string().min(10, { message: "Review must be at least 10 characters" }),
}).refine((data) => data.price < data.mrp, {
  message: "Price must be less than MRP",
  path: ["price"],
});

type IFormValues = z.infer<typeof schema>;

const ProductPage: React.FC = () => {
  const { register, control, handleSubmit, formState: { errors } } = useForm<IFormValues>({
    resolver: zodResolver(schema),
  });

  const navigate = useNavigate();

  const onSubmit = (data: IFormValues) => {
    const existingData = JSON.parse(localStorage.getItem("productData") || "[]");

    const updatedData = [...existingData, data];

    localStorage.setItem("productData", JSON.stringify(updatedData));

    alert("Data added successfully");
    navigate("/Listitems", { state: { productData: updatedData } });
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

