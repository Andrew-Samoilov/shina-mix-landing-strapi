import * as crypto from 'crypto';

const key1 = crypto.randomBytes(32).toString('hex');
const key2 = crypto.randomBytes(32).toString('hex');


console.log(key1,key2);

export default ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  
  app: {
    keys: env.array('APP_KEYS', [key1, key2]),
  },
});
