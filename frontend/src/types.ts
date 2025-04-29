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