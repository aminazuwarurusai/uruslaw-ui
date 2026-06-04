import bcrypt from 'bcryptjs'

export type AppUser = {
  id: string
  name: string
  email: string
  role: 'admin' | 'user'
}

export async function verifyUser(email: string, password: string): Promise<AppUser | null> {
  const adminEmail = process.env.ADMIN_EMAIL
  const adminHash  = process.env.ADMIN_PASSWORD_HASH

  if (!adminEmail || !adminHash) {
    console.error('ADMIN_EMAIL or ADMIN_PASSWORD_HASH env var not set')
    return null
  }

  if (email.toLowerCase() !== adminEmail.toLowerCase()) return null

  const valid = await bcrypt.compare(password, adminHash)
  if (!valid) return null

  return { id: '1', name: 'Admin', email: adminEmail, role: 'admin' }
}
