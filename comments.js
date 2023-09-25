// Create web server 

// Import express library
const express = require('express');
const app = express();

// Import body-parser library
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// Import mongoose library
const mongoose = require('mongoose');

// Import model
const Comment = require('./models/comment');

// Connect to database
mongoose.connect('mongodb://localhost:27017/comments', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to database");
    })
    .catch((err) => {
        console.log("Cannot connect to database", err);
        process.exit();
    });

// Create a comment
app.post('/comments', (req, res) => {
    const comment = new Comment({
        name: req.body.name,
        comment: req.body.comment
    });
    comment.save()
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({ message: err.message });
        });
});

// Get all comments
app.get('/comments', (req, res) => {
    Comment.find()
        .then((comments) => {
            res.send(comments);
        })
        .catch((err) => {
            res.status(500).send({ message: err.message });
        });
});

// Get a comment by ID
app.get('/comments/:id', (req, res) => {
    Comment.findById(req.params.id)
        .then((comment) => {
            if (!comment) {
                return res.status(404).send({ message: "Comment not found" });
            }
            res.send(comment);
        })
        .catch((err) => {
            res.status(500).send({ message: err.message });
        });
});

// Update a comment by ID
app.put('/comments/:id', (req, res) => {
    Comment.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        comment: req.body.comment
    }, { new: true })
        .then((comment) => {
            if (!comment) {
                return res.status(404).send({ message: "Comment not found" });
            }
            res.send(comment);
        })
        .catch((err) => {
            res.status(500).send({ message: err.message });
        });
});

// Delete a comment by ID
app.delete('/comments/:id', (req,
