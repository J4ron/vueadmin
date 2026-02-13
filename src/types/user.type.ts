type User = {
  id: string
  firstname: string
  lastname: string
  email: string
  jobTitle: string
  salary: number
  role?: UserRole
}

enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  GUEST = 'guest',
}

export { type User, UserRole }
