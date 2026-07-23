const { Redis } =  require('@upstash/redis')
require('dotenv').config();

const redis = new Redis({
  url: process.env.REDIS_CONNECTION_URL,
  token: process.env.REDIS_TOKEN,
})

redis.set("foo", "bar");
let x = redis.get("foo");
console.log(x);

module.exports = redis;