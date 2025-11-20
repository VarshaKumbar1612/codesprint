import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Building2 } from "lucide-react";

interface ViewDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  company: string;
  location: string;
  type: string;
  postedTime: string;
  urgent?: boolean;
}

const getDescription = (title: string, company: string, type: string) => {
  if (type === "Internship") {
    return `${company} is offering an exciting ${title} opportunity. This internship provides hands-on experience in a dynamic work environment, perfect for students and recent graduates looking to build their career. Join our team and gain valuable industry insights while working on real projects.`;
  } else if (type === "Daily Service") {
    return `${company} provides professional ${title.toLowerCase()} services. With years of experience and a commitment to quality, we ensure reliable and efficient service delivery. Our team is dedicated to meeting your needs with prompt response times and excellent customer service.`;
  } else if (type === "Full-time") {
    return `${company} is seeking a motivated ${title} to join our growing team. We offer a competitive work environment with opportunities for professional growth and development. This position is ideal for candidates looking to advance their career in a supportive and dynamic organization.`;
  }
  return `${company} offers ${title.toLowerCase()}. We are committed to providing quality service and creating value for our clients and community.`;
};

export const ViewDetailsModal = ({
  open,
  onOpenChange,
  title,
  company,
  location,
  type,
  postedTime,
  urgent,
}: ViewDetailsModalProps) => {
  const description = getDescription(title, company, type);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <DialogTitle className="text-2xl">{title}</DialogTitle>
            {urgent && (
              <Badge variant="destructive" className="shrink-0">
                Urgent
              </Badge>
            )}
          </div>
          <DialogDescription className="pt-2">
            <div className="flex items-center gap-2 text-base font-medium text-foreground">
              <Building2 className="h-4 w-4" />
              {company}
            </div>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{location}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>Posted {postedTime}</span>
            </div>
            <Badge variant="secondary" className="w-fit">
              {type}
            </Badge>
          </div>

          <div className="pt-2">
            <h4 className="mb-2 text-sm font-semibold text-foreground">About</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

