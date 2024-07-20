import express from 'express';
const router = express.Router();
import { getPost, getPosts, createPost, updatePost, deletePost } from '../controllers/postController.js';

// get all posts
router.get('/', getPosts);

// get a single post
router.get('/:id', getPost);

// create a new post
router.post('/', createPost)

// update post 
router.put('/:id', updatePost)

// delete post
router.delete('/:id', deletePost)

export default router;