import request from '@/utils/request';

export async function queryCurrentUser() {
  return request.get(`${API_SERVER}/api/v1/user-info`);
}

