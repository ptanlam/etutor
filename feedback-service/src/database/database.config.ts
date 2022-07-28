import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  user: process.env.DATABASE_USER,
  pass: process.env.DATABASE_PASS,
  uri: process.env.DATABASE_URI,
  name: process.env.DATABASE_NAME,
}));
