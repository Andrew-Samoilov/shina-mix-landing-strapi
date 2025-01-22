import { format } from 'date-fns';
import { uk } from 'date-fns/locale';

export default {
    async afterCreate(event) {
        const { result } = event;
        const formattedDate = format(new Date(result.createdAt), 'dd.MM.yyyy HH:mm', { locale: uk });
        strapi.log.info(`Lifecycle Hook "afterCreate" викликаний для Price ID: ${result.id}`);

        if (result.emailSent) {
            strapi.log.warn(`Email уже був відправлений по Price, ID: ${result.id}`);
            return;
        }

        try {
            await strapi.plugin('email').service('email').send({
                to: 'webmaster@shinamix.com',
                subject: `Новий запит на Price. ${formattedDate}`,
                text: `Новий запит на прайс
                    Email: ${result.eMail}
                    Name: ${result.name}
                    tel: ${result.tel}
                    Повідомлення: ${result.message}

                    Дата: ${formattedDate}
            `,
                html: `
                <h1>Новий запит на Price:</h1>
                <p>email: ${result.eMail},</p>
                <p>name: ${result.name},</p>
                <p>message: ${result.message},</p>
                <div style="text-align: right;"><i>createdAt: ${formattedDate}</i></div>
                `,
            });

            strapi.log.info(`Email успішно надіслано для Price, ID: ${result.id}`);

            await strapi.db.query('api::price.price').update({
                where: { id: result.id },
                data: { emailSent: true },
            });

        } catch (error) {
            strapi.log.error(`Помилка при надсиланні email для Price, ID: ${result.id}`, error);
        }
    },
};
