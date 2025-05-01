import express from 'express';
import { submitLoanApplication } from '../controllers/loanController';

const router = express.Router();

router.post('/loan/apply', submitLoanApplication);

export default router;
