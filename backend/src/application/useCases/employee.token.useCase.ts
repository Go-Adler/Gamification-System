import jwt from 'jsonwebtoken'

export class TokenUseCase {
  generateTokenWithUserId(userId: string): string {
    const secretKey = process.env.JWT_SECRET_KEY!
    
    const token = jwt.sign({ userId }, secretKey, {
      expiresIn: '1h',
    })
    return token
  }
}
