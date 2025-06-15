import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";
import noteRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

//miidddle ware
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(express.json()); //parese json values

app.use(rateLimiter);

// app.use((req, res, next) => {
//   console.log(`request method is ${req.method} req url is ${req.url}`);
//   next();
// });

app.use("/api/notes", noteRoutes);
connectDB().then(() => {
  app.listen(5001, () => {
    console.log("server started in port :", PORT);
  });
});

//schizophrenia
// Endpoint? - combo of url + http method that lets client interact with a specific resource.

// app.get("/api/notes", (req, res) => {
//   res.status(200).send("you got 5 notes");
// });

// app.post("/api/notes", (req, res) => {
//   res.status(201).json({ message: "Note created successfully!" });
// });

// app.post("/api/notes/:id", (req, res) => {
//   res.status(200).json({ message: "Note updated successfully!" });
// });

// app.delete("/api/notes/:id", (req, res) => {
//   res.status(200).json({ message: "Note delete successfully!" });
// });
