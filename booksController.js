import * as model from "../models/bookModel.js";
import generateId from "../utils/generateId.js";

export async function getAll(req, res, next) {
  try {
    const books = await model.getAllBooks();
    res.json(books);
  } catch (e) {
    next(e);
  }
}

export async function getById(req, res, next) {
  try {
    const book = await model.getBookById(req.params.id);
    if (!book) return res.status(404).json({ message: "Kitob topilmadi" });
    res.json(book);
  } catch (e) {
    next(e);
  }
}

export async function createBook(req, res, next) {
  try {
    const { title, author, year } = req.body;
    const book = { id: generateId(), title, author, year: Number(year) };
    const created = await model.createBook(book);
    res.status(201).json(created);
  } catch (e) {
    next(e);
  }
}

export async function updateBook(req, res, next) {
  try {
    const { title, author, year } = req.body;
    const data = { title, author, year: Number(year) };
    const updated = await model.updateBook(req.params.id, data);
    if (!updated) return res.status(404).json({ message: "Kitob topilmadi" });
    res.json(updated);
  } catch (e) {
    next(e);
  }
}

export async function deleteBook(req, res, next) {
  try {
    const ok = await model.deleteBook(req.params.id);
    if (!ok) return res.status(404).json({ message: "Kitob topilmadi" });
    res.json({ message: "Kitob ochirildi" });
  } catch (e) {
    next(e);
  }
}
