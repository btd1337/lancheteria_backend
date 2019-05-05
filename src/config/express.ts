export default {
  environment: process.env.EXPRESS_ENVIRONMENT,
  port: process.env.EXPRESS_PORT || 3000,

  isProduction() {
    return this.get('express.environment') === 'production';
  },
};
