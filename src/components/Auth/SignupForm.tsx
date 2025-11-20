import React, { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'

export default function SignupForm() {
  const { signUp } = useAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const form = e.target as HTMLFormElement
    const email = (form.elements.namedItem('email') as HTMLInputElement).value
    const password = (form.elements.namedItem('password') as HTMLInputElement).value
    const fullName = (form.elements.namedItem('fullName') as HTMLInputElement).value
    const userType = (form.elements.namedItem('userType') as HTMLInputElement).value

    if (!email || !password || !fullName) {
      setError('Please fill in all fields')
      setLoading(false)
      return
    }

    const res = await signUp(email, password, fullName, userType)
    setLoading(false)
    if (res.error) setError(res.error)
    else window.location.replace('/dashboard')
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="fullName" placeholder="Full Name" required />
      <input name="email" type="email" placeholder="Email" required />
      <input name="password" type="password" placeholder="Password" required minLength={8} />
      <select name="userType" required>
        <option value="job_seeker">Job Seeker</option>
        <option value="employer">Employer</option>
        <option value="service_provider">Service Provider</option>
      </select>
      {error && <div style={{color:'red'}}>{error}</div>}
      <button type="submit" disabled={loading}>{loading ? 'Signing Up...' : 'Sign Up'}</button>
    </form>
  )
}