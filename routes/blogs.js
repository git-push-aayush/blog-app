const express = require('express');
const Blog = require('./../models/blog');
const router = express.Router();

router.get('/new', (req, res) => {
  res.render('blogs/create-blog', { blog: new Blog() });
});

router.get('/:slug', async (req, res) => {
  const blog = await Blog.findOne({ slug: req.params.slug });
  if (blog == null) res.redirect('/');
  res.render('blogs/show', { blog: blog });
});

router.post('/', async (req, res) => {
  let blog = new Blog({
    title: req.body.title,
    description: req.body.description,
    markdown: req.body.markdown,
  });
  try {
    blog = await blog.save();
    //console.log(blog);
    res.redirect(`/blogs/${blog.slug}`);
  } catch (error) {
    res.render('blogs/create-blog', { blog: blog });
  }
});

router.delete('/:id', async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);
  res.redirect('/');
});

module.exports = router;
