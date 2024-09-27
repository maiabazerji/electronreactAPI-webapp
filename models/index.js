const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const app = express();
const port = 3000;
const sequelize = new Sequelize({
dialect: 'sqlite',
storage: 'database.sqlite'
});
const Product = sequelize.define('Product', {
name: DataTypes.STRING,
price: DataTypes.FLOAT,
stock: DataTypes.INTEGER
});
app.use(express.json());
app.get('/products', async (req, res) => {
const products = await Product.findAll();
res.json(products);
});
app.post('/products', async (req, res) => {
const product = await Product.create(req.body);
res.json(product);
});
sequelize.sync().then(() => {
app.listen(port, () => {
console.log(`Server running on http://localhost:${port}`);
});
});
