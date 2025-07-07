import { Request, Response, NextFunction } from 'express'
import { firebaseAdmin } from '../utils/firebase'

export interface AuthenticatedRequest extends Request {
  uid?: string
}

/**
 * this function is a middleware which verifies the idToken sent by the client
 * @param req
 * @param res
 * @param next
 */
export async function authenticateToken(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization
  if (!authHeader?.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Missing or invalid Authorization header' })
  } else {
    const token = authHeader?.split(' ')[1]
    try {
      const decoded = await firebaseAdmin.auth().verifyIdToken(token)
      req.uid = decoded.uid
      next()
    } catch (error) {
      console.error('JWT verification failed:', error)
      res.status(403).json({ message: 'Invalid or expired token' })
    }
  }

}
