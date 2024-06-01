import type {
  BalanceClaimResponse,
  BalanceResponse,
  Farm,
  FriendsClaimResponse,
  GamePayload,
  GameStartRequest,
  Task,
  TasksResponse,
  TimeResponse
} from './types/blum';

import type { FetchRequestInit } from './types/common';

export async function claimDailyReward(
  baseUrl: string,
  fetchOptions: FetchRequestInit
): Promise<boolean | undefined> {
  const response = await fetch(`${baseUrl}/api/v1/daily-reward`, {
    ...fetchOptions,
    method: 'POST'
  });

  // status 200 - Reward claimed
  // status 400 - Reward already claimed

  switch (response.status) {
    case 200:
      return true;
    case 400:
      return false;
    default:
      break;
  }

  console.error(
    `@claimDailyReward => Failed to fetch response, status: ${response.status}`
  );

  return undefined;
}

export async function claimFarm(
  baseUrl: string,
  fetchOptions: FetchRequestInit
): Promise<BalanceClaimResponse | undefined> {
  const response = await fetch(`${baseUrl}/api/v1/farming/claim`, {
    ...fetchOptions,
    method: 'POST'
  });

  if (!response.ok) {
    console.error(
      `@claimFarm => Failed to fetch response, status: ${response.status}`
    );

    return undefined;
  }

  return response.json();
}

export async function claimReferralReward(
  baseUrl: string,
  fetchOptions: FetchRequestInit
): Promise<FriendsClaimResponse | undefined> {
  const response = await fetch(`${baseUrl}/v1/friends/claim`, {
    ...fetchOptions,
    method: 'POST'
  });

  if (!response.ok) {
    console.error(
      `@claimReferralReward => Failed to fetch response, status: ${response.status}`
    );

    return undefined;
  }

  return response.json();
}

export async function completeGame(
  baseUrl: string,
  payload: GamePayload,
  fetchOptions: FetchRequestInit
): Promise<boolean> {
  const response = await fetch(`${baseUrl}/api/v1/game/claim`, {
    ...fetchOptions,
    method: 'POST',
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    console.error(
      `@completeGame => Failed to fetch response, status: ${response.status}`
    );

    return false;
  }

  return true;
}

export async function completeTask(
  baseUrl: string,
  taskId: string,
  fetchOptions: FetchRequestInit
): Promise<Task | undefined> {
  const response = await fetch(`${baseUrl}/api/v1/tasks/${taskId}/claim`, {
    ...fetchOptions,
    method: 'POST'
  });

  if (!response.ok) {
    console.error(
      `@completeTask => Failed to fetch response, status: ${response.status}`
    );

    return undefined;
  }

  return response.json();
}

export async function currentBalance(
  baseUrl: string,
  fetchOptions: FetchRequestInit
): Promise<BalanceResponse | undefined> {
  const response = await fetch(`${baseUrl}/api/v1/user/balance`, {
    ...fetchOptions,
    method: 'GET'
  });

  if (!response.ok) {
    console.error(
      `@currentBalance => Failed to fetch response, status: ${response.status}`
    );

    return undefined;
  }

  return response.json();
}

export async function currentTime(
  baseUrl: string,
  fetchOptions: FetchRequestInit
): Promise<TimeResponse | undefined> {
  const response = await fetch(`${baseUrl}/api/v1/time/now`, {
    ...fetchOptions,
    method: 'GET'
  });

  if (!response.ok) {
    console.error(
      `@currentTime => Failed to fetch response, status: ${response.status}`
    );

    return undefined;
  }

  return response.json();
}

export async function startFarm(
  baseUrl: string,
  fetchOptions: FetchRequestInit
): Promise<Farm | undefined> {
  const response = await fetch(`${baseUrl}/api/v1/farm/start`, {
    ...fetchOptions,
    method: 'POST'
  });

  if (!response.ok) {
    console.error(
      `@startFarm => Failed to fetch response, status: ${response.status}`
    );

    return undefined;
  }

  return response.json();
}

export async function startGame(
  baseUrl: string,
  fetchOptions: FetchRequestInit
): Promise<GameStartRequest | undefined> {
  const response = await fetch(`${baseUrl}/api/v1/game/play`, {
    ...fetchOptions,
    method: 'POST'
  });

  if (!response.ok) {
    console.error(
      `@startGame => Failed to fetch response, status: ${response.status}`
    );

    return undefined;
  }

  return response.json();
}

export async function startTask(
  baseUrl: string,
  taskId: string,
  fetchOptions: FetchRequestInit
): Promise<Task | undefined> {
  const response = await fetch(`${baseUrl}/api/v1/tasks/${taskId}/start`, {
    ...fetchOptions,
    method: 'POST'
  });

  if (!response.ok) {
    console.error(
      `@startTask => Failed to fetch response, status: ${response.status}`
    );

    return undefined;
  }

  return response.json();
}

export async function taskList(
  baseUrl: string,
  fetchOptions: FetchRequestInit
): Promise<TasksResponse | undefined> {
  const response = await fetch(`${baseUrl}/api/v1/tasks`, {
    ...fetchOptions,
    method: 'GET'
  });

  if (!response.ok) {
    console.error(
      `@taskList => Failed to fetch response, status: ${response.status}`
    );

    return undefined;
  }

  return response.json();
}
