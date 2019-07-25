const express = require('express');
const connectDB = require('./config/db');
const path = require("path")

const app = express();
const users = require("./routes/api/users");
const auth = require("./routes/api/auth");
const asset = require("./routes/api/asset");

connectDB();

app.use(express.json({ extended: false }));



app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/asset', asset);


if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

