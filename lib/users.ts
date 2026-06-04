import bcrypt from 'bcryptjs'

export type AppUser = {
  id: string
  name: string
  email: string
  role: 'admin' | 'user'
  passwordHash: string
}

// Add users here — generate hash: node -e "require('bcryptjs').hash('yourpassword',10).then(console.log)"
export const USERS: AppUser[] = [
  {
    id: '1',
    name: 'Admin',
    email: 'admin@uruslaw.com',
    role: 'admin',
    passwordHash: '$2b$10$.7r6do25PDp853uk7bniduilu6BwyyrALmoYTpTpHURoVRfVjE.jy',
  },
]

export async function verifyUser(email: string, password: string): Promise<AppUser | null> {
  const user = USERS.find(u => u.email.toLowerCase() === email.toLowerCase())
  if (!user) return null
  const valid = await bcrypt.compare(password, user.passwordHash)
  return valid ? user : null
}
