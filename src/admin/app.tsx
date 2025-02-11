import type { StrapiApp } from '@strapi/strapi/admin';

export default {
  config: {
    locales: ['uk', 'en'],
    fallbackLocale: 'en',
    translations: {
      uk: {
        'Auth.form.welcome.title': 'Ласкаво просимо до адмінпанелі Шина Мікс!',
        'Auth.form.welcome.subtitle': 'Використовуйте цей інтерфейс для швидкого редагування будь-якої інформації на лендінгу.',
        'SettingsPage.title': 'Налаштування',
        'SettingsPage.permissions': 'Дозволи',
        'SettingsPage.roles': 'Ролі',
        'content-manager.plugin.name': 'Менеджер контенту',
        'content-manager.components.LeftMenu.collectionTypes': 'Колекційні типи',
        'content-manager.components.LeftMenu.singleTypes': 'Одиничні типи',
        'content-manager.containers.ListPage.table-headers.name': 'Назва',
        'content-manager.containers.Edit.pluginHeader.title': 'Редагувати запис',
        'cloud.plugin.name': 'Деплой',
        'Upload.plugin.name': 'Файловий менеджер',
        'Message': 'Повідомлення',
        'Price': 'Прайс',
        'media-library.plugin.name': 'Медіа-бібліотека',
        'media-library.components.MediaLibrary.title': 'Медіа-бібліотека',
        'media-library.components.MediaLibrary.addFile': 'Додати файл',
        'media-library.components.MediaLibrary.removeFile': 'Видалити файл',
        'deploy.plugin.name': 'Деплой',
        'releases.plugin.name': 'Релізи',
        'review-workflows.plugin.name': 'Перевірка контенту',
        'admin.settings.plugin.name': 'Налаштування',
        'content-releases.plugin.name': 'Керування випусками',
        'Media Library': 'Медіа-бібліотека',
        'Settings.application.header': 'Налаштування додатку',

        'plugin.name.content-type-builder': 'Конструктор типів контенту',
        'content-type-builder.plugin.name': 'Конструктор типів контенту',
        'content-type-builder.menu.section': 'Конструктор контенту',
        'content-type-builder.menu.types': 'Типи контенту',
        'content-type-builder.menu.components': 'Компоненти',
        'content-type-builder.modal.form.button.add': 'Додати',
        'content-type-builder.modal.form.button.cancel': 'Скасувати',
        'content-type-builder.list.title': 'Типи контенту',
        'content-type-builder.list.description': 'Створюйте та керуйте структурами контенту',
        'global.missingTranslation': '{defaultMessage}',
      },
      en: {
        "Auth.form.welcome.title": "Welcome to the Shina Mix Admin Panel!",
        "Auth.form.welcome.subtitle": "Use this interface to quickly edit any information on the landing page.",
      },
    },
    bootstrap(app: StrapiApp) {
      const enTranslations = app.getPlugin('admin')?.config.translations?.en || {};
      const ukTranslations = app.getPlugin('admin')?.config.translations?.uk || {};

      app.getPlugin('admin')?.registerTrads({
        data: {
          uk: {
            ...enTranslations, // Використовуємо англійські переклади як fallback
            ...ukTranslations, // Перезаписуємо наявні українські
          },
        },
      });

      strapi.log.info('✅ Strapi admin translations loaded.');
    }

  }
};
