const request = require('supertest');
const app = require('../dist').default;

const newMetricName = `new_metric_${Date.now()}`;
const oldMetricName = `old_metric_${Date.now()}`;
const specificDate = new Date('2020-01-10T12:30:00.000Z');

describe('POST Endpoints', () => {
  it('should save a metric', async (done) => {
    request(app)
      .post('/collect/metric')
      .send([
        {
          metricName: newMetricName,
          duration: 100,
          measureTime: new Date().toISOString(),
        },
        {
          metricName: oldMetricName,
          duration: 200,
          measureTime: specificDate.toISOString(),
        },
      ])
      .then((response) => {
        expect(response.statusCode).toEqual(200);

        done();
      });
  });
});

describe('GET Endpoints', () => {
  it('should return metrics saved in last 30 minutes', async (done) => {
    request(app)
      .get('/collect/metric')
      .send()
      .then((response) => {
        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty('metrics');

        const { metrics } = response.body;
        const newMetric = metrics.find(({ name }) => name === newMetricName);
        const oldMetric = metrics.find(({ name }) => name === oldMetricName);

        expect(newMetric).toBeDefined();
        expect(oldMetric).not.toBeDefined();

        done();
      });
  });

  it('should return metrics for a specific date range', async (done) => {
    request(app)
      .get('/collect/metric')
      .query({
        startDate: '2020-01-09T12:30:00.000Z',
        endDate: '2020-01-11T12:30:00.000Z',
      })
      .then((response) => {
        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty('metrics');

        const { metrics } = response.body;
        const oldMetric = metrics.find(({ name }) => name === oldMetricName);

        expect(oldMetric).toBeDefined();

        done();
      });
  });
});
