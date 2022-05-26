import type { LoginModelState } from './login';
import type { DomainModelState } from '@/pages/domain/models/domain';
import type { ApplicationModelState } from '@/pages/application/models/application';
import type { UserManagementModelState } from '@/pages/user-management/models/user';
import type { LoggingModelState } from '@/pages/logging/models/logging';
import {IdentityModelState} from "@/pages/identity/models/identity";

export interface Loading {
  effects: Record<string, boolean | undefined>;
  models: {
    login?: boolean;
    domain?: boolean;
    application?: boolean;
    userManagement?: boolean;
    logging?: boolean;
  };
}

export interface ConnectState {
  loading: Loading;
  login: LoginModelState;
  domain: DomainModelState;
  application: ApplicationModelState;
  userManagement: UserManagementModelState;
  logging: LoggingModelState;
  identity: IdentityModelState;
}
