import jwt from 'jsonwebtoken'   
import type { User } from '../generated/prisma/index.d.ts'

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable is not defined');
}

export const generateAccessToken = (user : User) => {
  return jwt.sign(
    { userId: user.id, role : user.role }, 
    JWT_SECRET,
    { expiresIn: '15m' }
  );
}

export const generateRefreshToken = (user : User) => {
  return jwt.sign(
    { userId : user.id, role : user.role },
    JWT_SECRET,
    {expiresIn: '7d' }
  )
}

export const verifyToken = (token : string) => {
  try {
    return jwt.verify(token, JWT_SECRET)
  } catch (error) {
    throw new Error('Invalid token');
  }
}