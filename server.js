const express = require('express');
const mongoose = require('mongoose');
const Blog = require('./models/blog');
const methodOverride = require('method-override');
const blogRouter = require('./routes/blogs');
const app = express();

//connecting to mongodb which is on remote location at mongo ATLAS
mongoose.connect('mongodb+srv://admin:admin@13@blogdb.hkmti.mongodb.net/blog', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

// Enabling EJS views for app
app.set('view engine', 'ejs');
// Using it to tell express that we will be using public folder for assets or stylesheets
app.use('/public', express.static('public'));
app.use(express.urlencoded({ extended: false }));

/* In pure HTML form has only two methods GET and POST so for PUT , DELETE for other 
 methods we need to overwride comming GET and POST request from front end side. */
app.use(methodOverride('_method'));

// Root API which redirects to blogRouter root API
app.get('/', (req, res) => {
  res.redirect('/blogs');
});

// Attaching All routes to express here which are created in Routes folder
app.use('/blogs', blogRouter);

// Telling our server to listen on this port no
app.listen(5000);
