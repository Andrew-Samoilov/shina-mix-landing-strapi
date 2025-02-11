/**
 * message controller
 */

import { factories } from '@strapi/strapi'
import recaptchaMiddleware from "../../../middlewares/recaptcha";

export default factories.createCoreController('api::message.message', ({ strapi }) => ({
    async create(ctx) {
        await recaptchaMiddleware(ctx, async () => {
            const response = await super.create(ctx);
            return response;
        });
    },
}));