import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config()

export default function async (req, res, next) {
  const token = req.header('token');

  if (!token) {
    return res.status(403).json('Not Authorize');
  }

  try {
    const verify = jwt.verify(token, process.env.jwtSecret);
    req.trainer = verify.id;
    next();

  } catch (err) {
    console.error(err.message, 'Error: Error at authorization middleware');
    return res.status(403).json( {msg: 'Not Authorized'} );
  }
}