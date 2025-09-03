import jwt from "jsonwebtoken";

//USE_THIS: to authenticate
export function authenticate(req, res, next) {
  const auth = req.headers.authorization;
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : null;
  if (!token) return res.status(401).json({ error: "Missing token" });

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: payload.userId, role: payload.role, email: payload.email };
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid bearer token" });
  }
}

//USE_THIS: to require admin
export function requireAdmin(req, res, next) {
  if (req.user?.role !== "ADMIN")
    return res.status(403).json({ error: "Admin only" });
  next();
}
