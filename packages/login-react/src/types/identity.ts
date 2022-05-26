export interface Identity {
  id: string;
  name: string;
  templateName: string;
  templateLogo: string;
  identityProviderTemplateId: string;
}

export interface IdentitySearches {
  category?: string;
}

export interface CreateIdentityParams {
  name: string;
  appid: string;
  identityProviderTemplateId: string;
  secret: string;
}

export interface UpdateIdentityParams {
  id: string;
  name: string;
  type: string;
  secret: string;
}

export interface IdentityTemplates {
  id: string;
  category: string;
  logo: string;
  name: string;
  desc: string;
}

export interface Apps {
  applicationId: string;
  name: string;
  logoURL: string;
  enabled: boolean;
}

export interface UpdateAppParams {
  applicationId: [string];
  enabled: boolean;
  identityProviderId: string;
}
export interface getIdentityTemplatesParams {
  category: string;
}
