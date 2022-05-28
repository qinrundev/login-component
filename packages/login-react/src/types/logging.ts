import type { User } from './user-management';

export interface LoginLog {
  id: string;
  timestamp: number;
  userID: string;
  status: 0 | 1;
  ipv4: string;
  description: string;
  userInfo?: User;
}

export interface LoginSearches {
  userID?: string;
  ipv4?: string;
  startAt?: number;
  endAt?: number;
}

export interface OperationLog {
  id: string;
  timestamp: number;
  userID: string;
  status: 0 | 1;
  ipv4: string;
  description: string;
}
