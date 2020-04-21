import { Request, Response } from 'express';

export default
(request: Request, response: Response): Response => response.status(500).json({
  err: 'error to estabilish connection with database',
});
