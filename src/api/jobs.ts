import { supabase, JobPosting } from '../lib/supabase'

// Fetch all active jobs
export async function fetchJobs() {
  const { data, error } = await supabase
    .from('job_postings')
    .select('*')
    .eq('status', 'active')
    .order('posted_at', { ascending: false })

  if (error) throw error
  return data || []
}

// Create a new job posting
export async function createJob(jobData: {
  job_title: string
  company_name: string
  description: string
  location: string
  job_type: 'internship' | 'full_time' | 'part_time' | 'contract' | 'daily-wage' | 'training'
  salary_min?: number
  salary_max?: number
  salary_display?: string
  status?: 'active' | 'closed' | 'filled' | 'draft'
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
      company_name: jobData.company_name,
      description: jobData.description,
      location: jobData.location,
      job_type: jobData.job_type,
      salary_min: jobData.salary_min,
      salary_max: jobData.salary_max,
      salary_display: jobData.salary_display,
      status: jobData.status || 'active',
    })
    .select()
    .single()

  if (error) throw error
  return data
}

// Helper function to format job data for JobCard component
export function formatJobForCard(job: JobPosting) {
  // Format salary display
  let salary = job.salary_display || ''
  if (!salary && (job.salary_min || job.salary_max)) {
    if (job.salary_min && job.salary_max) {
      salary = `₹${job.salary_min.toLocaleString()} - ₹${job.salary_max.toLocaleString()}/month`
    } else if (job.salary_min) {
      salary = `₹${job.salary_min.toLocaleString()}/month`
    }
  }

  // Format posted time
  const postedDate = new Date(job.posted_at)
  const now = new Date()
  const diffMs = now.getTime() - postedDate.getTime()
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
  const diffDays = Math.floor(diffHours / 24)
  
  let postedTime = ''
  if (diffHours < 1) {
    postedTime = 'Just now'
  } else if (diffHours < 24) {
    postedTime = `${diffHours}h ago`
  } else if (diffDays === 1) {
    postedTime = '1d ago'
  } else {
    postedTime = `${diffDays}d ago`
  }

  return {
    id: job.id,
    title: job.job_title,
    company: job.company_name,
    location: job.location,
    jobType: job.job_type,
    salary: salary || 'Not specified',
    postedTime: postedTime,
    description: job.description,
  }
}

