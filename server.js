const express = require('express');
const connectDB = require('./config/db');

const app = express();
const users = require("./routes/api/users");

connectDB();

app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('Api Running'));

app.use('/api/users', users);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));