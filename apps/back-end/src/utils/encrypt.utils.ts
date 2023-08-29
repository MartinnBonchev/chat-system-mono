import * as bcrypt from 'bcryptjs';

export function hash(data: string) {
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  return bcrypt.hashSync(data, salt);
}

export function compare(data: string, hashedData: string) {
  return bcrypt.compare(data, hashedData);
}
