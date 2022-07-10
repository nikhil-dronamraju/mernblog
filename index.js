const express = require('express');
const app = express();
app.use(express.urlencoded({extended:false}));
app.use(express.json());
const cors = require('cors');
app.use(cors());
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const port = process.env.PORT;
const dbUri = process.env.DB_URI;
const Blogs = require('./models/Blogs');
const dbOptions = {
    dbName: 'blogs'
};

mongoose.connect(dbUri, dbOptions).then(
    () => {
        console.log('DB connected.');
    }
);

app.listen(port, () => {console.log(`Now listening to port ${port}`)});

app.get('/api/blogs', (req, res) => {
    Blogs.find().then(
        data => {
            res.json(data);
        }
    )
});

app.post('/api/blogs', (req, res) => {
    Blogs.create(req.body).then(
        data => {
            Blogs.find().then(
                allBlogs => {
                    res.json(allBlogs);
                }
            )
        }
    )
});

app.put('/api/blogs/:id', (req, res) => {
    Blogs.findByIdAndUpdate(req.params.id, req.body).then(
        element => {
            Blogs.find().then(
                allBlogs => {
                    res.json(allBlogs);
                }
            )
        }
    )
});

app.delete('/api/blogs/:id',  (req, res) => {
    Blogs.findByIdAndRemove(req.params.id).then(
        data => {
            Blogs.find().then(
                allBlogs => {
                    res.json(allBlogs);
                }
            )
        }
    )
})