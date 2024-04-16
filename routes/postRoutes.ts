import { Router } from 'express'
import { createPost, getPosts } from '../controllers/postsController'

export const router: Router = Router()

router.route('/')
    .get(getPosts)
    .post(createPost)