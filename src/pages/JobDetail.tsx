import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { QuickApplyModal } from "@/components/jobs/QuickApplyModal";
import { ArrowLeft, MapPin, DollarSign, Clock, Star, Building2, Mail, Phone } from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const JobDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [applyModalOpen, setApplyModalOpen] = useState(false);

  // Mock job data - in real app, fetch based on id
  const job = {
    title: "Digital Marketing Intern",
    company: "TechStart Solutions",
    location: "Remote",
    jobType: "Internship",
    salary: "₹10,000 - ₹15,000/month",
    postedTime: "2h ago",
    rating: 4.5,
    description: `We are looking for a motivated Digital Marketing Intern to join our growing team. This is an excellent opportunity to learn and grow in the digital marketing field.`,
    responsibilities: [
      "Assist in developing and implementing social media strategies",
      "Create engaging content for various digital platforms",
      "Monitor and analyze campaign performance metrics",
      "Support SEO and SEM initiatives",
      "Help manage email marketing campaigns",
    ],
    requirements: [
      "Currently pursuing or recently completed a degree in Marketing or related field",
      "Basic understanding of digital marketing concepts",
      "Good written and verbal communication skills",
      "Familiarity with social media platforms",
      "Enthusiastic and eager to learn",
    ],
    perks: [
      "Work from home flexibility",
      "Certificate upon completion",
      "Mentorship from experienced professionals",
      "Possibility of full-time offer",
    ],
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container px-4 py-6">
        {/* Back Button - Always Visible */}
        <Button
          variant="ghost"
          size="sm"
          className="mb-4"
          onClick={() => navigate("/jobs")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Jobs
        </Button>

        <div className="flex flex-col gap-6 lg:flex-row">
          {/* Main Content */}
          <main className="flex-1 space-y-6">
            {/* Job Header */}
            <Card className="p-6">
              <div className="mb-4">
                <h1 className="mb-2 text-3xl font-bold text-foreground">{job.title}</h1>
                <p className="text-lg font-medium text-muted-foreground">{job.company}</p>
              </div>

              <div className="mb-6 flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <span>{job.salary}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{job.postedTime}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-accent text-accent" />
                  <span>{job.rating} rating</span>
                </div>
              </div>

              <div className="mb-6">
                <Badge variant="secondary" className="text-sm">
                  {job.jobType}
                </Badge>
              </div>

              <Button
                className="w-full bg-action hover:bg-action/90 md:w-auto"
                size="lg"
                onClick={() => setApplyModalOpen(true)}
              >
                Apply Now
              </Button>
            </Card>

            {/* Job Description */}
            <Card className="p-6">
              <h2 className="mb-3 text-xl font-bold text-foreground">About the Role</h2>
              <p className="text-muted-foreground">{job.description}</p>
            </Card>

            {/* Responsibilities */}
            <Card className="p-6">
              <h2 className="mb-3 text-xl font-bold text-foreground">Responsibilities</h2>
              <ul className="space-y-2">
                {job.responsibilities.map((item, index) => (
                  <li key={index} className="flex gap-2 text-muted-foreground">
                    <span className="text-primary">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Requirements */}
            <Card className="p-6">
              <h2 className="mb-3 text-xl font-bold text-foreground">Requirements</h2>
              <ul className="space-y-2">
                {job.requirements.map((item, index) => (
                  <li key={index} className="flex gap-2 text-muted-foreground">
                    <span className="text-primary">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Perks */}
            <Card className="p-6">
              <h2 className="mb-3 text-xl font-bold text-foreground">Perks & Benefits</h2>
              <ul className="space-y-2">
                {job.perks.map((item, index) => (
                  <li key={index} className="flex gap-2 text-muted-foreground">
                    <span className="text-accent">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Empty Stats Section - As per requirements */}
            <Card className="p-6">
              <div className="h-24" aria-label="Statistics placeholder" />
            </Card>
          </main>

          {/* Sidebar */}
          <aside className="w-full lg:w-80 lg:shrink-0">
            <Card className="sticky top-20 p-6">
              <div className="mb-4 flex items-start gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Building2 className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">{job.company}</h3>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Star className="h-3 w-3 fill-accent text-accent" />
                    <span>{job.rating} rating</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Mail className="mr-2 h-4 w-4" />
                  Contact
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Phone className="mr-2 h-4 w-4" />
                  Call
                </Button>
              </div>

              <div className="mt-6">
                <Button
                  className="w-full bg-action hover:bg-action/90"
                  onClick={() => setApplyModalOpen(true)}
                >
                  Quick Apply
                </Button>
              </div>
            </Card>
          </aside>
        </div>
      </div>

      <QuickApplyModal
        open={applyModalOpen}
        onOpenChange={setApplyModalOpen}
        jobTitle={job.title}
        employerName={job.company}
      />
    </div>
  );
};

export default JobDetail;
