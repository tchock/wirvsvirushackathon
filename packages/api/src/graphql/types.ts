export type UserInfo = {
  iss: string;
  sub: string;
  aud: string[];
  iat: number;
  exp: number;
  azp: string;
  scope: string;
  permissions: string[];
};

export type ResolverContext = {
  user: UserInfo;
};
