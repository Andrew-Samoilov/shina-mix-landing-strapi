export default ({ env }) => ({
  i18n: {
    enabled: true,
  },
  email: {
    config: {
      provider: 'nodemailer',
      providerOptions: {
        host: env('SMTP_HOST', 'm.itim.com.ua'), // зміни на свою поштову службу
        port: env('SMTP_PORT', 587),
        auth: {
          user: env('SMTP_USER'),
          pass: env('SMTP_PASS'),
        },
      },
      settings: {
        defaultFrom: 'webmaster@shinamix.com',
        defaultReplyTo: 'webmaster@shinamix.com',
      },
    },
  },
});
