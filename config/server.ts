import * as crypto from 'crypto';

const key1 = crypto.randomBytes(32).toString('hex');
const key2 = crypto.randomBytes(32).toString('hex');

console.log('🚀 Генеруємо APP_KEYS:', key1, key2);
console.log(`✅ Сервер запуститься на порту ${process.env.PORT || 1337}`);

export default ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  
  locale: "uk",
  
  app: {
    keys: env.array('APP_KEYS', [key1, key2]),
  },

  url: env('PUBLIC_URL', 'https://shinamix.com'),
  
  dirs: {
    public: './public',
  },

  admin: {
    url: '/admin',
  },
});
