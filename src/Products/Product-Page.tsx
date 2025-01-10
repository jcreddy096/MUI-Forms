
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
    console.log(data);
    alert("Data added successfully");
    navigate("/Listitems");
  };

  return (
    <div className="page-layout">
      <h1>Please add your Product details</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <div className="input-group">
          <TextField
            label="Title"
            {...register("title")}
            error={!!errors.title}
            helperText={errors.title ? errors.title.message : ""}
            fullWidth
          />
        </div> <br />
      
        <div className="input-group">
          <TextField
            label="Description"
            multiline
            rows={2}
            {...register("description")}
            error={!!errors.description}
            helperText={errors.description ? errors.description.message : ""}
            fullWidth
          />
        </div> <br />

        <div className="input-group">
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
        </div> <br />

        <div className="input-group">
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
        </div> <br />

        <div className="input-group">
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
        </div> <br />

        <div className="input-group"> 
            <FormLabel>Rating</FormLabel> 
            <Controller 
            name="rating" 
            control={control} 
            render={({ field: { value, onChange, ...field } }) => (
                 <Rating {...field} 
                 value={value ?? 0} 
                 onChange={(_, newValue) => onChange(newValue != null ? parseFloat(newValue.toString()) : 0)} 
                 precision={0.5} /> )} 
            /> 
            {errors.rating && <FormHelperText error>{errors.rating.message}</FormHelperText>} 
            </div> <br />

        <div className="input-group">
          <TextField
            label="Review"
            multiline
            rows={2}
            {...register("review")}
            error={!!errors.review}
            helperText={errors.review ? errors.review.message : ""}
            fullWidth
          />
        </div> <br />

        <div className="input-group">
          <Button type="submit" variant="contained" fullWidth>
            Add
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProductPage;
