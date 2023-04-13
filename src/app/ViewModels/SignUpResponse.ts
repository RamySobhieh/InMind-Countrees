export interface SignUpResponse {
  id: string;
  createdTimestamp: number;
  username: string;
  enabled: boolean;
  totp: boolean;
  emailVerified: boolean;
  firstName: string;
  lastName: string;
  email: string;
  disableableCredentialTypes: any[];
  requiredActions: any[];
  notBefore: number;
  access: Access;
  attributes: any;
}

export interface Access {
  manageGroupMembership: boolean;
  view: boolean;
  mapRoles: boolean;
  impersonate: boolean;
  manage: boolean;
}
