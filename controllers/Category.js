const { Op } = require("sequelize");
const Category = require("../models/Category");

const getCategories = async (req, res) => {
  const name = req.query.name || "";
  try {
    const condition = name ? { name: { [Op.iLike]: `%${name}%` } } : null; '%er%'
    const categories = await Category.findAll({
      where: condition,
      attributes: ["id", "name"],      
    });
    res.status(200).json({
      categories: categories,
      total_categories: categories.length,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getCategoryById = async (req, res) => {
  try {
    const response = await Category.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.json(response);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const createCategory = async (req, res) => {
  const name = req.body.name;
  try {
    const category = await Category.create({ name: name });
    res.status(201).json({
      message: "Category Created Successfuly",
      data: category,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateCategory = async (req, res) => {
  const category = await Category.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!category) return res.status(404).json({ message: "No Data Found" });

  const name = req.body.name;

  try {
    await Category.update(
      { name: name },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(201).json({ message: "Category Updated Successfuly" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteCategory = async (req, res) => {
  const category = await Category.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!category) return res.status(404).json({ message: "No Data Found" });

  try {
    await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ message: "Category Deleted Successfuly" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
