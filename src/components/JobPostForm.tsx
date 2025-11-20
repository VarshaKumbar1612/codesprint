import React, { useState } from 'react'
import { createJob } from '../api/jobs'

export default function JobPostForm() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const form = e.target as HTMLFormElement
    const job_title = (form.elements.namedItem('job_title') as HTMLInputElement).value
    const description = (form.elements.namedItem('description') as HTMLInputElement).value

    try {
      await createJob({ job_title, description, status: 'active' })
      alert('Job posted!')
      form.reset()
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="job_title" placeholder="Job Title" required />
      <textarea name="description" placeholder="Description" required />
      <button type="submit" disabled={loading}>{loading ? 'Posting...' : 'Post Job'}</button>
      {error && <div style={{color:"red"}}>{error}</div>}
    </form>
  )
}