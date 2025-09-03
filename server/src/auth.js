import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import z from "zod";
import { PrismaClient } from "../generated/prisma/index.js";

const prisma = new PrismaClient();
const router = express.Router();

const credentialsSchema = z.object({
  email: z.email(),
  password: z.string().min(6),
});

//USE_THIS: to register
router.post("/register", async (req, res) => {
  const parse = credentialsSchema.safeParse(req.body);
  //TODO:: remove deprecated usage
  if (!parse.success)
    return res.status(400).json({ error: parse.error.flatten() });

  const { email, password } = parse.data;
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return res.status(409).json({ error: "Email already in use." });

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { email, passwordHash, role: "USER" },
  });
  return res
    .status(201)
    .json({ id: user.id, email: user.email, role: user.role });
});

//USE_THIS: to log in
router.post("/login", async (req, res) => {
  const parse = credentialsSchema.safeParse(req.body);
  //TODO:: remove deprecated usage
  if (!parse.success)
    return res.status(400).json({ error: parse.error.flatten() });

  const { email, password } = parse.data;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(409).json({ error: "Email not found." });

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return res.status(401).json({ error: "Wrong password." });

  const token = jwt.sign(
    { userId: user.id, role: user.role, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  return res.json({
    token,
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
    },
  });
});

//USE_THIS: to validate token
router.get("/me", async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "No token provided" });

  const token = authHeader.split(" ")[1]; // Bearer <token>
  if (!token) return res.status(401).json({ error: "Invalid token format" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { id: true, email: true, role: true },
    });

    if (!user) return res.status(404).json({ error: "User not found" });

    res.json({ user });
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
});

export default router;
