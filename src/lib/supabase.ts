import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase env variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types
export type UserType = 'job_seeker' | 'employer' | 'service_provider'

export interface Profile {
  id: string
  email: string
  full_name: string
  phone?: string
  user_type: UserType
  avatar_url?: string
  is_verified: boolean
  created_at: string
  updated_at: string
}

export interface JobPosting {
  id: string
  employer_id: string
  job_title: string
  job_type: 'internship' | 'full_time' | 'part_time' | 'contract'
  description: string
  required_skills: string[]
  location: string
  salary_min?: number
  salary_max?: number
  status: 'active' | 'closed' | 'filled' | 'draft'
  posted_at: string
}
