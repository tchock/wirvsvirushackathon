export type UserInfo = {
  iss: String;
  sub: String;
  aud: String[];
  iat: Number;
  exp: Number;
  azp: String;
  scope: String;
  permissions: String[];
};

export type ResolverContext = {
  user: UserInfo;
};
