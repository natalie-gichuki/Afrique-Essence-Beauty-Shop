import React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Chip,
  Box,
  IconButton,
  Badge,
  Tooltip,
  styled
} from '@mui/material';
import {
  ShoppingCart,
  Favorite,
  FavoriteBorder,
  Share,
  Bolt,
  RemoveRedEye
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext'; // Example cart context

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[6],
    '& .quick-view': {
      opacity: 1
    }
  },
  position: 'relative'
}));

const QuickViewButton = styled(Button)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  opacity: 0,
  transition: 'opacity 0.3s ease',
  backdropFilter: 'blur(2px)',
  backgroundColor: 'rgba(255,255,255,0.8)'
}));

const ProductsCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart(); // Cart context hook
  const [isWishlisted, setIsWishlisted] = React.useState(false);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image_url,
      quantity: 1
    });
  };

  const handleQuickView = (e) => {
    e.stopPropagation();
    navigate(`/products/${product.id}`);
  };

  return (
    <StyledCard elevation={2}>
      {/* Sale Badge */}
      {product.discount > 0 && (
        <Chip
          label={`${product.discount}% OFF`}
          color="error"
          size="small"
          sx={{ 
            position: 'absolute', 
            top: 10, 
            left: 10, 
            zIndex: 1 
          }}
        />
      )}

      {/* Quick View Overlay */}
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          height="240"
          image={product.image_url || '/placeholder-product.jpg'}
          alt={product.name}
          sx={{ 
            objectFit: 'contain',
            p: 2,
            bgcolor: '#f8f8f8'
          }}
        />
        <QuickViewButton
          variant="contained"
          size="small"
          className="quick-view"
          startIcon={<RemoveRedEye />}
          onClick={handleQuickView}
        >
          Quick View
        </QuickViewButton>
      </Box>

      <CardContent sx={{ flexGrow: 1, p: 2 }}>
        {/* Category & Stock Status */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Chip
            label={product.category}
            size="small"
            variant="outlined"
          />
          <Typography variant="caption" color={product.stock > 0 ? 'success.main' : 'error'}>
            {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
          </Typography>
        </Box>

        {/* Product Title */}
        <Typography 
          gutterBottom 
          variant="subtitle1" 
          component="h3"
          sx={{ 
            fontWeight: 600,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}
        >
          {product.name}
        </Typography>

        {/* Price Section */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          {product.discount > 0 ? (
            <>
              <Typography variant="h6" color="primary">
                ${(product.price * (1 - product.discount/100)).toFixed(2)}
              </Typography>
              <Typography variant="body2" color="text.disabled" sx={{ textDecoration: 'line-through' }}>
                ${product.price.toFixed(2)}
              </Typography>
            </>
          ) : (
            <Typography variant="h6" color="primary">
              ${product.price.toFixed(2)}
            </Typography>
          )}
        </Box>

        {/* Shipping Info */}
        {product.freeShipping && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1 }}>
            <Bolt color="secondary" fontSize="small" />
            <Typography variant="caption" color="text.secondary">
              Free shipping
            </Typography>
          </Box>
        )}

        {/* Rating */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Badge 
            badgeContent={product.rating} 
            color="primary" 
            sx={{ '& .MuiBadge-badge': { right: -3, top: 8 } }}
          />
          <Typography variant="caption" color="text.secondary">
            ({product.reviewCount || 0} reviews)
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ p: 2, pt: 0, justifyContent: 'space-between' }}>
        <Button
          size="small"
          variant="contained"
          startIcon={<ShoppingCart />}
          onClick={handleAddToCart}
          disabled={product.stock <= 0}
          fullWidth
          sx={{ mr: 1 }}
        >
          Add to Cart
        </Button>

        <Box sx={{ display: 'flex' }}>
          <Tooltip title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}>
            <IconButton 
              size="small" 
              onClick={() => setIsWishlisted(!isWishlisted)}
              color={isWishlisted ? 'error' : 'default'}
            >
              {isWishlisted ? <Favorite /> : <FavoriteBorder />}
            </IconButton>
          </Tooltip>
          <Tooltip title="Share">
            <IconButton size="small">
              <Share fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      </CardActions>
    </StyledCard>
  );
};

export default ProductsCard;