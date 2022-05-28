import request from '@/utils/request';
import type { CreateDomainParams } from '@/types/domain';

export async function getDomainsByTenant(tenantId: string) {
  return request.get(`${API_SERVER}/api/v1/tenants/${tenantId}/domains`);
}

export async function createDomainForTenant(tenantId: string, data: CreateDomainParams) {
  return request.post(`${API_SERVER}/api/v1/tenants/${tenantId}/domains`, {
    data,
  });
}

