import {
  TelegramClient,
  type ClientSession as TelegramClientSession
} from '../telegram-client';

import type { AuthResponse } from './types/blum';
import type { ClientConfig, ClientSession } from './types/common';

export class BlumClient {
  public constructor(config: ClientConfig) {
    // Get a random latest version of Chrome for Android (120-125)
    const browserVersion = Math.floor(Math.random() * 6) + 120;

    this.config = {
      fetchOptions: {
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'sec-ch-ua-mobile': '?1',
          'sec-ch-ua-platform': 'Android',
          'sec-ch-ua': `"Chrome";v="${browserVersion}", "Chromium";v="${browserVersion}", "Not.A/Brand";v="24"`,
          'user-agent': `Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${browserVersion} Mobile Safari/537.3`,
          accept: 'application/json, text/plain, */*',
          origin: config.clientInfo.webappUrl
        },
        keepalive: false,
        referrer: config.clientInfo.webappUrl
      },
      ...config
    };

    this.telegramClient = new TelegramClient(config.client, config.clientInfo);
  }

  public async initialize(): Promise<boolean> {
    const telegramSession = await this.telegramClient.initialize();

    if (!telegramSession) {
      console.error(
        '@BlumClient.initialize => Telegram session is not initialized'
      );

      return false;
    }

    const session = await this.refreshSession(telegramSession);

    if (!session) {
      console.error('@BlumClient.initialize => Failed to refresh session');

      return false;
    }

    // Add authorization field to the headers
    this.config.fetchOptions.headers = {
      ...this.config.fetchOptions.headers,
      Authorization: `Bearer ${session.accessToken}`
    };

    return true;
  }

  private async refreshSession(
    telegramSession: TelegramClientSession
  ): Promise<ClientSession | undefined> {
    const webAppData =
      await this.telegramClient.extractWebAppData(telegramSession);

    if (!webAppData || webAppData.length <= 0) {
      console.error(
        '@BlumClient.refreshSession => Web app data is not provided'
      );

      return undefined;
    }

    const { gateUrl } = this.config;

    const response = await fetch(
      `${gateUrl}/v1/auth/provider/PROVIDER_TELEGRAM_MINI_APP`,
      {
        body: JSON.stringify({ webAppData }),
        method: 'POST'
      }
    );

    if (!response.ok) {
      console.error(
        `@BlumClient.refreshSession => Failed to fetch response, status: ${response.status}`
      );

      return undefined;
    }

    const token = ((await response.json()) as AuthResponse).token;

    return {
      accessToken: token.access,
      refreshToken: token.refresh
    };
  }

  private readonly config: Required<ClientConfig>;
  private readonly telegramClient: TelegramClient;
}
