// Model that defines the Product entries into the database

// Required models from sequelize
  // `Model` is an empty set we can inport and create a new instance of for our specific use
  // `DataType`s is an object defined in the `sequels` module, It stores the definitions of the types of data that can be used in a sequelize Database
    // By envoking `DataTypes` as a `type` inside of a Column, we can define the `type` of data this Column excepts
const { Model, DataTypes } = require('sequelize');

// import our database connection from config.js
const sequelize = require('../config/connection');

// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model {}

// set up fields and rules for Product model
Product.init(
  {
    // Name of Column: `id`
    id: {
      // Type of data will be an number
      type: DataTypes.INTEGER,
      // Cannot be left empty
      allowNull: false,
      // Use this id as the primary key to be referenced by other models in the database
      primaryKey: true,
      // Each new instance of this integer will be of the next higher value
      autoIncrement: true,
    },
    // Name of Column: `product_name`
    product_name: {
      // Type of data will be a string
      type: DataTypes.STRING,
      // Cannot be left empty
      allowNull: false,
    },
    // Name of Column: `price`
    price: {
      // Type of data will be number that can except decimals
      // this is inportant to handle a price that is not a whole number (ex: $19.99)
      type: DataTypes.DECIMAL,
      // Cannot be left empty
      allowNull: false,
      // Validate property with parameters passed in
      validate: {
        // Validates that the passed entry matches the defined datatype
        isDecimal: true,
      },
    },
    // Name of Column: `stock`
    stock: {
      // Type of data will be a number
      type: DataTypes.INTEGER,
      // Cannot be left empty
      allowNull: false,
      // If no value passed, the default will be used
      defaultValue: 10,
      // Validate property with parameters passed in
      validate: {
        // Validates that the passed entry matches the defined datatype
        isNumeric: true,
      },
    },
    // Name of Column: `stock`
    category_id: {
      // Type of data will be a number
      type: DataTypes.INTEGER,
      // Cannot be left empty
      allowNull: true,
      // An Object with reference parameters
      references: {
        // referenced model name
        model: 'category',
        // The column of the foreign table that this column references
        key: 'id',
      },
    },
  },
  {
    // Sequlize connection
    sequelize,
    // Do not record timestamps on entries to the database with this model
    timestamps: false,
    // Keep the defined name and do not switch to 'Categories'
    freezeTableName: true,
    // Converts cameCased Columns to underscorded
    underscored: true,
    // Name of the model, now the uppercase `Category` references the class, while the lowercased `category` references the model
    modelName: 'product',
  }
);

// Export the Model
module.exports = Product;
