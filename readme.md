# Botify - Telegram Airdrop Bot Automation

Botify is a tool designed to automate interactions with 'airdrop' bots on Telegram. This project simplifies and enhances the process of participating in cryptocurrency airdrops. Currently, it supports only the **Blum** project.

## Table of Contents
- [Disclaimer](#disclaimer)
- [Global Features](#global-features)
- [Blum Interaction Features](#blum-interaction-features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)
  - [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Disclaimer
> This project is provided for educational purposes only. The creators of Botify do not endorse or take responsibility for any misuse of this software. Use it at your own risk, and ensure compliance with Telegram's terms of service and any applicable laws and regulations.
>
> This is our first project written in a high-level programming language, specifically TypeScript. Please note that some parts of the code may be written in a rough or incorrect manner, as this project was developed after just one hour of reading the official JavaScript/TypeScript documentation.

## Global Features
- [x] Authorization to Telegram account using [tdl](https://github.com/Bannerets/tdl "Node.js bindings to TDLib")
- [ ] Save session database to avoid re-authorization
- [ ] Support for multiple airdrop projects
- [ ] Support for multiple Telegram accounts

## Blum Interaction Features
- [x] Authorization to Blum bot (using web view data)
- [x] Claim daily rewards
- [x] Claim referral rewards
- [x] Start/Claim drop game
- [x] Start/Claim farming
- [x] Start/Claim social tasks

## Getting Started

### Prerequisites

Before you begin, ensure you have met the following requirements:
- You have installed [Bun](https://bun.sh "Bun is an all-in-one JavaScript runtime & toolkit") on your machine.
- You have a Telegram account.
- You have the Blum bot added to your Telegram chats. You can find it [here](https://t.me/BlumCryptoBot "Blum Bot on Telegram") or via this [referral link](https://t.me/BlumCryptoBot/app?startapp=ref_GQV3W2go3I "Blum Bot on Telegram with referral link").

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/alex-mxrz/Botify.git
    ```
2. Navigate to the project directory:
    ```bash
    cd Botify
    ```
3. Install the required packages:
    ```bash
    bun install
    ```
4. Configure the .env file (see [Configuration](#configuration)).

### Configuration

1. Create a `.env` file in the root directory of the project, and paste the following content:
    ```env
    TELEGRAM_API_ID = ...
    TELEGRAM_API_HASH = ...
    ```
2. Replace the `...` with your Telegram API ID and API hash. You can get these values by creating a new application on the [Telegram API website](https://my.telegram.org/apps "Telegram API website").

### Usage

1. Run the project with the following command:
    ```bash
    bun start
    ```
2. Follow the instructions in the console to authorize your Telegram account and interact with the bots.

## Contributing

If you would like to contribute to this project, please follow these steps:
1. Fork the repository.
2. Create a new branch: `git checkout -b feature-branch-name`
3. Make your changes and commit them: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature-branch-name`
5. Submit a pull request.

## License

This project is licensed under the GNU General Public License v3.0. See the [LICENSE](license) file for more information.

## Contact

If you have any questions or need further assistance, feel free to contact us:
- Telegram Support: [@less_support](https://t.me/less_support "Telegram Support")
- Join our Telegram channel to support and grow the Ukrainian and European crypto community: [Join our channel](https://t.me/money_less "Telegram Channel")

We appreciate your support and look forward to building a vibrant community together!
