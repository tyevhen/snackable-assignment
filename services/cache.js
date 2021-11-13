const client = require('redis').createClient();
const { promisify } = require('util')

client.on('connect', () => {
  console.log('Redis client connected');
});

client.on('error', err => {
  console.log('Redis client error', err);
});

const get = promisify(client.get).bind(client);
const setex = promisify(client.setex).bind(client);

module.exports = {
  get: (key) => {
    return get(key);
  },

  set: (key, data) => {
    return setex(key, 60, JSON.stringify(data));
  },
};
