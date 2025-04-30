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
  end_date: Date,
  winner_id: number | string | null,
  created_at: Date
}

export interface ISubmissions {
  id: number | string,
  username: string,
  avatar: string,
  user_id: string | number,
  submited_date: Date
}