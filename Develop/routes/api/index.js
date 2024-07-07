// Acts as a middleman for server requests

// require router function from express module
const router = require('express').Router();

// Required references to the JS files that house the logic for the different request endpoints
const categoryRoutes = require('./category-routes');
const productRoutes = require('./product-routes');
const tagRoutes = require('./tag-routes');

// Routes the endpoints to the correct files
router.use('/categories', categoryRoutes);
router.use('/products', productRoutes);
router.use('/tags', tagRoutes);

// Export the router
module.exports = router;
