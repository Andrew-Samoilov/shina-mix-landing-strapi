interface RecaptchaResponse {
    success: boolean;
    score: number;
}

const recaptchaMiddleware = async (ctx: any, next: () => Promise<void>) => {
    try {
        console.log("📩 Отримано запит у Strapi. Повний Body:", JSON.stringify(ctx.request.body, null, 2));

        // Пошук `recaptcha` у `ctx.request.body` або `ctx.request.body.data`
        const recaptcha = ctx.request.body?.recaptcha || ctx.request.body?.data?.recaptcha;

        if (!recaptcha) {
            console.error("❌ reCAPTCHA відсутній у запиті!");
            ctx.throw(400, "reCAPTCHA відсутній");
        }

        const secretKey = process.env.RECAPTCHA_SECRET_KEY;
        if (!secretKey) {
            console.error("❌ SECRET KEY відсутній у .env");
            ctx.throw(500, "reCAPTCHA секретний ключ не знайдено в .env");
        }

        console.log("🔹 Відправляємо reCAPTCHA на валідацію...");
        const verificationURL = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${recaptcha}`;

        const response = await fetch(verificationURL, { method: "POST" });

        if (!response.ok) {
            console.error("❌ Google reCAPTCHA API не відповідає:", response.status, await response.text());
            ctx.throw(500, "Помилка перевірки reCAPTCHA");
        }

        const data = (await response.json()) as RecaptchaResponse;
        console.log("🔹 Отримана відповідь від Google:", data);

        if (!data.success) {
            console.error("❌ Google відхилив reCAPTCHA:", data);
            ctx.throw(403, "reCAPTCHA не пройдено");
        }

        if (data.score < 0.5) {
            console.error("⚠️ reCAPTCHA score занадто низький:", data.score);
            ctx.throw(403, "Ваш рейтинг reCAPTCHA занадто низький.");
        }

        console.log("✅ reCAPTCHA успішно пройдено!");
        await next();
    } catch (error) {
        console.error("❌ Помилка reCAPTCHA middleware:", error);
        ctx.throw(500, "Помилка сервера Strapi.");
    }
};

export default recaptchaMiddleware;
