import express from "express";
import type { Request, Response } from "express";
import { body, validationResult } from "express-validator";

import * as BookService from "./book.service";

export const bookRouter = express.Router();

//  LIST ALL BOOKS
bookRouter.get("/", async (request: Request, response: Response) => {
  try {
    const books = await BookService.listBooks();
    return response.status(200).json(books);
  } catch (error: any) {
    return response.status(500).json(error.message);
  }
});

// GET A BOOK USING ID
bookRouter.get("/:id", async (request: Request, response: Response) => {
  const { id } = request.params;

  try {
    const book = await BookService.getBook(id);
    if (book) {
      return response.status(200).json(book);
    }
  } catch (error: any) {
    return response.status(500).json(error.message);
  }
});

// CREATE A BOOK
bookRouter.post(
  "/",
  body("title").isString(),
  body("authorId").isString(),
  body("datePublished").isString().toDate(),
  body("isFiction").isBoolean(),
  async (request: Request, response: Response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }
    try {
      const book = request.body;
      const newBook = await BookService.createBook(book);
      return response.status(201).json(newBook);
    } catch (error: any) {
      return response.status(500).json(error.message);
    }
  }
);

// UPDATE A BOOK
bookRouter.put(
  "/:id",
  body("title").isString(),
  body("authorId").isString(),
  body("datePublished").isString().toDate(),
  body("isFiction").isBoolean(),
  async (request: Request, response: Response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }
    const { id } = request.params;
    try {
      const book = request.body;
      const updatedBook = await BookService.updateBook(book, id);
      return response.status(201).json(updatedBook);
    } catch (error: any) {
      return response.status(500).json(error.message);
    }
  }
);

// DELETE A BOOK
bookRouter.delete("/:id", async (request: Request, response: Response) => {
  const { id } = request.params;
  try {
    await BookService.deleteBook(id);
    return response.status(204).json("Book was successfully deleted");
  } catch (error: any) {
    return response.status(500).json(error.message);
  }
});
