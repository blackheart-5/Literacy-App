import jwt from 'jsonwebtoken';

export const verifyToken = (req) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]; // Extract the token from the authorization header
    if (!token) {
      throw new Error('Token not provided');
    }

    // Verify the token using your JWT secret key
    const user = jwt.verify(token, process.env.JWT_SECRET);
    return user;
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
};
