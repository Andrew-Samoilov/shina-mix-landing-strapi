interface RecaptchaResponse {
    success: boolean;
    score: number;
}

const recaptchaMiddleware = async (ctx: any, next: () => Promise<void>) => {
    try {
        strapi.log.info("📩 Отримано запит у Strapi. Повний Body:", JSON.stringify(ctx.request.body, null, 2));

        // Пошук `recaptcha` у `ctx.request.body` або `ctx.request.body.data`
        const recaptcha = ctx.request.body?.recaptcha || ctx.request.body?.data?.recaptcha;

        if (!recaptcha) {
            strapi.log.error("❌ reCAPTCHA відсутній у запиті!");
            ctx.throw(400, "reCAPTCHA відсутній");
        }

        const secretKey = process.env.RECAPTCHA_SECRET_KEY;
        if (!secretKey) {
            strapi.log.error("❌ SECRET KEY відсутній у .env");
            ctx.throw(500, "reCAPTCHA секретний ключ не знайдено в .env");
        }

        strapi.log.info("🔹 Відправляємо reCAPTCHA на валідацію...");
        // const verificationURL = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${recaptcha}`;
        // const response = await fetch(verificationURL, { method: "POST" });

        const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
                secret: secretKey,
                response: recaptcha,
            }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            strapi.log.error("❌ Google reCAPTCHA API не відповідає! Код:", response.status);
            strapi.log.error("🔹 Відповідь сервера:", errorText);
            ctx.throw(500, `Помилка перевірки reCAPTCHA: ${errorText}`);
        }

        const data = (await response.json()) as RecaptchaResponse;
        strapi.log.info("🔹 Отримана відповідь від Google:", data);

        if (!data.success) {
            strapi.log.error("❌ Google відхилив reCAPTCHA:", data);
            ctx.throw(403, "reCAPTCHA не пройдено");
        }

        if (data.score < 0.5) {
            strapi.log.error("⚠️ reCAPTCHA score занадто низький:", data.score);
            ctx.throw(403, "Ваш рейтинг reCAPTCHA занадто низький.");
        }

        strapi.log.info("✅ reCAPTCHA успішно пройдено!");
        await next();
    } catch (error) {
        strapi.log.error("❌ Помилка reCAPTCHA middleware:", error);
        ctx.throw(500, "Помилка сервера Strapi.");
    }
};

export default recaptchaMiddleware;
