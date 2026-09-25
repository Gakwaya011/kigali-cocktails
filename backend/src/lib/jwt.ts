import jwt from 'jsonwebtoken';

const JWT_SECRET: string = (() => {
  const value = process.env.JWT_SECRET;
  if (!value) {
    throw new Error('JWT_SECRET is not set');
  }
  return value;
})();

export interface AuthTokenPayload {
  userId: string;
  role: 'USER' | 'ADMIN';
}

export function signAuthToken(payload: AuthTokenPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyAuthToken(token: string): AuthTokenPayload {
  const decoded = jwt.verify(token, JWT_SECRET);
  return decoded as unknown as AuthTokenPayload;
}
