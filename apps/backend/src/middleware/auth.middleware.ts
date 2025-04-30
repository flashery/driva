import { Request, Response, NextFunction } from 'express';

const API_TOKEN = process.env.API_TOKEN;

/**
 * Authentication middleware (not currently used).
 * 
 * This is prepared for future use if token-based API access is needed.
 * To activate, add this middleware to protected routes:
 *   app.use('/api/v1/loan', authMiddleware, loanRoutes);
 * 
 * The token should be sent in the request header as:
 *   Authorization: Bearer <API_TOKEN>
 */
export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const auth = req.headers.authorization;

  if (!auth || !auth.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const token = auth.split(' ')[1];

  if (token !== API_TOKEN) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  next();
};
