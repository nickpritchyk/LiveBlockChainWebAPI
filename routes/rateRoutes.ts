import { Router } from 'express'
import { getRates } from '../controllers/ratesController'

export const router: Router = Router()

router.route('/')
    .get(getRates)