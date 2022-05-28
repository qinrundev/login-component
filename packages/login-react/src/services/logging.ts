import request from '@/utils/request';
import type { LoginSearches } from '@/types/logging';
import type { PaginationParams } from '@/types/pagination';

export async function getLoginLogsByDomain(domainId: string, params: PaginationParams & LoginSearches) {
  return request.get(`${API_SERVER}/log/domains/${domainId}/login-log`, {
    params,
  });
}
