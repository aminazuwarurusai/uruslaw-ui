import bcrypt from 'bcryptjs'

export type AppUser = {
  id: string
  name: string
  email: string
  role: 'superadmin' | 'user'
}

type StoredUser = AppUser & { passwordHash: string }

// Superadmin — loaded from env vars
function getSuperadmin(): StoredUser | null {
  const email = process.env.ADMIN_EMAIL
  const hash  = process.env.ADMIN_PASSWORD_HASH
  if (!email || !hash) return null
  return { id: '1', name: 'Admin', email, role: 'superadmin', passwordHash: hash }
}

// Regular users — add more here or load from database later
// Generate hash: node -e "require('bcryptjs').hash('password',10).then(console.log)"
function getUsers(): StoredUser[] {
  const users: StoredUser[] = []

  // Load extra users from env vars (USER_1_EMAIL, USER_1_HASH, USER_1_NAME, etc.)
  let i = 1
  while (true) {
    const email = process.env[`USER_${i}_EMAIL`]
    const hash  = process.env[`USER_${i}_HASH`]
    const name  = process.env[`USER_${i}_NAME`] || `User ${i}`
    if (!email || !hash) break
    users.push({ id: String(i + 1), name, email, role: 'user', passwordHash: hash })
    i++
  }

  return users
}

export async function verifyUser(email: string, password: string): Promise<AppUser | null> {
  const superadmin = getSuperadmin()
  const allUsers: StoredUser[] = [
    ...(superadmin ? [superadmin] : []),
    ...getUsers(),
  ]

  const found = allUsers.find(u => u.email.toLowerCase() === email.toLowerCase())
  if (!found) return null

  const valid = await bcrypt.compare(password, found.passwordHash)
  if (!valid) return null

  return { id: found.id, name: found.name, email: found.email, role: found.role }
}
