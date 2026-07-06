const { Redis } =  require('@upstash/redis')
const redis = new Redis({
  url: 'https://golden-chimp-84189.upstash.io',
  token: 'gQAAAAAAAUjdAAIgcDEzNTgxYjBmOTNhYWI0NmZiYmY1ODllOTdkODFkNDJkYQ',
})

redis.set("foo", "bar");
let x = redis.get("foo");
console.log(x);

module.exports = redis;