const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const config = require('config');

const items = require('./routes/api/items');
const users = require('./routes/api/users');
const auth = require('./routes/api/auth');

const app = express();

// bodyParser middleware

app.use(express.json());

// DB Config

const db = config.get('mongoURI');

// Connect to MongoDB

mongoose.connect(db, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true})
    .then(() => console.log('MongoDB connection established successfully!'))
    .catch(err => console.log(err));

// Use Routes

app.use('/api/items', items);
app.use('/api/users', users);
app.use('/api/auth', auth);
// Serve static assets if in production

if(process.env.NODE_ENV === 'production') {
    // Set a static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is running on port: ${port}`));