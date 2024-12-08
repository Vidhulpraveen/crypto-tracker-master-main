const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/crypto', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define a schema
const coinSchema = new mongoose.Schema({
  id: String,
  name: String,
  symbol: String,
  current_price: Number,
  market_cap: Number,
  total_volume: Number,
  image: String,
  price_change_percentage_24h: Number,
});

const Coin = mongoose.model('Coin', coinSchema);

// Endpoint to store data
app.post('/coins', async (req, res) => {
  try {
    await Coin.insertMany(req.body); // Stores array of coins
    res.status(201).send('Data saved to the database.');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Endpoint to retrieve data
app.get('/coins', async (req, res) => {
  try {
    const coins = await Coin.find();
    res.status(200).json(coins);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Start the server
app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
