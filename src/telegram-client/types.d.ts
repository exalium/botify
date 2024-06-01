export interface BotInfo {
  readonly botId: number;
  readonly chatId: number;
}

export interface ClientConfig {
  readonly databasePath?: string;
  readonly filesPath?: string;

  readonly apiHash: string;
  readonly apiId: number;
}

export interface ClientInfo {
  readonly botName: string;
  readonly webappUrl: string;
}

export interface ClientSession {
  readonly botAccountId: number;
  readonly botChatId: number;
  readonly firstName: string;
}
