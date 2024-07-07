// This file defines the relationships between the models in the db, and 

// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Creates an association between `Product` and `Category`
Product.belongsTo(Category, {
  // Adds a reference to `Category` on the `Product` model
  foreignKey: 'category_id',
    // Defines delete behavior, When a category is deleted, related Products will be removed as well
  onDelete: 'CASCADE',
});

// Defines the association between `Category` and `Products`. A single Category can contain many Products
Category.hasMany(Product, {
  foreignKey: 'category_id',
});

// Many Products can belong to a Tag
Product.belongsToMany(Tag, {
  // Junction Table, is used to store the foreign keys of the two associated models
  through: ProductTag,
  foreignKey: 'product_id',
});

// Many Tags can belong to a Product
Tag.belongsToMany(Product, {
  // Junction Table, is used to store the foreign keys of the two associated models
  through: ProductTag,
  foreignKey: 'tag_id',
});

// Export the models with their new relations
module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
