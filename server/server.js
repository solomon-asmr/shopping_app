const express = require('express');
const mongojs = require("mongojs");
const multer = require('multer');
const path = require('path');
const bodyParser = require('body-parser');

const db = mongojs(
  'mongodb+srv://selemonasmr7:8gpqrGlnLQCOZ3m5@cluster0.b324n.mongodb.net/shoe_store',
  ['solomon']
);
//If you use your own local mongodb server:
// const db = mongojs(
//     'mongodb://127.0.0.1:27017/shoe_store',
//     ['solomon']
// );

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the "uploads" directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(express.static('static'));

// Configure multer for image storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Ensure this directory exists
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Save the file with a timestamp and original extension
  }
});

const upload = multer({ storage: storage });

// GET request to retrieve the products or items from db
app.get('/products', (req, res) => {
  db.solomon.find({ Type: 'item' }, (err, products) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to retrieve products.' });
    }
    res.status(200).json(products);
  });
});

// POST request to handle product creation
app.post('/upload', upload.single('image'), (req, res) => {
  const { productName, description, price } = req.body;

  if (!productName || !description || !price || !req.file) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  const imageUrl = `/uploads/${req.file.filename}`;
  const Type = 'item';
  const newProduct = { Type, productName, description, price: parseFloat(price), imageUrl };

  db.solomon.insert(newProduct, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to create product.' });
    }
    res.status(201).json({ message: 'Product created successfully!', product: result });
  });
});

// POST request to handle order creation
app.post('/api/orders', (req, res) => {
  const { name, email, phone, address, cart, totalPrice, deliveryCharge, date } = req.body;

  // Validate the input
  if (!name || !email || !phone || !address || !cart || !totalPrice || !date) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  const orderId = Date.now().toString(36) + Math.random().toString(36).slice(2, 11);

  const order = {
    orderId,
    name,
    email,
    phone,
    address,
    cart,
    totalPrice,
    deliveryCharge,
    date,
  };

  db.solomon.insert(order, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to place order.' });
    }
    res.status(201).json({ message: 'Order placed successfully!', orderId });
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
