import { registerAs } from '@nestjs/config';

export default registerAs('smtp', () => ({
  uri: process.env.SMTP_URI,
}));
