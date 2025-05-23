import { redisClient } from "../../redis/client.js";

export const cacheUser = async (req, res, next) => {
  const key = `user:${req.params.id}`;
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

export const cacheUserCompetitions = async (req, res, next) => {
  const key = `user:${req.params.id}:competitions`;
  try {
    const cachedData = await redisClient.get(key);

    if (cachedData) {
      console.log('cached');
      return res.status(200).json(JSON.parse(cachedData));
    }

    next();
  } catch (error) {
    console.log('Error at cachUser', error);
    next();
  }
}

export const cacheUserSearch = async (req, res, next) => {
  const key = `user:${req.query.q.toLowerCase()}`;
  try {
    const cachedData = await redisClient.get(key);

    if (cachedData) {
      console.log('cached');
      return res.status(200).json(JSON.parse(cachedData));
    }

    next();
  } catch (error) {
    console.log('Error at cachUser', error);
    next();
  }
}
