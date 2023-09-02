// bookRoutes.js

import express from "express";
import { Book } from "../models/bookModel.js";

const router = express.Router();

// Define CRUD operations for the Book model

// Create a new book
router.post("/", async (req, res, next) => {
  try {
    const { title, author, publishYear } = req.body;
    if (!title || !author || !publishYear) {
      throw new Error("Send all required fields");
    }
    const newBook = await Book.create({ title, author, publishYear });
    res.status(201).json(newBook);
  } catch (error) {
    next(error);
  }
});

// Get all books
router.get("/", async (req, res, next) => {
  try {
    const books = await Book.find({});
    res.status(200).json({ count: books.length, data: books });
  } catch (error) {
    next(error);
  }
});

// Get a book by ID
router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const book = await Book.findById(id);
    if (!book) {
      res.status(404).json({ message: "Book not found" });
    } else {
      res.status(200).json(book);
    }
  } catch (error) {
    next(error);
  }
});

// Update a book by ID
router.put("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const { title, author, publishYear } = req.body;
    if (!title || !author || !publishYear) {
      throw new Error("Send all required fields");
    }
    const result = await Book.findByIdAndUpdate(id, req.body);
    if (!result) {
      res.status(404).json({ message: "Book not found" });
    } else {
      res.status(200).json({ message: "Book updated successfully" });
    }
  } catch (error) {
    next(error);
  }
});

// Delete a book by ID
router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await Book.findByIdAndDelete(id);
    if (!result) {
      res.status(404).json({ message: "Book not found" });
    } else {
      res.status(200).json({ message: "Book deleted successfully" });
    }
  } catch (error) {
    next(error);
  }
});

export default router;
