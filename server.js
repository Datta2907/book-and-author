const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Book = require('./models/book');
const Author = require('./models/author');
const cors = require('cors');
const path = require('path')
const PORT = 8000;

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cors())

// Serve static files
app.use(express.static(path.join(__dirname)));

// Connect to local MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/mydatabase', {
})
    .then(() => console.log("✅ Connected to MongoDB locally"))
    .catch(err => console.error("❌ MongoDB Connection Error:", err));

app.get('/', (req, res) => {
    res.redirect('/list')
});
// Serve HTML pages
app.get('/upload', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'upload.html'));
});

app.get('/list', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'list.html'));
});

app.get('/query', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'query.html'));
});
// Handle book and author creation
app.post('/books', async (req, res) => {
    const { title, pages, publishedDate, authorId, newAuthor, birthdate, nationality } = req.body;
    let author
    if (authorId) {
        author = await Author.findById(authorId);
    }
    if (!authorId && newAuthor) {
        author = new Author({ name: newAuthor, birthdate, nationality });
        await author.save();
    }
    const book = new Book({ title, pages, publishedDate, author: author._id });
    await book.save();
    res.json(book)
});

// List books and authors with populated references
app.get('/books-and-authors', async (req, res) => {
    const books = await Book.find().populate('author');
    res.json(books);
});

// Query books based on a number (pages)
app.get('/customize-query', (req, res) => {
    res.render('query');
});

// Get Authors
app.get('/authors', async (req, res) => {
    const authors = await Author.find();
    res.json(authors);
});

app.get('/min-books', async (req, res) => {
    const { pages } = req.query;
    const books = await Book.find({ pages: { $gte: pages } }).populate('author');
    res.json(books);
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));