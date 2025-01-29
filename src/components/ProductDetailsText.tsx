import { Typography } from '@mui/material';
import { IProduct } from '../Schema/Schema';

type ProductDetailsTextProps = {
  product: IProduct;
}

const ProductDetailsText = ({ product }: ProductDetailsTextProps) => {
  return (
    <Typography>
      Description: {product.description} 
      Price: ₹{product.price} 
      MRP: ₹{product.mrp} 
      Status: {product.status} 
      Rating: {product.rating} Stars
      Review: {product.review}
    </Typography>
  );
};

export default ProductDetailsText;
