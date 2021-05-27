const express = require('express');
const Blog = require('./../models/blog');
const router = express.Router();

router.get('/', async (req, res) => {
  const blogs = await Blog.find().sort({ createdAt: 'desc' });
  res.render('blogs/index', { blogs: blogs });
});

// Route which redirect to new blog form page
router.get('/new', (req, res) => {
  res.render('blogs/create-blog', { blog: new Blog() });
});

// API which returns blog data by its ID
router.get('/edit/:id', async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  //console.log(blog.description);
  //console.log(blog.markdown);
  res.render('blogs/edit', { blog: blog });
});

// API which returns blog data by its slug
router.get('/:slug', async (req, res) => {
  const blog = await Blog.findOne({ slug: req.params.slug });
  if (blog == null) res.redirect('/');
  res.render('blogs/show', { blog: blog });
});

//POST API which create new blog
router.post(
  '/',
  async (req, res, next) => {
    req.blog = new Blog();
    next();
  },
  saveArticleAndRedirect('new')
);

// API which update a blog by its ID
router.put(
  '/:id',
  async (req, res, next) => {
    req.blog = await Blog.findById(req.params.id.trim());
    console.log('sucess');
    next();
  },
  saveArticleAndRedirect('edit')
);

//API which deletes a blog by its Id
router.delete('/:id', async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);
  res.redirect('/');
});

// helper method for PUT and POST api of a blog
function saveArticleAndRedirect(path) {
  return async (req, res) => {
    let blog = req.blog;
    blog.title = req.body.title;
    blog.description = req.body.description;
    blog.markdown = req.body.markdown;

    try {
      blog = await blog.save();
      //console.log(blog);
      res.redirect(`/blogs/${blog.slug}`);
    } catch (error) {
      console.log(error);
      res.render(`blogs/${path}`, { blog: blog });
    }
  };
}

module.exports = router;
