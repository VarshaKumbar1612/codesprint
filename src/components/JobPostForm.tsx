import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createJob } from '../api/jobs'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Header } from '@/components/layout/Header'

export default function JobPostForm() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    job_title: '',
    company_name: '',
    description: '',
    location: '',
    job_type: 'full_time' as 'internship' | 'full_time' | 'part_time' | 'contract' | 'daily-wage' | 'training',
    salary_min: '',
    salary_max: '',
    salary_display: '',
  })

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      await createJob({
        job_title: formData.job_title,
        company_name: formData.company_name,
        description: formData.description,
        location: formData.location,
        job_type: formData.job_type,
        salary_min: formData.salary_min ? parseFloat(formData.salary_min) : undefined,
        salary_max: formData.salary_max ? parseFloat(formData.salary_max) : undefined,
        salary_display: formData.salary_display || undefined,
        status: 'active',
      })
      
      // Redirect to jobs page after successful posting
      navigate('/jobs')
    } catch (err: any) {
      setError(err.message || 'Failed to post job')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container px-4 py-6">
        <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Post a Job</CardTitle>
        <CardDescription>Fill in the details to post a new job opportunity</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="job_title">Job Title *</Label>
            <Input
              id="job_title"
              value={formData.job_title}
              onChange={(e) => setFormData({ ...formData, job_title: e.target.value })}
              placeholder="e.g., Software Developer"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="company_name">Company Name *</Label>
            <Input
              id="company_name"
              value={formData.company_name}
              onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
              placeholder="e.g., Tech Solutions Inc."
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Job Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe the job role, requirements, and responsibilities..."
              rows={5}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location *</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="e.g., Hubli, Karnataka"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="job_type">Job Type *</Label>
            <Select
              value={formData.job_type}
              onValueChange={(value: any) => setFormData({ ...formData, job_type: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="full_time">Full Time</SelectItem>
                <SelectItem value="part_time">Part Time</SelectItem>
                <SelectItem value="contract">Contract</SelectItem>
                <SelectItem value="internship">Internship</SelectItem>
                <SelectItem value="daily-wage">Daily Wage</SelectItem>
                <SelectItem value="training">Training</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="salary_min">Min Salary (₹)</Label>
              <Input
                id="salary_min"
                type="number"
                value={formData.salary_min}
                onChange={(e) => setFormData({ ...formData, salary_min: e.target.value })}
                placeholder="10000"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="salary_max">Max Salary (₹)</Label>
              <Input
                id="salary_max"
                type="number"
                value={formData.salary_max}
                onChange={(e) => setFormData({ ...formData, salary_max: e.target.value })}
                placeholder="50000"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="salary_display">Or Enter Salary Display (e.g., ₹10,000 - ₹15,000/month)</Label>
            <Input
              id="salary_display"
              value={formData.salary_display}
              onChange={(e) => setFormData({ ...formData, salary_display: e.target.value })}
              placeholder="₹10,000 - ₹15,000/month"
            />
          </div>

          {error && (
            <div className="p-3 text-sm text-red-600 bg-red-50 rounded-md">
              {error}
            </div>
          )}

          <div className="flex gap-4">
            <Button type="submit" disabled={loading} className="flex-1">
              {loading ? 'Posting...' : 'Post Job'}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/jobs')}
            >
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
      </div>
    </div>
  )
}

