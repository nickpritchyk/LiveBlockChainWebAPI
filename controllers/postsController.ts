import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { PostsModel } from '../models/postsModel';

// @route   GET /api/posts
// @desc    Get All Posts
// @access  Public
export const getPosts = asyncHandler(async (req: Request, res: Response) => {
    try {
        const posts = await PostsModel.find()

        res.json(posts)
    } catch (error) {
        // Handle errors
        res.status(500).json({ message: 'Server Error' });
    }
})


// @route   POST /api/posts
// @desc    POST a post
// @access  Public
export const createPost = asyncHandler(async (req: Request, res: Response) => {
    res.send('Creating Post')
})