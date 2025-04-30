import { ZodSchema } from 'zod';
import { Request, Response, NextFunction } from 'express';

export const zodMiddleware =
  (schema: ZodSchema<any>) =>
  (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ errors: result.error.flatten() });
    }
    req.body = result.data; // use the validated + parsed data
    next();
  };