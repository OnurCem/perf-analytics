import { Request, Response } from 'express';

import { CollectMetricRequestModel } from '../../models/collect/MetricModels';
import { getDB } from '../../utils/db';
import { MINS_TO_MS_FACTOR } from '../../constants/dateConstants';

export const getMetric = (req: Request, res: Response): void => {
  const currentDate = new Date();

  getDB()
    ?.collection('metrics')
    .find({
      measureTime: {
        $gte: new Date(currentDate.getTime() - 30 * MINS_TO_MS_FACTOR),
        $lt: currentDate,
      },
    })
    .toArray((error, result) => {
      if (!error) {
        // eslint-disable-next-line no-console
        console.log(result);

        res.json({ success: true, metrics: result });
      } else {
        // eslint-disable-next-line no-console
        console.error(error);

        res.status(500).json({ success: false });
      }
    });
};

export const postMetric = (req: Request, res: Response): void => {
  const metrics = req.body as [CollectMetricRequestModel];

  if (metrics) {
    const mappedMetrics = metrics.map((metricData) => ({
      ...metricData,
      measureTime: new Date(metricData.measureTime),
    }));

    getDB()
      ?.collection('metrics')
      .insertMany(mappedMetrics, (error, result) => {
        if (!error) {
          // eslint-disable-next-line no-console
          console.log(result);

          res.json({ success: true });
        } else {
          // eslint-disable-next-line no-console
          console.error(error);

          res.status(500).json({ success: false });
        }
      });
  }
};
