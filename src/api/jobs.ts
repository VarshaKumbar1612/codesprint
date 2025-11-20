import { supabase } from '../lib/supabase'

export async function fetchJobs() {
  let { data, error } = await supabase
    .from('job_postings')
    .select('*')
    .eq('status', 'active')
    .order('posted_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function createJob(jobData: {
  job_title: string
  description: string
  status: 'active' | 'closed' | 'filled' | 'draft'
  job_type?: 'internship' | 'full_time' | 'part_time' | 'contract'
  required_skills?: string[]
  location?: string
  salary_min?: number
  salary_max?: number
}) {
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    throw new Error('User must be authenticated to create a job')
  }

  const { data, error } = await supabase
    .from('job_postings')
    .insert({
      employer_id: user.id,
      job_title: jobData.job_title,
      description: jobData.description,
      status: jobData.status,
      job_type: jobData.job_type || 'full_time',
      required_skills: jobData.required_skills || [],
      location: jobData.location || '',
      salary_min: jobData.salary_min,
      salary_max: jobData.salary_max,
    })
    .select()
    .single()

  if (error) throw error
  return data
}