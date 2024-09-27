const request = require('supertest');
const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const app = express();
app.use(express.json());
const sequelize = new Sequelize({
dialect: 'sqlite',
storage: 'test-database.sqlite',
logging: false
});
const Product = sequelize.define('Product', {
name: DataTypes.STRING,
price: DataTypes.FLOAT,
stock: DataTypes.INTEGER
});
app.get('/products', async (req, res) => {
const products = await Product.findAll();
res.json(products);
});
app.post('/products', async (req, res) => {
const product = await Product.create(req.body);
res.json(product);
});
beforeAll(async () => {
await sequelize.sync({ force: true });
});
describe('Product API', () => {
it('should return an empty product list initially', async () => {
const res = await request(app).get('/products');
expect(res.body).toEqual([]);
});
it('should create a new product', async () => {
const res = await request(app).post('/products').send({
name: 'Product 1',
price: 100.0,
stock: 20
});
expect(res.body.name).toBe('Product 1');
});
});
