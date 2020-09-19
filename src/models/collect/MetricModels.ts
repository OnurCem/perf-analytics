export interface CollectMetricRequestModel {
  metricName: string;
  duration: number;
  measureTime: string;
  resourceName: string;
}

export interface MetricQueryResultModel {
  _id: string;
  values: {
    duration: number;
    measureTime: string;
  }[];
}
