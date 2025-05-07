export interface IUser {
  id: number | string,
  username: string,
  email: string,
  avatar: string,
  bio: string|null,
  created_at: Date
}

export interface ICategory {
  id: number,
  name: string,
  cover: string
}

export interface ICompetition extends IUser {
  id: number | string,
  user_id: string | number,
  cover: string,
  title: string,
  description: string,
  rules: string,
  start_date: Date,
  end_date: string,
  winner_id: number | string | null,
  created_at: Date,
  private: boolean,
  ai_based: boolean,
  max_participants: number,
  code: number | string,
  category: string | null
}

export interface IParticipant {
  id: number | string,
  user_id: number | string,
  username: string,
  avatar: string
}

export interface ISubmission {
  id: number | string,
  username: string,
  avatar: string,
  participant_id: string | number,
  submited_date: Date,
  explanation: string,
  image: string
}

export interface IVote {
  id: number | string,
  username: string,
  avatar: string,
  user_id: string | number,
  comment: string,
  vote_type: boolean | null
}

export interface ILeaderboard extends IUser {
  score: number,
  place: number,
  user_id: string|number
}

export interface IFollower {
  avatar: string;
  follower_id?: number | string;
  id: number | string;
  username: string
}