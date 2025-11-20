import React, { useEffect, useState } from 'react'
import { fetchJobs } from '../api/jobs'

export default function JobBoard() {
  const [jobs, setJobs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchJobs()
      .then(data => { setJobs(data || []); setLoading(false); })
      .catch(err => { setError(err.message); setLoading(false); })
  }, [])

  if (loading) return <div>Loading jobs...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div>
      <h2>Active Jobs</h2>
      {jobs.length === 0 && <div>No jobs found.</div>}
      {jobs.map(job => (
        <div key={job.id}>
          <h3>{job.job_title}</h3>
          <p>{job.description}</p>
        </div>
      ))}
    </div>
  )
}