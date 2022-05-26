import request from '@/utils/request';
import type { CreateApplicationParams, Application } from '@/types/application';
import type { PaginationParams } from '@/types/pagination';

export async function getApplicationsByDomain(domainId: string, pagination: PaginationParams) {
  return request.get(`${API_SERVER}/api/v1/domains/${domainId}/applications`, {
    params: pagination,
  });
}

export async function createApplicationForDomain(domainId: string, data: CreateApplicationParams) {
  return request.post(`${API_SERVER}/api/v1/domains/${domainId}/applications`, {
    data,
  });
}

export async function updateApplicationForDomain(domainId: string, application: Application) {
  return request.put(`${API_SERVER}/api/v1/domains/${domainId}/applications/${application.id}`, {
    data: application,
  });
}

export async function getApplicationInfo(domainId: string, appId: string) {
  return request.get(`${API_SERVER}/api/v1/domains/${domainId}/applications/${appId}`);
}

export async function deleteApplication(domainId: string, appId: string) {
  return request.delete(`${API_SERVER}/api/v1/domains/${domainId}/applications/${appId}`);
}
