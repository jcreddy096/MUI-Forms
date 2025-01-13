import { z } from 'zod';

export const productSchema = z.object({
    id:z.string().uuid().optional(),
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
 export default productSchema