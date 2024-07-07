// Model that defines the category entries into the database

// Required models from sequelize
  // `Model` is an empty set we can inport and create a new instance of for our specific use
  // `DataType`s is an object defined in the `sequels` module, It stores the definitions of the types of data that can be used in a sequelize Database
    // By envoking `DataTypes` as a `type` inside of a Column, we can define the `type` of data this Column excepts
const { Model, DataTypes } = require('sequelize');

// Inport the connecting to the db defined in the connection file
const sequelize = require('../config/connection.js');

// Declare a new class, `Category`, that extends the sequelize model inported
class Category extends Model {}

// Initialize the new class and define the Columns
Category.init(
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
      autoIncrement: true
    },
    // Name of Column: `category_name`
    category_name: {
      // Type of data will be a string
      type: DataTypes.STRING,
      // Cannot be left empty
      allowNull: false
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
    modelName: 'category',
  }
);

// Export the Model
module.exports = Category;
