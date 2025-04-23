import { db } from "../db.js";



export const getCategories = async (req,res) => {
  try {

    const categories = await db.query("SELECT cover, name FROM categories");

    res.json(categories.rows);

  } catch (error) {
    console.log('Error at getCategories:', error);
    res.status(500).send(error)
  }
}