import { Request, Response } from 'express';

import { CollectMetricRequestModel, MetricQueryResultModel } from '../../models/collect/MetricModels';
import { getDB } from '../../utils/db';
import { MINS_TO_MS_FACTOR } from '../../constants/dateConstants';

export const getMetric = (req: Request, res: Response): void => {
  const { startDate, endDate } = req.query as { startDate: string; endDate: string };
  const currentDate = new Date();

  const dateQuery =
    startDate && endDate
      ? { $gte: new Date(startDate), $lte: new Date(endDate) }
      : { $gte: new Date(currentDate.getTime() - 30 * MINS_TO_MS_FACTOR), $lte: currentDate };

  getDB().then(
    (db) => {
      db.collection('metrics')
        .aggregate([
          {
            $match: {
              measureTime: dateQuery,
            },
          },
          {
            $group: {
              _id: '$metricName',
              values: {
                $push: {
                  duration: '$duration',
                  measureTime: '$measureTime',
                  resourceName: '$resourceName',
                },
              },
            },
          },
        ])
        .toArray((error, result) => {
          if (!error) {
            const metrics = result.map(({ _id, values }: MetricQueryResultModel) => ({
              name: _id,
              values,
            }));

            res.json({ success: true, metrics });
          } else {
            // eslint-disable-next-line no-console
            console.error(error);

            res.status(500).json({ success: false });
          }
        });
    },
    () => {
      res.status(500).json({ success: false });
    }
  );
};

export const postMetric = (req: Request, res: Response): void => {
  const metrics = req.body as [CollectMetricRequestModel];

  if (metrics) {
    const mappedMetrics = metrics.map((metricData) => ({
      ...metricData,
      measureTime: new Date(metricData.measureTime),
    }));

    getDB().then(
      (db) => {
        db.collection('metrics').insertMany(mappedMetrics, (error) => {
          if (!error) {
            res.json({ success: true });
          } else {
            // eslint-disable-next-line no-console
            console.error(error);

            res.status(500).json({ success: false });
          }
        });
      },
      () => {
        res.status(500).json({ success: false });
      }
    );
  }
};
