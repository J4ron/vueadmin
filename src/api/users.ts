import { type User, UserRole } from '@/types/user.type'
import { faker } from '@faker-js/faker'

const roles = Object.values(UserRole)

export const generateUsers = (count = 50): User[] => {
  faker.seed(1234)

  return Array.from({ length: count }, () => ({
    id: faker.string.uuid(),
    firstname: faker.person.firstName(),
    lastname: faker.person.lastName(),
    email: faker.internet.email(),
    jobTitle: faker.person.jobTitle(),
    salary: faker.number.int({ min: 30000, max: 150000 }),
    role: roles[Math.floor(Math.random() * roles.length)],
  }))
}

function getUsers(): User[] {
  return generateUsers(100)
}

export { getUsers }
