import { Header } from "@/components/layout/Header";
import { JobCard } from "@/components/jobs/JobCard";
import { JobFilters } from "@/components/jobs/JobFilters";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Grid, List, Plus } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchJobs, formatJobForCard } from "@/api/jobs";

const Jobs = () => {
  const navigate = useNavigate();
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadJobs();
  }, []);

  async function loadJobs() {
    try {
      setLoading(true);
      const data = await fetchJobs();
      const formattedJobs = data.map(formatJobForCard);
      setJobs(formattedJobs);
    } catch (err: any) {
      setError(err.message || 'Failed to load jobs');
      console.error('Error loading jobs:', err);
    } finally {
      setLoading(false);
    }
  }

  const handleTypeToggle = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const filteredJobs = selectedTypes.length > 0
    ? jobs.filter((job) => selectedTypes.includes(job.jobType))
    : jobs;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container px-4 py-6">
        {/* Back Button */}
        <Button
          variant="ghost"
          size="sm"
          className="mb-4"
          onClick={() => navigate("/")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>

        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="mb-2 text-3xl font-bold text-foreground">Jobs</h1>
            <p className="text-muted-foreground">
              Find opportunities across Training, Internship, Daily-wage, Part-time, and Full-time positions
            </p>
          </div>
          <Button onClick={() => navigate('/post-job')} className="gap-2">
            <Plus className="h-4 w-4" />
            Post a Job
          </Button>
        </div>

        <div className="flex flex-col gap-6 lg:flex-row">
          {/* Filters Sidebar */}
          <aside className="w-full lg:w-64 lg:shrink-0">
            <JobFilters
              selectedTypes={selectedTypes}
              onTypeToggle={handleTypeToggle}
            />
          </aside>

          {/* Job Listings */}
          <main className="flex-1">
            {loading && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Loading jobs...</p>
              </div>
            )}
            {error && (
              <div className="text-center py-12">
                <p className="text-red-600">{error}</p>
                <Button onClick={loadJobs} variant="outline" className="mt-4">
                  Retry
                </Button>
              </div>
            )}
            {!loading && !error && (
              <>
                <div className="mb-4 flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">
                    {filteredJobs.length} jobs found
                  </p>
                  <div className="flex gap-2">
                    <Button
                      variant={viewMode === "grid" ? "default" : "outline"}
                      size="icon"
                      onClick={() => setViewMode("grid")}
                      aria-label="Grid view"
                    >
                      <Grid className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={viewMode === "list" ? "default" : "outline"}
                      size="icon"
                      onClick={() => setViewMode("list")}
                      aria-label="List view"
                    >
                      <List className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

            <div
              className={
                viewMode === "grid"
                  ? "grid gap-4 sm:grid-cols-2 xl:grid-cols-3"
                  : "flex flex-col gap-4"
              }
            >
                  {filteredJobs.length === 0 ? (
                    <div className="text-center py-12">
                      <p className="text-muted-foreground mb-4">No jobs found</p>
                      <Button onClick={() => navigate('/post-job')} variant="outline">
                        Post the first job
                      </Button>
                    </div>
                  ) : (
                    filteredJobs.map((job) => (
                      <JobCard key={job.id} {...job} />
                    ))
                  )}
                </div>
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
