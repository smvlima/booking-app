import express from "express";
import z from "zod";
import { PrismaClient } from "../generated/prisma/index.js";
import { authenticate } from "./middleware.js";

const prisma = new PrismaClient();
const router = new express.Router();

const bookingSchema = z.object({
  dateTime: z.iso.date(),
  partySize: z.number().int().min(1),
  note: z.string().optional(),
});

//All the following routes require authentication
router.use(authenticate);

//USE_THIS: to see bookings (ADMIN - all , USER - owner)
router.get("/", async (req, res) => {
  const isAdmin = req.user.role === "ADMIN";
  const bookings = await prisma.bookings.findMany({
    where: isAdmin ? {} : { userId: req.user.id },
    orderBy: { dateTime: "desc" },
    include: isAdmin
      ? { user: { select: { email: true, id: true } } }
      : undefined,
  });
  res.json(bookings);
});

//USE_THIS: to add a booking
router.post("/", async (req, res) => {
  const parse = bookingSchema.safeParse(req.body);
  if (!parse.success)
    //TODO:: remove deprecated usage
    return res.status(400).json({ error: parse.error.flatten() });

  const { dateTime, partySize, note } = parse.data;
  const booking = await prisma.bookings.create({
    data: {
      dateTime: new Date(dateTime),
      partySize,
      note,
      userId: req.user.id,
    },
  });
  res.status(201).json(booking);
});

//USE_THIS: to delete a booking
router.delete("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const existing = await prisma.bookings.findUnique({ where: { id } });
  if (!existing) return res.status(404).json({ error: "Booking not found" });
  const isOwner = existing.userId === req.user.id;
  const isAdmin = req.user.role === "ADMIN";
  if (!isOwner && !isAdmin) return res.status(403).json({ error: "Forbidden" });
  await prisma.bookings.delete({ where: { id } });
  res.json({ ok: true });
});

export default router;
