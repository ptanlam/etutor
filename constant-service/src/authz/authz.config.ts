import { registerAs } from '@nestjs/config';

export default registerAs('idp', () => ({
  authority: process.env.IDENTITY_PROVIDER_AUTHORITY,
  audience: process.env.IDENTITY_PROVIDER_AUDIENCE,
}));
