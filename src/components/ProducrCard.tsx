import { Card, CardContent, Button, Typography } from '@mui/material';
import { IProduct } from '../Schema/Schema';

type ProductCardProps = {
  product: IProduct;
  onDelete: (id: string | undefined) => void;
  onNavigate: (id: string | undefined) => void;
}

const ProductCard = ({ product, onDelete, onNavigate }:ProductCardProps) => {
  return (
    <Card sx={{ marginBottom: '20px', cursor: 'pointer', position: 'relative' }} onClick={() => onNavigate(product.id)}>
      <CardContent>
        <Typography variant="h6">{product.title}</Typography>
        <Typography>Description: {product.description}</Typography>
        <Typography>Price: ₹{product.price}</Typography>
        <Typography>MRP: ₹{product.mrp}</Typography>
        <Typography>Status: {product.status}</Typography>
        <Typography>Rating: {product.rating} Stars</Typography>
        <Typography>Review: {product.review}</Typography>
      </CardContent>
      <Button
        variant="outlined"
        color="error"
        sx={{ position: 'absolute', top: '10px', right: '10px' }}
        onClick={(e) => {
          e.stopPropagation();
          onDelete(product.id);
        }}
      >
        Delete
      </Button>
    </Card>
  );
};

export default ProductCard;
