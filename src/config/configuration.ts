export default () => ({
  port: process.env.PORT || 3000,
  jwt_secret: process.env.JWT_SECRET,
  jwt_expiration_time: process.env.JWT_EXPIRATION_TIME,
  database: {
    mongodb: process.env.MONGODB_URI,
  },
});
