export interface Domain {
  id: string;
  name: string;
  tenantId: string;
  type: DomainType;
}

export enum DomainType {
  B2E = 'B2E',
  B2B = 'B2B',
  B2C = 'B2C',
}

export interface CreateDomainParams {
  name: string;
  type: DomainType;
}
