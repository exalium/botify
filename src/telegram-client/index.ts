import { configure, createClient } from '@telegram';
import { getTdjson } from '@telegram/prebuild';

import type { BotInfo, ClientConfig, ClientInfo, ClientSession } from './types';

export class TelegramClient {
  public constructor(config: ClientConfig, info: ClientInfo) {
    this.client = createClient({
      apiHash: config.apiHash,
      apiId: config.apiId,
      databaseDirectory: config.databasePath ?? TelegramClient.databasePath,
      filesDirectory: config.filesPath ?? TelegramClient.filesPath,
      skipOldUpdates: true,
      tdlibParameters: {
        application_version: '0.1a',
        device_model: 'botify',
        system_language_code: 'en',
        system_version: 'botify',
        use_message_database: true,
        use_secret_chats: false
      },
      useTestDc: false
    });

    this.clientInfo = info;
  }

  public async [Symbol.asyncDispose](): Promise<void> {
    await this.close();
  }

  public async close(): Promise<void> {
    await this.client.invoke({
      _: 'logOut'
    });

    await this.client.close();
  }

  public async extractWebAppData(
    clientSession: ClientSession
  ): Promise<string | undefined> {
    const webAppUrl = this.clientInfo.webappUrl;

    if (!webAppUrl || webAppUrl.length <= 0) {
      console.error(
        '@TelegramClient.extractWebAppData => Web app URL is not provided, check configuration'
      );

      return undefined;
    }

    const { url } = await this.client.invoke({
      _: 'openWebApp',
      bot_user_id: clientSession.botAccountId,
      chat_id: clientSession.botChatId,
      url: webAppUrl
    });

    if (!url || url.length <= 0) {
      console.error(
        '@TelegramClient.extractWebAppData => Failed to open web app'
      );

      return undefined;
    }

    return decodeURIComponent(
      url.slice(
        url.indexOf(TelegramClient.appDataKey) +
          TelegramClient.appDataKey.length,
        url.indexOf(TelegramClient.appVersionKey)
      )
    );
  }

  public async initialize(): Promise<ClientSession | undefined> {
    const username = await this.authorize();

    if (!username || username.length <= 0) {
      console.error(
        '@TelegramClient.initialize => Failed to authorize in Telegram'
      );

      return undefined;
    }

    console.log(`@TelegramClient.initialize => Authorized as '${username}'`);

    const botInfo = await this.botInfo();

    if (!botInfo) {
      console.error('@TelegramClient.initialize => Failed to get bot info');

      return undefined;
    }

    console.log(
      `@TelegramClient.initialize => Found '${this.clientInfo.botName}' bot, with id '${botInfo.botId}'`
    );

    return {
      botAccountId: botInfo.botId,
      botChatId: botInfo.chatId,
      username
    };
  }

  public static configureTdLib(): void {
    configure({
      tdjson: getTdjson()
    });
  }

  private async authorize(): Promise<string | undefined> {
    await this.client.login();

    const data = await this.client.invoke({
      _: 'getMe'
    });

    if (data._ !== 'user') {
      console.error(
        '@TelegramClient.authorize => Current telegram account is not a user'
      );

      return undefined;
    }

    return data.first_name;
  }

  private async botInfo(): Promise<BotInfo | undefined> {
    const botName = this.clientInfo.botName;

    if (!botName || botName.length <= 0) {
      console.error(
        '@TelegramClient.getBotInfo => Bot name is not provided, check configuration'
      );

      return undefined;
    }

    const chatList = await this.client.invoke({
      _: 'getChats',
      // https://t.me/premium/3
      limit: 1000
    });

    if (chatList.total_count <= 0) {
      console.error(
        '@TelegramClient.getBotInfo => No chats found, did you send message to bot?'
      );

      return undefined;
    }

    for await (const chat of chatList.chat_ids) {
      const data = await this.client.invoke({
        _: 'getChat',
        chat_id: chat
      });

      if (data.title === botName && !data.type.is_channel) {
        return {
          botId: data.id,
          chatId: chat
        };
      }
    }

    console.error(
      `@TelegramClient.getBotInfo => Bot '${botName}' not found in chats`
    );

    return undefined;
  }

  private readonly client: ReturnType<typeof createClient>;
  private readonly clientInfo: ClientInfo;

  private static readonly appDataKey = '#tgWebAppData=';
  private static readonly appVersionKey = '&tgWebAppVersion';
  private static readonly databasePath = '.temp/db';
  private static readonly filesPath = '.temp/files';
}

export type * from './types';
