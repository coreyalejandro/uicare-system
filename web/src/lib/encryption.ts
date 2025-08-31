import { createCipheriv, createDecipheriv, randomBytes, createHash } from 'crypto';

const ALGORITHM = 'aes-256-gcm';

function getKey(key: string): Buffer {
  return createHash('sha256').update(key).digest();
}

export function encrypt(plain: string, key: string): string {
  const iv = randomBytes(16);
  const cipher = createCipheriv(ALGORITHM, getKey(key), iv);
  let encrypted = cipher.update(plain, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  const tag = cipher.getAuthTag().toString('hex');
  return `${iv.toString('hex')}:${tag}:${encrypted}`;
}

export function decrypt(payload: string, key: string): string {
  const [ivHex, tagHex, data] = payload.split(':');
  const decipher = createDecipheriv(ALGORITHM, getKey(key), Buffer.from(ivHex, 'hex'));
  decipher.setAuthTag(Buffer.from(tagHex, 'hex'));
  let decrypted = decipher.update(data, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}
