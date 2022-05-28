export interface LoginParams {
  username: string;
  password: string;
  grant_type: string;
}

export interface CurrentUser {
  id: string;
  username: string;
  tenantId: string;
  domainId: string;
  email: string;
  cellphone: string;
  cellphoneNationCode: string;
}

export interface RelationIdentityUser {
  displayName?: string;
  headimgurl?: string;
  useHeadImgUrl?: boolean;
}

export interface GetWxUserInfoResp {
  nickname?: string;
  headimgurl?: string;
}

export interface GetAppIdResp {
  identityProviderTemplateId: string;
  appid?: string;
}
