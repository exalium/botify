# Botify - Telegram Airdrop Bot Automation

Botify is a tool designed to automate interactions with 'airdrop' bots on Telegram. This project simplifies and enhances the process of participating in cryptocurrency airdrops.

Botify is a project developed by the [Less](https://t.me/money_less "Less Telegram Channel") team. We are a group of enthusiasts who are passionate about cryptocurrency and blockchain technology. Our goal is to create a community of like-minded individuals who share our passion for the crypto world.

> [!TIP]
> This readme is available in other languages (machine translated): [Українська](./docs/readme.uk.md), [Русский](./docs/readme.ru.md)

## Table of Contents

- [Disclaimer](#disclaimer)
- [Features](#features)
  - [Global features](#global-features)
  - [Per Project features](#per-project-features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Disclaimer

> [!CAUTION]
> This project is provided for educational purposes only. The creators of Botify do not endorse or take responsibility for any misuse of this software. Use it at your own risk, and ensure compliance with [Telegram's terms of service](https://telegram.org/tos) and any applicable laws and regulations. Please be cautious and aware that using such software might lead to your account being banned.

> [!IMPORTANT]
> This is our first project written in a high-level programming language, specifically [TypeScript](https://www.typescriptlang.org/). Please note that some parts of the code may be written in a rough or incorrect manner, as this project was developed after just one hour of reading the official [documentation](https://www.typescriptlang.org/docs/).

## Features

### Global features

- [x] Authorization to Telegram using [tdl](https://github.com/Bannerets/tdl "Node.js bindings to TDLib")
- [x] Save session database to avoid re-authorization
- [x] Support for multiple Telegram accounts
- [ ] Support proxy with bind to account

### Per Project features

Each project has its own set of features. These can be found in the [vendor readme](./src/vendor/readme.md).

## Getting Started

### Prerequisites

Before you start, ensure you have met the following requirements:
- Installed [Bun <img src="https://bun.sh/logo.png" alt="Bun Logo" title="Bun Logo" width="15" height="15">](https://bun.sh "Bun is an all-in-one JavaScript runtime & toolkit") on your machine, and added it to the **PATH**.
- A registered Telegram account with authorization through a phone number.

### Installation

1. Clone the repository to your local machine:
```bash
  git clone https://github.com/alex-mxrz/Botify.git
```

2. Navigate to the project directory:
```bash
  cd Botify
```

3. Install the project dependencies:
```bash
  bun install
```

4. Configure the `.env` file (see [Configuration](#configuration)).

### Configuration

The project uses the `.env` file to store environment variables. You can find an example of the configuration file in the [`.env.template`](./.env.template) file.

1. To configure the project, rename the `.env.template` file to `.env`:
```bash
  mv .env.template .env
```

2. Open the `.env` file in your favorite text editor and fill in the required fields:
```env
  # Telegram API credentials
  API_ID = ...
  API_HASH = ...
```

3. Replace the `...` with your Telegram API ID and API hash. You can get these values by creating a new application on the [Telegram API website](https://my.telegram.org/apps "Telegram API website").

## Usage

Since our project uses a command-line interface, you can run it with the following steps:

1. Navigate to the project directory:
```bash
  cd <path-to-project>
```

2. Run the project with the following command:
```bash
  bun start
```

3. Follow the instructions in the console to authorize your Telegram account and interact with the bots.

## Contributing

If you would like to contribute to this project, please follow these steps:

1. Fork the repository.

2. Create a new branch:
```bash
  git checkout -b feature-branch-name
```

3. Make your changes and commit them:
```bash
  git commit -m 'Add some feature'
```

4. Push to the branch in your forked repository:
```bash
  git push origin feature-branch-name
```

5. Submit a pull request.

## License

This project is licensed under the [GNU General Public License v3.0](https://www.gnu.org/licenses/gpl-3.0.en.html). See the [license](./license) file for more information.

## Contact

If you have any questions, suggestions, concerns, or need further assistance, feel free to contact us:
- Support telegram: [@less_support](https://t.me/less_support "Telegram Support account")
- Developer telegram: [@dylane_less](https://t.me/dylane_less "Telegram Developer account")
- Our telegram channel: [@money_less](https://t.me/money_less "Telegram Channel")

> [!IMPORTANT]
> Please join our channel to support and grow the Ukrainian and European (in the future) crypto community. We are waiting for you! We appreciate your interest and support! We are open to any suggestions and feedback to improve the user experience.
>
> We are also looking for new team members to help us develop our projects. If you are interested, please contact us via the above contacts.
