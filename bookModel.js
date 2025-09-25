import fs from "fs/promises";
import path from "path";

const DB_PATH = path.join(process.cwd(), "books.json");

async function readBooks() {
  const raw = await fs.readFile(DB_PATH, "utf8");
  return JSON.parse(raw);
}

async function writeBooks(books) {
  await fs.writeFile(DB_PATH, JSON.stringify(books, null, 2), "utf8");
}

export async function getAllBooks() {
  return await readBooks();
}

export async function getBookById(id) {
  const books = await readBooks();
  return books.find(b => b.id === id) || null;
}

export async function createBook(book) {
  const books = await readBooks();
  books.push(book);
  await writeBooks(books);
  return book;
}

export async function updateBook(id, data) {
  const books = await readBooks();
  const index = books.findIndex(b => b.id === id);
  if (index === -1) return null;
  books[index] = { ...books[index], ...data };
  await writeBooks(books);
  return books[index];
}

export async function deleteBook(id) {
  const books = await readBooks();
  const index = books.findIndex(b => b.id === id);
  if (index === -1) return false;
  books.splice(index, 1);
  await writeBooks(books);
  return true;
}
