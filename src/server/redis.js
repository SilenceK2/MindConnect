const redis = require("redis");
const client = require("./controller");
const redisClient = redis.createClient(process.env.REDIS_PORT);

module.exports = redisClient;
