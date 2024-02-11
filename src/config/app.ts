export const app = {
  port: process.env.APP_PORT || 3000,
  aws: {
    account_name: process.env.AWS_ACCOUNT_NAME,
    region: process.env.AWS_REGION,
    key_id: process.env.AWS_ACCESS_KEY_ID,
    secret_key: process.env.AWS_SECRET_ACCESS_KEY,
    endpoint: process.env.AWS_ENDPOINT,
    bucket_name: process.env.S3_BUCKET_NAME,
  },
  binance: {
    api_key: process.env.BINANCE_API_KEY,
    secret_key: process.env.BINANCE_SECRET_KEY,
  },
};
