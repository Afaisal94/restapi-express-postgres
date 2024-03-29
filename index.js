require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require('morgan');
const FileUpload = require('express-fileupload');
const PORT = process.env.NODE_DOCKER_PORT || 5000;

// Middleware
app.use(morgan('dev'));
app.use(FileUpload());
app.use(express.static("public"));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Import Routes
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");

app.use("/categories", categoryRoutes);
app.use("/products", productRoutes);

app.get("/", (req, res) => {
  res.send("REST API - EXPRESS JS & POSTGRES USING SEQUELIZE");
});
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

module.exports = app;
