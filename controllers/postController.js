let posts = [
  { id: 1, title: "post 1" },
  { id: 2, title: "post 2" },
  { id: 3, title: "post 3" },
  { id: 4, title: "post 4" },
];

// @desc   Get all posts
// @route  GET /api/posts/
export const getPosts = (req, res) => {
  const limit = parseInt(req.query.limit);

  if (!isNaN(limit) && limit > 0) {
    return res.json(posts.slice(0, limit));
  }

  res.status(200).json(posts);
};

// @desc   Get a single post
// @route  GET /api/posts/:id
export const getPost = (req, res, next) => {
  const id = parseInt(req.params.id);
  const post = posts.find((post) => post.id === id);

  if (!post) {
    const error = new Error(`Error, the post ${id} doesnt exist.`)
    error.status = 404;
    return next(error);
  }

  res.status(200).json(post);

};

// @desc   create a post
// @route  POST /api/posts/
export const createPost = (req, res, next) => {

  if (!req.body.title) {
    const error = new Error(`Please include a title`)
    error.status = 400;
    return next(error);
  }

  const newPost = {
    id: posts.length + 1,
    title: req.body.title,
  }

  posts.push(newPost);
  res.status(201).json(posts);
}

// @desc   update a post
// @route  PUT /api/posts/:id
export const updatePost = (req, res, next) => {
  const id = parseInt(req.params.id);
  const post = posts.find((post) => post.id === id);

  if (!post) {
    const error = new Error(`Error, the post ${id} doesnt exist.`)
    error.status = 404;
    return next(error);
  }

  if (!req.body.title) {
    return res.status(400).json({ message: 'Please include a title' });
  }

  post.title = req.body.title;
  res.status(200).json(posts);
}

// @desc   Delete a post
// @route  DELETE /api/posts/:id
export const deletePost = (req, res, next) => {
  const id = parseInt(req.params.id);
  const post = posts.find((post) => post.id === id);

  if (!post) {
    const error = new Error(`Error, the post ${id} doesnt exist.`)
    error.status = 404;
    return next(error);
  }

  posts = posts.filter((post) => post.id !== id);
  res.status(200).json(posts);
}
