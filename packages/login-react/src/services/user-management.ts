import request from '@/utils/request';
import type {
  UserSearches,
  CreateUserParams,
  UpdateUserParams,
  GetDepartmentsParams,
  CreateDepartmentParams,
} from '@/types/user-management';
import type { PaginationParams } from '@/types/pagination';

export async function getUsersByDomain(domainId: string, pagination: PaginationParams & UserSearches) {
  return request.get(`${API_SERVER}/api/v1/domains/${domainId}/users`, {
    params: pagination,
  });
}

export async function createUserForDomain(domainId: string, data: CreateUserParams) {
  return request.post(`${API_SERVER}/api/v1/domains/${domainId}/users`, {
    data,
  });
}

export async function updateUserForDomain(domainId: string, user: { id: string } & UpdateUserParams) {
  return request.put(`${API_SERVER}/api/v1/domains/${domainId}/users/${user.id}`, {
    data: user,
  });
}

export async function getUserInfo(domainId: string, userId: string) {
  return request.get(`${API_SERVER}/api/v1/domains/${domainId}/users/${userId}`);
}

export async function deleteUser(domainId: string, userId: string) {
  return request.delete(`${API_SERVER}/api/v1/domains/${domainId}/users/${userId}`);
}

export async function getDepartmentsByDomain(domainId: string, params: GetDepartmentsParams) {
  return request.get(`${API_SERVER}/api/v1/domains/${domainId}/departments`, {
    params,
  });
}

export async function createDepartmentForDomain(domainId: string, data: CreateDepartmentParams) {
  return request.post(`${API_SERVER}/api/v1/domains/${domainId}/departments`, {
    data,
  });
}

export async function getDepartmentInfo(domainId: string, departmentId: string) {
  return request.get(`${API_SERVER}/api/v1/domains/${domainId}/departments/${departmentId}`);
}

export async function deleteDepartment(domainId: string, departmentId: string) {
  return request.delete(`${API_SERVER}/api/v1/domains/${domainId}/departments/${departmentId}`);
}

export async function getUsersByDepartment(
  domainId: string,
  departmentId: string,
  pagination: PaginationParams,
) {
  return request.get(`${API_SERVER}/api/v1/domains/${domainId}/departments/${departmentId}/users`, {
    params: pagination,
  });
}

export async function addUsersToDepartment(
  domainId: string,
  departmentId: string,
  users: string[],
) {
  return request.put(`${API_SERVER}/api/v1/domains/${domainId}/departments/${departmentId}/users`, {
    data: {
      users,
    },
  });
}

export async function removeUsersToDepartment(
  domainId: string,
  departmentId: string,
  users: string[],
) {
  return request.delete(
    `${API_SERVER}/api/v1/domains/${domainId}/departments/${departmentId}/users`,
    {
      data: {
        users,
      },
    },
  );
}
