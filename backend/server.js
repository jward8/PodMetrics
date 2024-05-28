const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5000;
try {
    mongoose.connect(process.env.MONGO_URI);
    
    app.use("/", routes);
    
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
} catch (error) {
    console.error('Error connecting to MongoDB: ', error);
}

