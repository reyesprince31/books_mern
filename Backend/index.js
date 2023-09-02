import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import booksRoutes from "./routes/booksRoute.js";

const app = express();
const PORT = process.env.PORT || 5555;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  console.log(req);
  return res.status(234).send("Welcome to my VLAG");
});

// app.post("/books", async (req, res) => {
//   const { title, author, publishYear } = req.body;

//   if (!title || !author || !publishYear) {
//     return res.status(400).send({
//       message: "Send all required fields",
//     });
//   }

//   const newBook = {
//     title,
//     author,
//     publishYear,
//   };

//   const book = await Book.create(newBook);

//   return res.status(201).send(book);
// });

// app.get("/books", async (req, res) => {
//   const books = await Book.find({});

//   return res.status(200).json({
//     count: books.length,
//     data: books,
//   });
// });

// app.get("/books/:id", async (req, res) => {
//   const { id } = req.params;

//   const book = await Book.findById(id);

//   return res.status(200).json(book);
// });

// app.put("/books/:id", async (req, res) => {
//   const { id } = req.params;
//   const { title, author, publishYear } = req.body;

//   if (!title || !author || !publishYear) {
//     return res.status(400).send({
//       message: "Send all required fields",
//     });
//   }

//   const result = await Book.findByIdAndUpdate(id, req.body);

//   if (!result) {
//     return res.status(404).json({
//       message: "Book not found",
//     });
//   }

//   return res.status(200).send({
//     message: "Book updated successfully",
//   });
// });

// app.delete("/books/:id", async (req, res) => {
//   const { id } = req.params;

//   const result = await Book.findByIdAndDelete(id);

//   if (!result) {
//     return res.status(404).json({
//       message: "Book not found",
//     });
//   }

//   return res.status(200).send({
//     message: "Book deleted successfully",
//   });
// });

app.use("/books", booksRoutes);

dotenv.config();
mongoose
  .connect(process.env.mongoURI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Connected to Port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB", err);
  });
