import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin } from "lucide-react";
import { useState } from "react";
import { ViewDetailsModal } from "./ViewDetailsModal";

const spotlightJobs = [
  {
    id: 1,
    title: "Digital Marketing Intern",
    company: "TechStart Solutions",
    location: "Remote",
    type: "Internship",
    urgent: true,
    postedTime: "2h ago",
  },
  {
    id: 2,
    title: "Plumber Services Available",
    company: "RaviKumar Plumbing",
    location: "No. 37, 6th Cross, Mayuri Estate, Vijaynagar, Hubli",
    type: "Daily Service",
    urgent: false,
    postedTime: "5h ago",
  },
  {
    id: 3,
    title: "Sales Executive",
    company: "Local Retail Hub",
    location: "No. 37, 6th Cross, Mayuri Estate, Vijaynagar, Hubli",
    type: "Full-time",
    urgent: true,
    postedTime: "1d ago",
  },
];

export const SpotlightCarousel = () => {
  const [selectedJob, setSelectedJob] = useState<typeof spotlightJobs[0] | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleViewDetails = (job: typeof spotlightJobs[0]) => {
    setSelectedJob(job);
    setModalOpen(true);
  };

  return (
    <>
      <div className="w-full">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {spotlightJobs.map((job) => (
              <CarouselItem key={job.id} className="md:basis-1/2 lg:basis-1/3">
                <Card className="border-2 p-6 transition-all hover:shadow-md h-full flex flex-col">
                  <div className="flex flex-col gap-3 flex-1">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground line-clamp-1">
                          {job.title}
                        </h4>
                        <p className="text-sm text-muted-foreground">{job.company}</p>
                      </div>
                      {job.urgent && (
                        <Badge variant="destructive" className="shrink-0">
                          Urgent
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5" />
                        <span className="line-clamp-1">{job.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        <span>{job.postedTime}</span>
                      </div>
                    </div>

                    <Badge variant="secondary" className="w-fit">
                      {job.type}
                    </Badge>

                    <Button 
                      className="w-full bg-action hover:bg-action/90 mt-auto"
                      onClick={() => handleViewDetails(job)}
                    >
                      View Details
                    </Button>
                  </div>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>
      </div>

      {selectedJob && (
        <ViewDetailsModal
          open={modalOpen}
          onOpenChange={setModalOpen}
          title={selectedJob.title}
          company={selectedJob.company}
          location={selectedJob.location}
          type={selectedJob.type}
          postedTime={selectedJob.postedTime}
          urgent={selectedJob.urgent}
        />
      )}
    </>
  );
};
