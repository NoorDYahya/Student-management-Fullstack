const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { MongoClient } = require('mongodb');

const app = express();
const url = 'mongodb://localhost:27017/';
const dbName = 'university';

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());


MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(client => {
        console.log('Connected to MongoDB');
        const db = client.db(dbName);
        app.locals.db = db;

  
        const students = require('./routes/students');
        app.use('/students', students);


        app.get('*', function(req, res){
            res.status(404).send("404 page is not found");
        });

     
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log('Server is running on port 3000');
        });
    })
    .catch(err => console.error('Error connecting to MongoDB:', err));
