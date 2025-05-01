import { Request, Response } from 'express';
import { calculateLoanOffers } from '../services/loanService';

export const submitLoanApplication = (req: Request, res: Response) => {
    try {
        const application = req.body;
        const offers = calculateLoanOffers(application);
        res.status(200).json(offers);
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error });
    }
};
