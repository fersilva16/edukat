type AuthConfig = {
  expirationTime: number;

  tokenLength: number;
};

const authConfig: AuthConfig = {
  expirationTime: 86_400_000,

  tokenLength: 60,
};

export default authConfig;
