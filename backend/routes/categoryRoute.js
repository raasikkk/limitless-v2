import { Router } from "express";
import { getCategories } from "../controllers/categoryController.js";


export const categoryRoute = Router();

categoryRoute.get("/categories", getCategories);