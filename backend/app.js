const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json()); // Middleware to parse JSON bodies

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Define a schema and model
const itemSchema = new mongoose.Schema({
    name: String,
    value: Number
});
const Item = mongoose.model('Item', itemSchema);

// Endpoint to retrieve all items
app.get('/api/items', async (req, res) => {
    try {
        const items = await Item.find();
        res.json(items);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Endpoint to insert a new item
app.post('/api/items', async (req, res) => {
    const { name, value } = req.body;
    try {
        if (!name || value === undefined) {
            return res.status(400).json({ error: 'Name and value are required' });
        }

        const newItem = new Item({ name, value });
        await newItem.save();
        res.status(201).json(newItem);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

app.get('/', (req, res) => res.send('API is running...'));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));

