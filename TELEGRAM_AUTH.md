# Telegram Login integratsiyasi

Klassik **Telegram Login Widget** oqimi: widget foydalanuvchi ma'lumotini `hash`
bilan qaytaradi → frontend uni backendga yuboradi → backend `hash`ni bot token
bilan tekshiradi va sessiya token beradi.

> 📖 https://core.telegram.org/bots/telegram-login

## 1. Bot sozlash (BotFather)

1. [@BotFather](https://t.me/BotFather) da bot yarating.
2. `/setdomain` (yoki BotFather > bot > **Login Widget**) orqali domeningizni
   ro'yxatdan o'tkazing (masalan `https://avtodrive.uz`). Telegram faqat shu
   domendan kelgan login'larni qabul qiladi.
3. Bot username'ni `.env` ga qo'ying:
   ```
   VITE_TELEGRAM_BOT=avtodrive_bot
   ```

## 2. Frontend (allaqachon qilingan)

- [`TelegramLoginButton.vue`](src/components/common/TelegramLoginButton.vue) —
  `VITE_TELEGRAM_BOT` sozlangan bo'lsa rasmiy widget skriptini joylashtiradi,
  aks holda demo tugma ko'rsatadi.
- Widget `data-onauth` orqali quyidagi obyektni qaytaradi:
  ```ts
  { id, first_name, last_name?, username?, photo_url?, auth_date, hash }
  ```
- [`LoginView.vue`](src/views/LoginView.vue) → `onTelegramAuth()` →
  `telegramAuth(data)` ([auth.service.ts](src/services/auth.service.ts)) uni
  `POST /auth/telegram` ga yuboradi.

## 3. Backend — `hash`ni tekshirish (⚠️ majburiy)

`hash` **faqat backendda** tekshiriladi, chunki bot token maxfiy. Algoritm:

1. `hash`dan tashqari barcha maydonlarni `key=value` ko'rinishida oling.
2. Kalitlar bo'yicha **alfavit tartibida** saralang.
3. `\n` bilan birlashtiring → `data_check_string`.
4. `secret_key = SHA256(bot_token)` (xom baytlar).
5. `HMAC_SHA256(data_check_string, secret_key)` (hex) hisoblang.
6. Natija kelgan `hash` bilan mos kelsa — ma'lumot haqiqiy.
7. `auth_date` yangi ekanini tekshiring (masalan < 86400 soniya).

### Node.js / Express namunasi

```js
import crypto from 'node:crypto'

function verifyTelegramAuth(data, botToken) {
  const { hash, ...fields } = data

  const dataCheckString = Object.keys(fields)
    .sort()
    .map((k) => `${k}=${fields[k]}`)
    .join('\n')

  const secretKey = crypto.createHash('sha256').update(botToken).digest()
  const hmac = crypto
    .createHmac('sha256', secretKey)
    .update(dataCheckString)
    .digest('hex')

  const signatureOk =
    hmac.length === hash.length &&
    crypto.timingSafeEqual(Buffer.from(hmac), Buffer.from(hash))

  const fresh = Math.floor(Date.now() / 1000) - Number(data.auth_date) < 86400

  return signatureOk && fresh
}

app.post('/auth/telegram', (req, res) => {
  if (!verifyTelegramAuth(req.body, process.env.TELEGRAM_BOT_TOKEN)) {
    return res.status(401).json({ message: "Noto'g'ri Telegram imzosi" })
  }
  // foydalanuvchini top/yarating, JWT bering
  const user = upsertUserFromTelegram(req.body)
  const token = signJwt(user)
  res.json({ token, user })
})
```

### Python namunasi

```python
import hashlib, hmac, time

def verify_telegram_auth(data: dict, bot_token: str) -> bool:
    check = {k: v for k, v in data.items() if k != 'hash'}
    data_check_string = '\n'.join(f'{k}={check[k]}' for k in sorted(check))
    secret_key = hashlib.sha256(bot_token.encode()).digest()
    h = hmac.new(secret_key, data_check_string.encode(), hashlib.sha256).hexdigest()
    fresh = time.time() - int(data['auth_date']) < 86400
    return hmac.compare_digest(h, data['hash']) and fresh
```

## Muqobil: yangi OIDC oqimi

Telegram endi OpenID Connect (`telegram-login.js`, `oauth.telegram.org`) ni ham
qo'llab-quvvatlaydi — u JWT `id_token` qaytaradi va uni JWKS bilan tekshiriladi.
Klassik widget hali ishlaydi va oddiyroq; yuqoridagi oqim shunga asoslangan.
