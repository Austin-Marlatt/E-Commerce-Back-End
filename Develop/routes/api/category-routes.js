// File that handles the routes at the `/api/categories` endpoint

// Express router used to route requests through our api
const router = require('express').Router();
// Import models to manipulate
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// Retruns all Categories, with the associated Products included
// Utilizes async => await for db querying
router.get('/', async (req, res) => {
  // try => catch used for error handling
  try {
    const categoryData = await Category.findAll({
      include: { model: Product },
    });
    // On a successful response, return the requested data
    res.status(200).json(categoryData);
  } catch (err) {
    // On a unsuccessful response, return a server error status with the cought error
    res.status(500).json(err);
  }
});

// Return a Category matching the id passed in the params, with the associated Products included
// Utilizes async => await for db querying
router.get('/:id', async (req, res) => {
  // try => catch used for error handling
  try {
    // Find by primary key, found in the req.params
    const categoryData = await Category.findByPk(req.params.id, {
      include: { model: Product },
    });
    // If not found, return server status not found, with a message
    if (!categoryData) {
      res.status(404).json({ message: 'No Category with this id!' });
      return;
    };
    // On a successful response, return the requested data
    res.status(200).json(categoryData);
  } catch (err) {
    // On a unsuccessful response, return a server error status with the cought error
    res.status(500).json(err);
  }
});

// Creates a new Category
// Utilizes async => await for db querying
router.post('/', async (req, res) => {
  // try => catch used for error handling
  try {
    // model.create method used with the request body passed
    // If formated correctly, it will return the newly created Category
    const newCategoryData = await Category.create(req.body);
    res.status(200).json(newCategoryData);
  } catch (err) {
    // On a unsuccessful response, return a bad request server status with the cought error
    res.status(400).json(err);
  }
});

// Updates a Category that matches the id passed in the params
router.put('/:id', async (req, res) => {
  // try => catch used for error handling
  try {
    // model.update method used with the request body passed
    //  If formatted correctly, it will return the newley created Category
    const updatedCategoryData = await Category.update(req.body, {
      // Defines the scope of the search
      // Attempt the update where the id matches the request parameters id
      where: {
        id: req.params.id,
      },
    });
    if (!updatedCategoryData) {
      res.status(404).json({ message: 'No Category with this id!' });
      return;
    };
    res.status(200).json(updatedCategoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Deletes a category that matches the id passed in the params
router.delete('/:id', async (req, res) => {
  // try => catch used for error handling
  try {
    // model.destroy method used to delete the category
    const destroyedCategoryData = await Category.destroy({
      // Defines the scope of the search
      // Attempt the update where the id matches the request parameters id
      where: {
        id: req.params.id,
      },
    });
    if (!destroyedCategoryData) {
      res.status(404).json({ message: 'No Category with this id!' });
      return;
    };
    res.status(200).json(destroyedCategoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// exports the module
module.exports = router;
