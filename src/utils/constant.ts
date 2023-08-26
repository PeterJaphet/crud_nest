import * as bcrypt from 'bcrypt';

export const jwtSecret = 'Peter@1960';

export const SALT = bcrypt.genSaltSync();
