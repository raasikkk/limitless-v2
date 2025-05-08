import {rateLimit} from 'express-rate-limit';

export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  handler: (req,res) => {
    res.status(429).json({
      message: 'Too many login attempts. Please try again after 15 minutes.',
    });
  }
});

export const registerLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 10,
  handler: (req,res) => {
    res.status(429).json({
      message: 'Too many account creations for this Ip. Please try again later.',
    });
  }
});

export const logoutLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 3,
  handler: (req,res) => {
    res.status(429).json({
      message: 'Too many logout attempts. Please try again later.',
    });
  }
})

export const createCompetitionLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 5,
  handler: (req,res) => {
    res.status(429).json({
      message: 'Too many competition creations for this Ip. Please try again later.',
    });
  }
})

export const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  handler: (req,res) => {
    res.status(429).json({
      message: 'Too many requests. Please try again later after 15 mins.',
    });
  }
})

export const updateLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  limit: 10,
  handler: (req,res) => {
    res.status(429).json({
      message: 'Too many requests. Please try again later.',
    });
  }
})

export const followLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, 
  limit: 30, 
  handler: (req, res) => {
    res.status(429).json({
      message: 'Too many follow/unfollow actions. Please slow down.',
    });
  }
});

export const joinQuitLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, 
  limit: 50, 
  handler: (req, res) => {
    res.status(429).json({
      message: 'Too many join/quit actions. Please slow down.',
    });
  }
});

export const kickUserLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  handler: (req, res) => {
    res.status(429).json({
      message: 'Too much user kicks. Please slow down.',
    });
  }
})

export const submitLimiter = rateLimit({
  windowMs: 30 * 60 * 1000,
  limit: 20,
  handler: (req,res) => {
    res.status(429).json({
      message: 'Too many submission requests. Please try again later.',
    });
  }
})

export const voteLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  handler: (req,res) => {
    res.status(429).json({
      message: 'Too much vote requests. Please try again later.',
    });
  }
})

export const llmLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 8,
  handler: (req,res) => {
    res.status(429).json({
      message: 'Too much vote requests. Please try again later.',
    });
  }
})