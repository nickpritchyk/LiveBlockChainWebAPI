import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';

// @route   GET /api/rates
// @desc    Get All Exchange Rates
// @access  Public
export const getRates = asyncHandler(async (req: Request, res: Response) => {

    res.send('rates endpoint hit!')
})