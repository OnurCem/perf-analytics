import { Request, Response } from 'express';
import { CollectMetricRequestModel } from '../../models/collect/MetricModels';

export const getMetric = (req: Request, res: Response): void => {
  res.send('GET Metric');
};

export const postMetric = (req: Request, res: Response): void => {
  const metrics = req.body as [CollectMetricRequestModel];

  metrics?.forEach((metricData) => {
    // eslint-disable-next-line no-console
    console.log('Metric', metricData);
  });

  res.json({ success: true });
};
