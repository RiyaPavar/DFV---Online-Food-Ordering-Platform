import jwt from 'jsonwebtoken';

export function verifyAdminToken(request) {
  const authHeader = request.headers.get('authorization');
  const token = authHeader?.split(' ')[1];

  if (!token) return null;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role === 'admin' || decoded.role === 'master') {
      return decoded;
    }
    return null;
  } catch {
    return null;
  }
}
