import express from 'express';

import { getMetric, postMetric } from '../controllers/collect/metric';

const router = express.Router();

router.get('/metric', getMetric);
router.post('/metric', postMetric);

export default router;
