export interface AuthResponse {
  readonly token: AuthToken;
}

export interface AuthToken {
  readonly access: string;
  readonly refresh: string;
  readonly user: {
    readonly id: { readonly id: string };
    readonly username: string;
  };
}

export interface BalanceResponse {
  readonly availableBalance: string;
  readonly farming: Farm;
  readonly playPasses: number;
  readonly timestamp: number;
}

export interface Farm {
  readonly balance: string;
  readonly earningsRate: string;
  readonly endTime: number;
  readonly startTime: number;
}

export interface FriendData {
  readonly farmBalance: string;
  readonly totalFriends: string;
  readonly username: string;
}

export interface FriendsBalanceResponse {
  readonly amountForClaim: string;
  readonly canClaim: boolean;
  readonly canClaimAt: string;
  readonly limitInvitation: string;
  readonly percentFromFriends: number;
  readonly percentFromFriendsOfFriends: number;
  readonly referralToken: string;
  readonly usedInvitation: string;
}

export interface FriendsResponse {
  readonly friends: FriendData[];
  readonly nextPageToken: string;
}

export interface GameStartRequest {
  readonly gameId: string;
}

export interface GamePayload {
  readonly gameId: string;
  readonly points: number;
}

export interface ProgressTarget {
  readonly accuracy: number;
  readonly progress: string;
  readonly target: string;
}

export interface SocialSubscription {
  readonly openInTelegram: boolean;
  readonly url: string;
}

export interface Task {
  readonly iconFileKey: string;
  readonly id: string;
  readonly isOngoing: boolean;
  readonly progressTarget?: ProgressTarget;
  readonly reward: string;
  readonly socialSubscription?: SocialSubscription;
  readonly status: string;
  readonly title: string;
  readonly type: string;
}

export interface TimeResponse {
  readonly now: number;
}

export type TasksResponse = readonly Task[];
