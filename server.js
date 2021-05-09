const express = require('express');
const mongoose = require('mongoose');
const Blog = require('./models/blog');
const methodOverride = require('method-override');
const blogRouter = require('./routes/blogs');
const app = express();

mongoose.connect('mongodb://localhost/blog', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

app.set('view engine', 'ejs');
app.use('/public', express.static('public'));
app.use(express.urlencoded({ extended: false }));

app.use(methodOverride('_method'));

app.get('/', async (req, res) => {
  const blogs = await Blog.find().sort({ createdAt: 'desc' });
  res.render('blogs/index', { blogs: blogs });
});
app.use('/blogs', blogRouter);

app.listen(5000);
