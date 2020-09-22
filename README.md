# perf-analytics

PerfAnalytics is an ecosystem which collects and
criticizes web performance data.

This is the API project of the ecosystem which saves
data posted from client-side libraries and provides
time specific filtered data to dashboard.

- **JS library:** [perf-analytics.js](https://github.com/OnurCem/perf-analytics.js)
- **Dashboard:** [perf-analytics.dashboard](https://github.com/OnurCem/perf-analytics.dashboard)

## API

### Send metrics to the server

**URL:** `/collect/metric/`

**Method:** `POST`

**Example Body:**

```json
[
  {
    "metricName": "DOM_LOAD",
    "duration": 100,
    "measureTime": "2020-09-18T18:40:40.000Z"
  }
]
```

### Get saved metrics from the server

**URL:** `/collect/metric/`

**Method:** `GET`

**Example Query Params:**

```json
{
  "startDate": "2020-09-10T18:40:40.000Z",
  "endDate": "2020-09-20T18:40:40.000Z"
}
```

> `startDate` and `endDate` params are optional. If not set,
> returns metrics saved in last 30 minutes.

## Development

### Prerequisites

- MongoDB 4.4 server

### Building the code

To transpile the code, run the following command:

```shell script
npm run build
```

To start the development server and watch for changes:

```shell script
npm start
```

### Running the tests

Use the following command to run the tests:

```shell script
npm test
```

### Running on Docker

You can use Docker Compose to run database and server services
with single command:

```shell script
docker-compose up -d --build
```
