import { redisClient } from "../../redis/client.js";

export const cacheCompetitionsList = async (req, res, next) => {
  const key = `competitions:all`;
  try {
    const cachedData = await redisClient.get(key);
    if (cachedData) {
      return res.status(200).json(JSON.parse(cachedData));
    }

    next();

  } catch (error) {
    console.log('Error at cachUser', error);
    next();
  }
}

export const cacheCompetitionById = async (req, res, next) => {
  const key = `competitions:${req.params.id}`;
  try {
    const cachedData = await redisClient.get(key);
    if (cachedData) {
      return res.status(200).json(JSON.parse(cachedData));
    }

    next();

  } catch (error) {
    console.log('Error at cacheCompetitionById', error);
    next();
  }
}

export const cacheCategoryById = async (req, res, next) => {
  const key = `competitions:${req.params.category}:category`;
  try {
    const cachedData = await redisClient.get(key);
    if (cachedData) {
      return res.status(200).json(JSON.parse(cachedData));
    }

    next();

  } catch (error) {
    console.log('Error at cacheCategoryById', error);
    next();
  }
}

export const cacheCategories = async (req, res, next) => {
  const key = `categories`;
  try {
    const cachedData = await redisClient.get(key);
    if (cachedData) {
      return res.status(200).json(JSON.parse(cachedData));
    }

    next();

  } catch (error) {
    console.log('Error at cacheCategories', error);
    next();
  }
}

export const cacheParticipants = async (req, res, next) => {
  const key = `competitions:${req.params.competition_id}:participants`;
  try {
    const cachedData = await redisClient.get(key);
    if (cachedData) {
      return res.status(200).json(JSON.parse(cachedData));
    }

    next();

  } catch (error) {
    console.log('Error at cacheParticipants', error);
    next();
  }
}

export const cacheLeaderboard = async (req, res, next) => {
  const key = `competitions:${req.params.competition_id}:leaderboard`;
  try {
    const cachedData = await redisClient.get(key);
    if (cachedData) {
      return res.status(200).json(JSON.parse(cachedData));
    }

    next();

  } catch (error) {
    console.log('Error at cacheLeaderboard', error);
    next();
  }
}
