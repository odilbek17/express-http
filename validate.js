export function validateBook(req, res, next) {
  const { title, author, year } = req.body;
  if (!title || !author || year === undefined || year === null) {
    return res.status(400).json({ message: "Majburiy maydonlar kiritilmadi" });
  }
  const y = Number(year);
  if (Number.isNaN(y) || !Number.isFinite(y) || y < 0) {
    return res.status(400).json({ message: "year notogri" });
  }
  next();
}
