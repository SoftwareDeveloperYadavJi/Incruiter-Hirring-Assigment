import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const secret = process.env.SECRET || 'secret';

interface authRequest extends Request {
  user?: any;
}


export const auth = (req: authRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  if(!token) {  
    res.status(401).json({ message: 'No token provided' });
    return;
  }
    
  if (token) {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        res.status(401).json({ message: 'Invalid token' });
        return;
      }
      req.user = decoded;
      next();
    });
  } else {
    res.status(401).json({ message: 'No token provided' });
    return;
  }
};


export const isAdmin = (req: authRequest, res: Response, next: NextFunction) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
};