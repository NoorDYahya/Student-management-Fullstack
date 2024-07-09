

const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017/';
const dbName = 'university';

router.delete('/:name', async (req, res) => {
    const name = req.params.name;

    try {
        const client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
        const db = client.db(dbName);
        const result = await db.collection('students').deleteOne({ name });
        client.close();

        if (result.deletedCount === 1) {
            res.status(200).send({ message: 'Student deleted successfully' });
        } else {
            res.status(404).send({ message: 'Student not found' });
        }
    } catch (err) {
        res.status(500).send({ message: 'Error deleting student', error: err });
    }
});

// router.put('/:name', async (req, res) => {
//     const name = req.params.name;
//     const { age, average } = req.body;

//     try {
//         const client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
//         const db = client.db(dbName);
//         const result = await db.collection('students').updateOne(
//             { name },
//             { $set: { age, average } }
//         );
//         client.close();

//         if (result.modifiedCount === 1) {
//             res.status(200).send({ message: 'Student updated successfully' });
//         } else {
//             res.status(404).send({ message: 'Student not found' });
//         }
//     } catch (err) {
//         res.status(500).send({ message: 'Error updating student', error: err });
//     }
// });



router.post('/', async (req, res) => {
    const db = req.app.locals.db;
    const { name, age, email, average } = req.body;

    //validate input is not empty 
    if (!name || !age || !email || !average) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const student = { name, age, email, average };
        const result = await db.collection('students').insertOne(student);
        res.status(201).json(student);
    } catch (error) {
        console.error('Error adding student:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
