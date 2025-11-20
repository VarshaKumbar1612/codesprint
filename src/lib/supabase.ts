import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase env variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types
export interface JobPosting {
  id: string
  employer_id: string
  job_title: string
  company_name: string
  job_type: 'internship' | 'full_time' | 'part_time' | 'contract' | 'daily-wage' | 'training'
  description: string
  location: string
  salary_min?: number
  salary_max?: number
  salary_display?: string
  status: 'active' | 'closed' | 'filled' | 'draft'
  posted_at: string
  created_at: string
  updated_at: string
}

