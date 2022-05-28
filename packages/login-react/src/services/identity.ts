import request from '@/utils/request';
import type { CreateApplicationParams } from '@/types/application';
import type { PaginationParams } from '@/types/pagination';
import {
  getIdentityTemplatesParams,
  UpdateAppParams,
  UpdateIdentityParams,
} from '@/types/identity';

export async function getIdentityByDomain(domainId: string, pagination: PaginationParams) {
  //console.log('pagination',pagination)
  const url = `${API_SERVER}/api/v1/domains/${domainId}/identity-providers`;
  const res = request.get(url, {
    params: pagination,
  });
  //console.log(url,res);
  return res;
}
export async function createIdentityForDomain(domainId: string, data: CreateApplicationParams) {
  return request.post(`${API_SERVER}/api/v1/domains/${domainId}/identity-providers`, {
    data,
  });
}
export async function getIdentityInfo(domainId: string, identityId: string) {
  const url = `${API_SERVER}/api/v1/domains/${domainId}/identity-providers/${identityId}`;
  const res = request.get(url);
  //console.log(url,res);
  return res;
}

export async function updateIdentityForDomain(domainId: string, identity: UpdateIdentityParams) {
  return await request.put(
    `${API_SERVER}/api/v1/domains/${domainId}/identity-providers/${identity.id}`,
    {
      data: identity,
    },
  );
}

export async function deleteIdentity(domainId: string, identityId: string) {
  const url = `${API_SERVER}/api/v1/domains/${domainId}/identity-providers/${identityId}`;
  const res = request.delete(url);
  //console.log(url,res);
  return res;
}

export async function getIdentityTemplates(reqParams: getIdentityTemplatesParams) {
  //console.log('pagination',pagination)
  const url = `${API_SERVER}/api/v1/identity-provider-templates`;
  const res = request.get(url, {
    params: reqParams,
  });
  //console.log(url,res);
  return res;
}

export async function getIdentityApps(domainId: string, identityId: string) {
  const url = `${API_SERVER}/api/v1/domains/${domainId}/identity-providers/${identityId}/applications`;
  const res = request.get(url);
  //console.log(url,res);
  return res;
}

export async function updateIdentityApp(domainId: string, obj: UpdateAppParams) {
  return await request.put(
    `${API_SERVER}/api/v1/domains/${domainId}/identity-providers/applications`,
    {
      data: obj,
    },
  );
}
