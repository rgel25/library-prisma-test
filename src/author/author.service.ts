import { db } from "../utils/db.server";

export type Author = {
  id: string;
  firstName: string;
  lastName: string;
};

export const listAuthors = async (): Promise<Author[]> => {
  return db.author.findMany({});
};

export const getAuthor = async (id: string): Promise<Author | null> => {
  return db.author.findUnique({
    where: {
      id,
    },
  });
};

export const createAuthor = async (
  author: Omit<Author, "id">
): Promise<Author> => {
  const { firstName, lastName } = author;
  return db.author.create({
    data: {
      firstName,
      lastName,
    },
  });
};

export const updateAuthor = async (
  author: Omit<Author, "id">,
  id: string
): Promise<Author> => {
  const { firstName, lastName } = author;
  return db.author.update({
    where: {
      id,
    },
    data: {
      firstName,
      lastName,
    },
  });
};

export const deleteAuthor = async (id: string): Promise<void> => {
  await db.author.delete({
    where: {
      id,
    },
  });
};
