import { useAuth } from '../contexts/AuthContext'
import { Navigate } from 'react-router-dom'

export default function Dashboard() {
  const { user, profile, loading } = useAuth()
  if (loading) return <div>Loading...</div>
  if (!user) return <Navigate to="/login" replace />

  return <div>Welcome, {profile?.full_name}!</div>
}