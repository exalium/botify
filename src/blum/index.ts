import {
  TelegramClient,
  type ClientSession as TelegramClientSession
} from '../telegram-client';

import * as api from './api';

import type { AuthResponse } from './types/blum';

import type {
  ClientConfig,
  ClientSession,
  FetchRequestInit
} from './types/common';

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
    this.telegramClientSession = await this.telegramClient.initialize();

    if (!this.telegramClientSession) {
      console.error(
        '@BlumClient.initialize => Telegram session is not initialized'
      );

      return false;
    }

    return true;
  }

  public async run(): Promise<boolean> {
    const session = await this.refreshSession(this.telegramClientSession);

    if (!session) {
      console.error('@BlumClient.initialize => Failed to refresh session');

      return false;
    }

    const { fetchOptions: oldFetchOptions, gameUrl, gateUrl } = this.config;
    const { firstName } = this.telegramClientSession!;

    const fetchOptions: FetchRequestInit = {
      ...oldFetchOptions,
      headers: {
        ...oldFetchOptions.headers,
        Authorization: `Bearer ${session.accessToken}`
      }
    };

    const dailyRewardStatus = await api.claimDailyReward(gameUrl, fetchOptions);

    if (dailyRewardStatus === undefined) {
      console.error(
        `@BlumClient.run [${firstName}] => Failed to claim daily reward`
      );

      return false;
    }

    console.log(
      `@BlumClient.run [${firstName}] => Daily reward status: ${
        dailyRewardStatus ? 'claimed' : 'already claimed'
      }`
    );

    const balanceResponse = await api.currentBalance(gameUrl, fetchOptions);

    if (!balanceResponse) {
      console.error(
        `@BlumClient.run [${firstName}] => Failed to fetch current balance`
      );

      return false;
    }

    console.log(
      `@BlumClient.run [${firstName}] => Current balance: ${balanceResponse.availableBalance}`
    );

    const timeResponse = await api.currentTime(gameUrl, fetchOptions);

    if (!timeResponse) {
      console.error(
        `@BlumClient.run [${firstName}] => Failed to fetch current time`
      );

      return false;
    }

    if (balanceResponse.farming.endTime <= timeResponse.now) {
      const farmResponse = await api.claimFarm(gameUrl, fetchOptions);

      if (!farmResponse) {
        console.error(
          `@BlumClient.run [${firstName}] => Failed to claim farm reward`
        );

        return false;
      }

      console.log(
        `@BlumClient.run [${firstName}] => Farm reward claimed, balance: ${farmResponse.availableBalance}`
      );
    }

    // TODO: Implement farm reward claiming

    for (let i = balanceResponse.playPasses; i > 0; --i) {
      const playGameStatus = await this.playGame(fetchOptions);

      if (!playGameStatus) {
        console.error(`@BlumClient.run [${firstName}] => Failed to play game`);
      }
    }

    const claimTasksStatus = await this.claimTasks(fetchOptions);

    if (!claimTasksStatus) {
      console.error(`@BlumClient.run [${firstName}] => Failed to claim tasks`);

      return false;
    }

    // TODO: Implement friend reward claiming

    return true;
  }

  private async claimTasks(fetchOptions: FetchRequestInit): Promise<boolean> {
    const { gameUrl } = this.config;

    const taskListResponse = await api.taskList(gameUrl, fetchOptions);

    if (!taskListResponse || taskListResponse.length <= 0) {
      console.error('@BlumClient.claimTasks => Failed to fetch task list');

      return false;
    }

    for await (const { id, progressTarget, status } of taskListResponse) {
      if (status === 'CLAIMED' || status === 'DONE') {
        continue;
      }

      if (status === 'NOT_STARTED') {
        const startTaskResponse = await api.startTask(
          gameUrl,
          id,
          fetchOptions
        );

        if (!startTaskResponse || startTaskResponse.status !== 'STARTED') {
          console.error(
            `@BlumClient.claimTasks => Failed to start task with id: ${id}`
          );

          continue;
        }

        console.log(`@BlumClient.claimTasks => Task started with id: ${id}`);
      }

      if (progressTarget && progressTarget.target > progressTarget.progress) {
        continue;
      }

      const claimTaskResponse = await api.completeTask(
        gameUrl,
        id,
        fetchOptions
      );

      if (
        !claimTaskResponse ||
        (claimTaskResponse.status !== 'CLAIMED' &&
          claimTaskResponse.status !== 'DONE')
      ) {
        console.error(
          `@BlumClient.claimTasks => Failed to claim task with id: ${id}`
        );

        continue;
      }

      console.log(`@BlumClient.claimTasks => Task claimed with id: ${id}`);
    }

    return true;
  }

  private async playGame(fetchOptions: FetchRequestInit): Promise<boolean> {
    const { gameUrl } = this.config;

    const gameStartResponse = await api.startGame(gameUrl, fetchOptions);

    if (!gameStartResponse?.gameId) {
      console.error('@BlumClient.playGame => Failed to start game');

      return false;
    }

    return api.completeGame(
      gameUrl,
      {
        gameId: gameStartResponse.gameId,
        // random between 250-275
        points: Math.floor(Math.random() * 25) + 250
      },
      fetchOptions
    );
  }

  private async refreshSession(
    telegramSession?: TelegramClientSession
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

  private telegramClientSession?: TelegramClientSession;

  private readonly config: Required<ClientConfig>;
  private readonly telegramClient: TelegramClient;
}
