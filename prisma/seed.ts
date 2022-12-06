import { db } from "../src/utils/db.server";

type Author = {
  firstName: string;
  lastName: string;
};

type Book = {
  title: string;
  isFiction: boolean;
  datePublished: Date;
};

async function seed() {
  await db.author.create({
    data: {
      firstName: "John",
      lastName: "Doe",
    },
  });
  await db.author.create({
    data: {
      firstName: "Yuval Noah",
      lastName: "Harari",
    },
  });
  await db.author.create({
    data: {
      firstName: "William",
      lastName: "Shakespeare",
    },
  });

  const author = await db.author.findFirst({
    where: {
      firstName: "Yuval Noah",
    },
  });

  await db.book.create({
    data: {
      title: "Sapiens",
      isFiction: false,
      datePublished: new Date(),
      authorId: author!.id,
    },
  });
  await db.book.create({
    data: {
      title: "Homo Deus",
      isFiction: false,
      datePublished: new Date(),
      authorId: author!.id,
    },
  });
  await db.book.create({
    data: {
      title: "The Ugly Duckling",
      isFiction: true,
      datePublished: new Date(),
      authorId: author!.id,
    },
  });
}

seed();

// function getAuthors(): Array<Author> {
//   return [
//     {
//       firstName: "John",
//       lastName: "Doe",
//     },
//     {
//       firstName: "William",
//       lastName: "Shakespeare",
//     },
//     {
//       firstName: "Yuval",
//       lastName: "Harari",
//     },
//   ];
// }

// function getBooks(): Array<Book> {
//   return [
//     {
//       title: "Sapiens",
//       isFiction: false,
//       datePublished: new Date(),
//     },
//     {
//       title: "Homo Deus",
//       isFiction: false,
//       datePublished: new Date(),
//     },
//     {
//       title: "The Ugly Duckling",
//       isFiction: true,
//       datePublished: new Date(),
//     },
//   ];
// }
