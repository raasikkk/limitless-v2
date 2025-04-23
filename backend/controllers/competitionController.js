import { db } from "../db.js";

export const createCompetition = async (req,res) => {
  try {

    const {userId, title, description, categoryId, isPrivate, startDate, endDate} = req.body;

    if (!title || !description || !categoryId || !startDate || !endDate) {
      return res.status(400).json({
        message: "Fill all the fields."
      })
    }

    await db.query("INSERT INTO competitions (user_id, title, description, category_id, private, start_date, end_date) VALUES ($1, $2, $3, $4, $5, $6, $7)", [userId, title, description, categoryId, isPrivate, startDate, endDate]);

    res.json({
      message: "Succesfully created."
    })

  } catch (error) {
    console.log('Error at createCompetition:', error);
    res.status(500).send(error)
  }
}

export const getCategories = async (req,res) => {
  try {

    const categories = await db.query("SELECT cover, name FROM categories");

    res.json(categories.rows);

  } catch (error) {
    console.log('Error at getCategories:', error);
    res.status(500).send(error)
  }
}