import request from '@/utils/request';
import type { LoginParams, RelationIdentityUser } from '@/types/user';

export async function login(data: LoginParams) {
  return request(`${API_SERVER}/auth/login`, {
    method: 'POST',
    data,
  });
}

export async function appLogin(appId: string, data: LoginParams) {
  return request(`${API_SERVER}/auth/login/${appId}`, {
    method: 'POST',
    data,
  });
}

export async function getState() {
  return request(`${API_SERVER}/api/v1/auth/state`);
}

export async function createIdentityForUser(domainId: string, data: RelationIdentityUser) {
  return request.post(`${API_SERVER}/api/v1/domains/${domainId}/users/identity-providers`, {
    data,
  });
}

export async function getAppIdList(appId: string) {
  return request.get(`${API_SERVER}/api/v1/auth/${appId}/appid`);
}
