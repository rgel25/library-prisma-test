import express from "express";
import type { Request, Response } from "express";
import { body, validationResult } from "express-validator";

import * as AuthorService from "./author.service";
import { db } from "../utils/db.server";

export const authorRouter = express.Router();

// LIST ALL AUTHORS
authorRouter.get("/", async (request: Request, response: Response) => {
  try {
    const authors = await AuthorService.listAuthors();
    return response.status(200).json(authors);
  } catch (error: any) {
    return response.status(500).json(error.message);
  }
});

// GET ONE AUTHOR USING ID
authorRouter.get("/:id", async (request: Request, response: Response) => {
  const { id } = request.params;
  try {
    const author = await AuthorService.getAuthor(id);
    return response.status(200).json(author);
  } catch (error: any) {
    return response.status(500).json(error.message);
  }
});

// CREATE AN AUTHOR
authorRouter.post(
  "/",
  body("firstName").isString(),
  body("lastName").isString(),
  async (request: Request, response: Response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }
    try {
      const author = request.body;
      const newAuthor = await AuthorService.createAuthor(author);
      return response.status(201).json(newAuthor);
    } catch (error: any) {
      return response.status(500).json(error.message);
    }
  }
);

// UPDATE AN AUTHOR
authorRouter.put(
  "/:id",
  body("firstName").isString(),
  body("lastName").isString(),
  async (request: Request, response: Response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }
    const { id } = request.params;
    try {
      const author = request.body;
      const updatedAuthor = await AuthorService.updateAuthor(author, id);
      return response.status(200).json(updatedAuthor);
    } catch (error: any) {
      return response.status(500).json(error.message);
    }
  }
);

// DELETE AN AUTHOR
authorRouter.delete("/:id", async (request: Request, response: Response) => {
  const { id } = request.params;
  try {
    await AuthorService.deleteAuthor(id);
    return response.status(204).json("Author has been successfully deleted");
  } catch (error: any) {
    return response.status(500).json(error.message);
  }
});
