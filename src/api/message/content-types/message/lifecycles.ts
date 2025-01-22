import { format } from 'date-fns';
import { uk } from 'date-fns/locale';

export default {
    async afterCreate(event) {
        const { result } = event;
        const formattedDate = format(new Date(result.createdAt), 'dd.MM.yyyy HH:mm', { locale: uk });
        strapi.log.info(`Lifecycle Hook "afterCreate" викликаний для Message ID: ${result.id}`);

        if (result.emailSent) {
            strapi.log.warn(`Лист уже був відправлений по Message, ID: ${result.id}`);
            return;
        }
        
        try {
            await strapi.plugin('email').service('email').send({
                to: 'webmaster@shinamix.com',
                subject: `Нове повідомлення. ${formattedDate}`,
                text: `
                    Нове повідомлення з сайту

                    Email: ${result.contact_email}
                    Name: ${result.contact_name}
                    Телефон: ${result.contact_tel}
                    Повідомлення: ${result.contact_message}

                    Дата: ${formattedDate}
            `,
                html: `
                <h1>Нове повідомлення</h1>
                <p>email: ${result.contact_email},</p>
                <p>name: ${result.contact_name},</p>
                <p>tel: ${result.contact_tel},</p>
                <p>message: ${result.contact_message},</p>
                <div style="text-align: right;"><i>createdAt: ${formattedDate}</i></div>
                `,
            });

            strapi.log.info(`Email успішно надіслано для Message, ID: ${result.id}`);

            await strapi.db.query('api::message.message').update({
                where: { id: result.id },
                data: { emailSent: true },
            });

        } catch (error) {
            strapi.log.error(`Помилка при надсиланні email для Message ID: ${result.id}`, error);
        }
    },
};
