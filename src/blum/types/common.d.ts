import type {
  ClientConfig as TelegramClientConfig,
  ClientInfo as TelegramClientInfo
} from '../../telegram-client';

export interface ClientConfig {
  readonly fetchOptions?: FetchRequestInit;

  readonly client: TelegramClientConfig;
  readonly clientInfo: TelegramClientInfo;
  readonly gameUrl: string;
  readonly gateUrl: string;
}

export interface ClientSession {
  readonly accessToken: string;
  readonly refreshToken: string;
}

// This interface is a part of the bun project, and it's not a part of the Fetch API specification.
// Copied from bun-types/global.d.ts (https://github.com/oven-sh/bun/blob/main/packages/bun-types/globals.d.ts#L801)
// Removed the unnecessary properties.
export interface FetchRequestInit extends RequestInit {
  proxy?: string;
}
