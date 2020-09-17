import express from 'express';

import { getMetric } from '../controllers/collect/metric';

const router = express.Router();

router.get('/metric', getMetric);

export default router;
