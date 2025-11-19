import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Bookmark, DollarSign } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface JobCardProps {
  id: string;
  title: string;
  company: string;
  location: string;
  jobType: string;
  salary: string;
  postedTime: string;
  description: string;
}

export const JobCard = ({
  id,
  title,
  company,
  location,
  jobType,
  salary,
  postedTime,
  description,
}: JobCardProps) => {
  const [saved, setSaved] = useState(false);
  const navigate = useNavigate();

  return (
    <Card className="group overflow-hidden border transition-all hover:shadow-md">
      <div className="p-6">
        <div className="mb-4 flex items-start justify-between gap-4">
          <div className="flex-1">
            <h3 
              className="mb-1 cursor-pointer text-lg font-semibold text-foreground transition-colors hover:text-primary line-clamp-2"
              onClick={() => navigate(`/jobs/${id}`)}
            >
              {title}
            </h3>
            <p className="text-sm font-medium text-muted-foreground">{company}</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="shrink-0"
            onClick={() => setSaved(!saved)}
            aria-label={saved ? "Remove bookmark" : "Save job"}
          >
            <Bookmark className={`h-4 w-4 ${saved ? "fill-current text-accent" : ""}`} />
          </Button>
        </div>

        <p className="mb-4 text-sm text-muted-foreground line-clamp-2">{description}</p>

        <div className="mb-4 flex flex-wrap gap-2">
          <Badge variant="secondary" className="text-xs">
            {jobType}
          </Badge>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin className="h-3 w-3" />
            <span>{location}</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <DollarSign className="h-3 w-3" />
            <span>{salary}</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            <span>{postedTime}</span>
          </div>
        </div>

        <Button 
          className="w-full bg-action hover:bg-action/90"
          onClick={() => navigate(`/jobs/${id}`)}
        >
          Apply Now
        </Button>
      </div>
    </Card>
  );
};
