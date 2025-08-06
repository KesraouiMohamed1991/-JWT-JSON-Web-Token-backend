import jwt from 'jsonwebtoken';

export default function authenticate(req, res, next) {
  const token = req.cookies.jwt;
  if (!token) return res.status(401).json({ error: 'No token' });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.user = decoded;
    next();
  });
}
