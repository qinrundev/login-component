export interface User {
  id: string;
  username: string;
  tenantId: string;
  domainId: string;
  displayName?: string;
  email?: string;
  cellphone?: string;
  cellphoneNationCode?: string;
}

export interface Department {
  id: string;
  name: string;
  parent: string;
  children?: Department[];
}

export interface CreateUserParams {
  username: string;
  password: string;
}

export interface UpdateUserParams {
  displayName?: string;
  cellphone?: string;
  // cellphoneNationCode?: string;
  email?: string;
}

export interface GetDepartmentsParams {
  parent?: string;
}

export interface CreateDepartmentParams {
  name: string;
  parent?: string;
}

export interface UserSearches {
  username?: string;
  cellphone?: string;
  email?: string;
}
