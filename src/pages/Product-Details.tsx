
import  { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Button, Card, CardContent, Typography } from '@mui/material';
import ProductDetailsText from '../components/ProductDetailsText';
import { IProduct } from '../Schema/Schema';

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<IProduct | null>(null);

  useEffect(() => {
    const storedData: IProduct[] = JSON.parse(localStorage.getItem("productData") || "[]");
    const foundProduct = storedData.find((product) => product.id === id);
    setProduct(foundProduct || null);
  }, [id]);

  if (!product) {
    return (
      <Box style={{ padding: '20px' }}>
        <Button variant="contained" color="primary" style={{ marginBottom: '20px' }} onClick={() => navigate(-1)}>
          Back
        </Button>
        <Typography variant="h4">Product not found</Typography>
        </Box>
      );
  }

  return (
    <Box style={{ padding: '20px' }}>
      <Button variant="contained" color="primary" style={{ marginBottom: '20px' }} onClick={() => navigate(-1)}>
        Back
      </Button>

      <Card style={{ margin: '20px', padding: '20px' }}>
        <CardContent>
          <Typography variant="h4">{product.title}</Typography>
          <ProductDetailsText product={product} />
        </CardContent>
      </Card>
    </Box>
  );
};

export default ProductDetails;
