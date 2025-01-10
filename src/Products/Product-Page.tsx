
// import React from 'react';
// import { useForm, Controller } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { z } from 'zod';
// import { useNavigate } from 'react-router-dom';
// import { Button,
//          FormControl, 
//          FormControlLabel, 
//          FormLabel, 
//          InputAdornment, 
//          InputLabel, 
//          OutlinedInput, 
//          Radio, 
//          RadioGroup, 
//          Rating, 
//          TextField,
//         FormHelperText } from '@mui/material';
        


// const schema = z.object({
//   title: z.string().min(16,{message: "Title must be 16 characters required"}),
//   description: z.string().min(30,{message: "Description must be 30 characters required"}),
//   price: z.number().positive({message: "Price must be a possitive number"}),
//   mrp: z.number().positive({message:"MRP must be a possitive number"}),
//   status: z. string().min(1,{message: "Status is required"}),
//   rating: z.number().min(0).max(5,{message: "Rating must be between 0 and 5"}),
//   review: z.string(). min(10,{message: "Review must be 10 characters required"}),

// });

//  .refine((data) => data.price < data.mrp, {
//     message: 'Price must be less than MRP',
//     path: ['price'],
//   });

// type IFormValues = z.infer<typeof schema>;

// const ProductPage: React.FC = () => {
//   const { register, control, handleSubmit, formState: { errors} } = useForm<IFormValues>({
//     resolver: zodResolver(schema),
//   });

//   const navigate = useNavigate();

//   const onSubmit = (data: IFormValues) => {
//     console.log(data);
//     alert('Data added successfully');
//     navigate('/Listitems'); 
//   };

//   return (
//     <div className="page-layout">
//         <h1>Please add your Product details</h1>
          
//      <form onSubmit={handleSubmit(onSubmit)} className="form">
//          <div className="input-group">
//           <TextField
//             required
//             id="outlined-required"
//             label="Title"
//             {...register("title")}
//             error={!!errors.title}
//             helperText={errors.title ? errors.title.message : ""}
//            />
//         </div> 

//         <div>
//           <TextField
//            id="outlined-multiline-static"
//            label="Discrption"
//            multiline
//            rows={2}
//            {...register("description")}
//             error={!!errors.description}
//             helperText={errors.description ? errors.description.message : ""}
//            />
//         </div>

//         <div>
//          <FormControl fullWidth>
//           <InputLabel htmlFor="Price">Price</InputLabel>
//           <OutlinedInput
//             id="Price"
//             startAdornment={<InputAdornment position="start">₹</InputAdornment>}
//             type="number"
//             {...register("price", {valueAsNumber: true})}
//             error={!!errors.price}
//             />
//             {errors.price && <FormHelperText error >{errors.price.message}</FormHelperText>}
//           </FormControl>
//         </div>

//         <div>
//          <FormControl fullWidth>
//           <InputLabel htmlFor="mrp">MRP</InputLabel>
//           <OutlinedInput
//             id="mrp"
//             startAdornment={<InputAdornment position="start">₹</InputAdornment>}
//             type="number"
//             {...register("mrp", {valueAsNumber: true})}
//             error={!!errors.mrp}
//             />
//             {errors.mrp && <FormHelperText error >{errors.mrp.message}</FormHelperText>}
//          </FormControl>
//         </div>

//         <div> 
//          <FormLabel>Status</FormLabel> 
//          <Controller 
//          name="status" 
//          control={control} 
//          render={({ field }) => ( 
//            <RadioGroup row aria-labelledby="status-label" {...field}>
//                  <FormControlLabel value="active" control={<Radio />} label="active" />
//                  <FormControlLabel value="inavtive" control={<Radio />} label="inactive" />
//              </RadioGroup>
//             )}
//          />
//            {errors.status && <FormHelperText error>{errors.status.message}</FormHelperText>} 
//         </div>

//         <div>
         
//         </div>
//         FormLabel>Rating</FormLabel>
//          <Controller
//           name="rating"
//           control={control}
//           render={({ field }) => (
//             <Rating {...field} precision={0.5} value={field.value || 0} />
//             )}
//          />
//            {errors.rating && <FormHelperText error>{errors.rating.message}</FormHelperText>}
//         <div>
//          <TextField
//            id="outlined-multiline-static"
//            label="Review"
//            multiline
//            rows={2}
//            {...register("review")}
//             error={!!errors.review}
//             helperText={errors.review ? errors.review.message : ""}
//             defaultValue=""
//            />
//         </div>

//         <div>
//         <Button type="submit" variant="contained">Add</Button>  
//         </div>        

//      </form>

          
//     </div>
      
    
//   );
// };

// export default ProductPage;



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

// Validation schema
const schema = z
  .object({
    title: z.string().min(16, { message: "Title must be at least 16 characters" }),
    description: z.string().min(30, { message: "Description must be at least 30 characters" }),
    price: z.number({ invalid_type_error: "Price must be a number" }).positive({ message: "Price must be a positive number" }),
    mrp: z.number({ invalid_type_error: "MRP must be a number" }).positive({ message: "MRP must be a positive number" }),
    status: z.string().min(1, { message: "Status is required" }),
    rating: z.number().min(0).max(5, { message: "Rating must be between 0 and 5" }),
    review: z.string().min(10, { message: "Review must be at least 10 characters" }),
  })
  .refine((data) => data.price < data.mrp, {
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
            helperText={errors.title?.message || ""}
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
            helperText={errors.description?.message || ""}
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
            render={({ field }) => (
              <Rating {...field} precision={0.5} value={field.value ? Number(field.value) :  0} />
            )}
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
            helperText={errors.review?.message || ""}
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
