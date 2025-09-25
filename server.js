import express from "express";
import path from "path";
import fs from "fs/promises";
import booksRouter from "./book-service/routes/books.js";
import errorHandler from "./book-service/middleware/errorHandler.js";

const app = express();
const PORT = process.env.PORT || 3000;
const DB_PATH = path.join(process.cwd(), "books.json");

app.use(express.json());
app.use("/books", booksRouter);
app.use(errorHandler);

async function ensureDB() {
  try {
    await fs.access(DB_PATH);
  } catch {
    const sample = [
      { "id": "1", "title": "Node.js Asoslari", "author": "Ali Karimov", "year": 2021 },
      { "id": "2", "title": "Express bilan Ishlash", "author": "Bektur R.", "year": 2022 },
      { "id": "3", "title": "JavaScript Toliq Qollanma", "author": "Sardor M.", "year": 2020 },
      { "id": "4", "title": "Backend Dasturlash", "author": "Gulbahor N.", "year": 2019 },
      { "id": "5", "title": "Asinxron JS", "author": "Nodir Q.", "year": 2023 },
      { "id": "6", "title": "REST API Dizayni", "author": "Zarina O.", "year": 2020 },
      { "id": "7", "title": "Fayl Bilan Ishlash", "author": "Umid A.", "year": 2018 },
      { "id": "8", "title": "Unit Testing", "author": "Javlon S.", "year": 2024 },
      { "id": "9", "title": "HTTP Protokoli", "author": "Saida R.", "year": 2017 },
      { "id": "10", "title": "Yaxshi Kod Yozish", "author": "Diyor Y.", "year": 2016 }
    ];
    await fs.writeFile(DB_PATH, JSON.stringify(sample, null, 2), "utf8");
  }
}

ensureDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server http://localhost:${PORT} da ishlayapti`);
  });
}).catch((err) => {
  console.error("DB yaratishda xato:", err);
  process.exit(1);
});
