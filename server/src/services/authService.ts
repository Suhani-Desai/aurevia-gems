import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../utils/prisma.js';
import { AppError } from '../utils/AppError.js';
import { toPublicUser } from '../utils/toPublicUser.js';
import type { LoginInput } from '../validators/authValidators.js';
import type { AuthTokenPayload, PublicUser } from '../types/index.js';

function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new AppError('JWT secret is not configured', 500);
  }
  return secret;
}

function signToken(payload: AuthTokenPayload): string {
  return jwt.sign(payload, getJwtSecret(), { expiresIn: '7d' });
}

export async function login(
  input: LoginInput,
): Promise<{ user: PublicUser; token: string }> {
  const user = await prisma.user.findUnique({
    where: { email: input.email.toLowerCase() },
  });

  if (!user) {
    throw new AppError('Invalid email or password', 401);
  }

  const isValid = await bcrypt.compare(input.password, user.passwordHash);

  if (!isValid) {
    throw new AppError('Invalid email or password', 401);
  }

  const tokenPayload: AuthTokenPayload = {
    userId: user.id,
    email: user.email,
    role: user.role,
  };

  return {
    user: toPublicUser(user),
    token: signToken(tokenPayload),
  };
}

export async function getCurrentUser(userId: string): Promise<PublicUser> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new AppError('User not found', 404);
  }

  return toPublicUser(user);
}
