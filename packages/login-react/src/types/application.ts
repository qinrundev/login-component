export interface Application {
  id: string;
  name: string;
  type: string;
  authorized: boolean;
  logoURL?: string;
  address?: string;
  client_id: string;
  client: {
    id: string;
    secret: string;
  };
}

export interface CreateApplicationParams {
  name: string;
  type: string;
  authorized: boolean;
}
