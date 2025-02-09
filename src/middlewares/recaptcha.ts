interface RecaptchaResponse {
    success: boolean;
    score: number;
}

const recaptchaMiddleware = async (ctx: any, next: () => Promise<void>) => {
    try {
        const { recaptcha } = ctx.request.body as { recaptcha?: string };

        if (!recaptcha) {
            ctx.throw(400, "reCAPTCHA відсутній");
        }

        const secretKey = process.env.RECAPTCHA_SECRET_KEY;
        if (!secretKey) {
            ctx.throw(500, "reCAPTCHA секретний ключ не знайдено в .env");
        }

        const verificationURL = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${recaptcha}`;

        const response = await fetch(verificationURL, { method: "POST" });
        const data = (await response.json()) as RecaptchaResponse;

        if (!data.success || data.score < 0.5) {
            ctx.throw(403, "reCAPTCHA не пройдено");
        }

        await next(); // Продовжуємо, якщо перевірка успішна
    } catch (error) {
        console.error("Помилка reCAPTCHA:", error);
        ctx.throw(500, "Помилка сервера");
    }
};

export default recaptchaMiddleware;
