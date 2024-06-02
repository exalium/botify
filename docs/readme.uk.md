# Botify - Telegram Airdrop Bot Automation

Botify - це інструмент, розроблений для автоматизації взаємодії з 'airdrop' ботами в Telegram. Цей проект спрощує та покращує процес участі в криптовалютних airdrop'ах.

Botify - це проект, розроблений командою [Less](https://t.me/money_less "Less Telegram Channel"). Ми - група ентузіастів, які слідкують за криптовалютами та технологією блокчейну. Наша мета - створити спільноту однодумців, які діляться нашою пристрастю до світу криптовалют.

## Зміст

- [Відмова від відповідальності](#відмова-від-відповідальності)
- [Функції](#функції)
  - [Глобальні функції](#глобальні-функції)
  - [Функції проектів](#функції-проектів)
- [Початок роботи](#початок-роботи)
  - [Необхідні умови](#необхідні-умови)
  - [Інсталяція](#інсталяція)
  - [Конфігурація](#конфігурація)
- [Використання](#використання)
- [Внесок у проект](#внесок-у-проект)
- [Ліцензія](#ліцензія)
- [Контакти](#контакти)

## Відмова від відповідальності

> [!CAUTION]
> Цей проект надається виключно для освітніх цілей. Автори Botify не підтримують і не несуть відповідальності за будь-яке неправильне використання цього програмного забезпечення. Використовуйте його на свій ризик і переконайтеся, що ви дотримуєтесь [умов обслуговування Telegram](https://telegram.org/tos) та будь-яких застосовних законів та правил. Будьте обережні та усвідомлюйте, що використання такого програмного забезпечення може призвести до блокування вашого акаунта.

> [!IMPORTANT]
> Це наш перший проект, написаний на мові високого рівня, а саме [TypeScript](https://www.typescriptlang.org/). Зверніть увагу, що деякі частини коду можуть бути написані грубо або неправильно, оскільки цей проект було розроблено після лише однієї години читання офіційної [документації](https://www.typescriptlang.org/docs/).

## Функції

### Глобальні функції

- [x] Авторизація в Telegram за допомогою [tdl](https://github.com/Bannerets/tdl "Node.js bindings to TDLib")
- [x] Збереження бази даних сеансів для уникнення повторної авторизації
- [x] Підтримка кількох акаунтів Telegram
- [ ] Підтримка проксі з прив'язкою до акаунту

### Функції проектів

Кожен проект має свій набір функціональних можливостей. Їх можна знайти у [vendor readme](./src/vendor/readme.md).

## Початок роботи

### Необхідні умови

Перед початком переконайтеся, що ви виконали наступні вимоги:
- Встановили [Bun <img src="https://bun.sh/logo.png" alt="Bun Logo" title="Bun Logo" width="15" height="15">](https://bun.sh "Bun is an all-in-one JavaScript runtime & toolkit") на своєму комп'ютері та додали його до **PATH**.
- Зареєстрований акаунт Telegram з авторизацією через номер телефону.

### Інсталяція

1. Клонуйте репозиторій на свій комп'ютер:
```bash
  git clone https://github.com/alex-mxrz/Botify.git
```

2. Перейдіть до директорії проекту:
```bash
  cd Botify
```

3. Встановіть залежності проекту:
```bash
  bun install
```

4. Налаштуйте файл `.env` (див. [Конфігурація](#конфігурація)).

### Конфігурація

Проект використовує файл `.env` для зберігання змінних середовища. Ви можете знайти приклад конфігураційного файлу у [`.env.template`](./.env.template).

1. Щоб налаштувати проект, перейменуйте файл `.env.template` на `.env`:
```bash
  mv .env.template .env
```

2. Відкрийте файл `.env` у вашому улюбленому текстовому редакторі та заповніть необхідні поля:
```env
  # Telegram API credentials
  API_ID = ...
  API_HASH = ...
```

3. Замініть `...` на ваш API ID і API hash Telegram. Ви можете отримати ці значення, створивши новий додаток на [сайті Telegram API](https://my.telegram.org/apps "Telegram API website").

## Використання

Оскільки наш проект використовує інтерфейс командного рядка, ви можете запустити його за допомогою наступних кроків:

1. Перейдіть до директорії проекту:
```bash
  cd <path-to-project>
```

2. Запустіть проект за допомогою наступної команди:
```bash
  bun start
```

3. Виконуйте інструкції в консолі, щоб авторизувати свій акаунт Telegram та взаємодіяти з ботами.

## Внесок у проект

Якщо ви хочете внести свій внесок у цей проект, дотримуйтесь цих кроків:

1. Форкніть репозиторій.

2. Створіть нову гілку:
```bash
  git checkout -b feature-branch-name
```

3. Внесіть зміни та закомітьте їх:
```bash
  git commit -m 'Add some feature'
```

4. Відправте гілку у ваш форкований репозиторій:
 ```bash
  git push origin feature-branch-name
```

5. Відправте запит на злиття (pull request).

## Ліцензія

Цей проект ліцензовано за умовами [GNU General Public License v3.0](https://www.gnu.org/licenses/gpl-3.0.en.html). Деталі дивіться у [LICENSE](./LICENSE).

## Контакти

Якщо у вас є запитання, пропозиції, зауваження або вам потрібна допомога, зв'яжіться з нами:
- Підтримка в Telegram: [@less_support](https://t.me/less_support "Telegram Support account")
- Розробник в Telegram: [@dylane_less](https://t.me/dylane_less "Telegram Developer account")
- Наш канал у Telegram: [@money_less](https://t.me/money_less "Telegram Channel")

> [!IMPORTANT]
> Приєднуйтесь до нашого каналу, щоб підтримати та розвивати українську та європейську (в майбутньому) крипто-спільноту. Ми чекаємо на вас! Ми цінуємо ваш інтерес і підтримку! Ми відкриті до будь-яких пропозицій та відгуків для покращення користувацького досвіду.
>
> Ми також шукаємо нових членів команди, які допоможуть нам розвивати наші проекти. Якщо вас це цікавить, зв'яжіться з нами через зазначені вище контакти.