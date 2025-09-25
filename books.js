import express from "express";
import * as ctrl from "../controllers/booksController.js";
import { validateBook } from "../middleware/validate.js";

const router = express.Router();

router.get("/", ctrl.getAll);
router.get("/:id", ctrl.getById);
router.post("/", validateBook, ctrl.createBook);
router.put("/:id", validateBook, ctrl.updateBook);
router.delete("/:id", ctrl.deleteBook);

export default router;
