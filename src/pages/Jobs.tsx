import { Header } from "@/components/layout/Header";
import { JobCard } from "@/components/jobs/JobCard";
import { JobFilters } from "@/components/jobs/JobFilters";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Grid, List } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const mockJobs = [
  {
    id: "1",
    title: "Digital Marketing Intern",
    company: "TechStart Solutions",
    location: "Remote",
    jobType: "internship",
    salary: "₹10,000 - ₹15,000/month",
    postedTime: "2h ago",
    description: "Learn digital marketing strategies, SEO, social media management, and content creation.",
  },
  {
    id: "2",
    title: "Construction Daily Worker",
    company: "BuildRight Construction",
    location: "Sector 15, Chandigarh",
    jobType: "daily-wage",
    salary: "₹600/day",
    postedTime: "5h ago",
    description: "Daily wage construction work. Experience in masonry or general labor preferred.",
  },
  {
    id: "3",
    title: "Retail Sales Associate",
    company: "Fashion Hub",
    location: "Mall Road, Shimla",
    jobType: "part-time",
    salary: "₹12,000/month",
    postedTime: "1d ago",
    description: "Part-time sales position in retail clothing store. Customer service experience required.",
  },
  {
    id: "4",
    title: "Software Development Training",
    company: "CodeAcademy Pro",
    location: "Online",
    jobType: "training",
    salary: "Free with stipend",
    postedTime: "2d ago",
    description: "3-month intensive training in web development with React, Node.js, and databases.",
  },
  {
    id: "5",
    title: "Accounts Executive",
    company: "Green Valley Enterprises",
    location: "Panchkula",
    jobType: "full-time",
    salary: "₹25,000 - ₹35,000/month",
    postedTime: "3d ago",
    description: "Full-time accounting position. Tally and basic accounting knowledge required.",
  },
];

const Jobs = () => {
  const navigate = useNavigate();
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const handleTypeToggle = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const filteredJobs = selectedTypes.length > 0
    ? mockJobs.filter((job) => selectedTypes.includes(job.jobType))
    : mockJobs;

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

        <div className="mb-6">
          <h1 className="mb-2 text-3xl font-bold text-foreground">Jobs</h1>
          <p className="text-muted-foreground">
            Find opportunities across Training, Internship, Daily-wage, Part-time, and Full-time positions
          </p>
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
              {filteredJobs.map((job) => (
                <JobCard key={job.id} {...job} />
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
