import { Redis } from '@upstash/redis'
const redis = new Redis({
  url: 'https://golden-chimp-84189.upstash.io',
  token: '********',
})

await redis.set("foo", "bar");
let x = await redis.get("foo");
console.log(x);

module.exports = redis;