import express from "express";
import cors from "cors";
import authRoutes from "./auth.js";
import bookingRoutes from "./bookings.js";

const app = express();
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

app.get("/", (_req, res) => res.json({ status: "ok" }));
app.use("/auth", authRoutes);
app.use("/bookings", bookingRoutes);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`API running on http://localhost:${port}`));
