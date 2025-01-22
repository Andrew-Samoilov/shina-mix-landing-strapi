export default {
    async afterCreate(event) {
        const { result } = event;

        strapi.log.info(`Запис створено: ID ${result.id}, Час: ${new Date().toISOString()}`);
        // console.dir(result);

        if (result.emailSent) {
            strapi.log.info(`Лист уже був відправлений для ID: ${result.id}`);
            return;
        }

        try {
            await strapi.plugin('email').service('email').send({
                to: 'webmaster@shinamix.com',
                subject: `Новий запит на Price. ${result.createdAt}`,
                text: `Новий запит:`,
                html: `
                <h1>Новий запит на Price:</h1>
                <p>email: ${result.eMail},</p>
                <p>name: ${result.name},</p>
                <p>message: ${result.message},</p>
                <div style="text-align: right;">createdAt: ${result.createdAt}</div>
                `,
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
