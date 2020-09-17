import { Request, Response } from 'express';

export const getMetric = (req: Request, res: Response): void => {
  res.send('GET Metric');
};
