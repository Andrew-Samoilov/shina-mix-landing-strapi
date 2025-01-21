export default {
    async afterCreate(event) {
        const { result } = event;

        strapi.log.info(`Запис створено: ID ${result.id}, Час: ${new Date().toISOString()}`);

        if (result.emailSent) {
            strapi.log.info(`Лист уже був відправлений для ID: ${result.id}`);
            return;
        }

        try {
            await strapi.plugin('email').service('email').send({
                to: 'webmaster@shinamix.com',
                subject: 'Новий запис у Price',
                text: `Новий запис створено: ${JSON.stringify(result)}`,
                html: `<p>Новий запис у Price: <strong>${result.title || 'Без назви'}</strong></p>`,
            });

            strapi.log.info(`Email успішно надіслано для ID: ${result.id}`);

            await strapi.entityService.update('api::price.price', result.id, {
                data: { emailSent: true },
            });
        } catch (error) {
            strapi.log.error(`Помилка при надсиланні email для ID: ${result.id}`, error);
        }
    },
};
