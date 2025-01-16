import type { StrapiApp } from '@strapi/strapi/admin';

export default {
  config: {
    locales: ['uk', 'en'],
    translations: {
      uk: {
        'Auth.form.welcome.title': 'Ласкаво просимо до адмінпанелі Шина Мікс!',
        'Auth.form.welcome.subtitle': 'Використовуйте цей інтерфейс для швидкого редагування будь-якої інформації на лендінгу.',
      },
      en: {
        "Auth.form.welcome.title": "Welcome to the Shina Mix Admin Panel!",
        "Auth.form.welcome.subtitle": "Use this interface to quickly edit any information on the landing page.",
      },
    },
    bootstrap(app: StrapiApp) {
      console.log('Strapi admin ', app);
    },
  }
};
