import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById } from '../services/productService';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Chip,
  Divider,
  CircularProgress,
  Alert,
  Stack
} from '@mui/material';
import { Edit, Delete, ArrowBack } from '@mui/icons-material';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await getProductById(id);
        setProduct(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await productService.deleteProduct(id);
        navigate('/products');
      } catch (err) {
        setError(err.message);
      }
    }
  };

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;
  if (!product) return <Alert severity="warning">Product not found</Alert>;

  return (
    <Box sx={{ p: 3 }}>
      <Button
        startIcon={<ArrowBack />}
        onClick={() => navigate('/products')}
        sx={{ mb: 2 }}
      >
        Back to Products
      </Button>
      
      <Card>
        <Grid container>
          <Grid item xs={12} md={6}>
            <CardMedia
              component="img"
              height="400"
              image={product.image_url || 'https://via.placeholder.com/400'}
              alt={product.name}
              sx={{ objectFit: 'contain', p: 2 }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <CardContent>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="h4" component="h1" gutterBottom>
                  {product.name}
                </Typography>
                <Chip label={product.category} color="primary" />
              </Stack>
              
              <Typography variant="h5" color="text.secondary" gutterBottom>
                ${product.price.toFixed(2)}
              </Typography>
              
              <Divider sx={{ my: 2 }} />
              
              <Typography variant="body1" paragraph>
                {product.description || 'No description available.'}
              </Typography>
              
              <Box sx={{ display: 'flex', gap: 2, mt: 4 }}>
                <Button
                  variant="contained"
                  startIcon={<Edit />}
                  onClick={() => navigate(`/products/${product.id}/edit`)}
                >
                  Edit
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<Delete />}
                  onClick={handleDelete}
                >
                  Delete
                </Button>
              </Box>
              
              {product.stock !== undefined && (
                <Typography variant="body2" sx={{ mt: 2 }}>
                  <strong>Stock:</strong> {product.stock}
                </Typography>
              )}
              
              {product.views !== undefined && (
                <Typography variant="body2">
                  <strong>Views:</strong> {product.views}
                </Typography>
              )}
            </CardContent>
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
};

export default ProductDetails;