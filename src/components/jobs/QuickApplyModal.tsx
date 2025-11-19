import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckCircle2, Upload } from "lucide-react";
import { toast } from "sonner";

interface QuickApplyModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  jobTitle: string;
  employerName: string;
}

export const QuickApplyModal = ({
  open,
  onOpenChange,
  jobTitle,
  employerName,
}: QuickApplyModalProps) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
    consent: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.consent) {
      toast.error("Please agree to share your contact details");
      return;
    }

    // Simulate submission
    setTimeout(() => {
      setSubmitted(true);
      toast.success("Contact details shared successfully!");
    }, 800);
  };

  const handleClose = () => {
    onOpenChange(false);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: "",
        phone: "",
        email: "",
        message: "",
        consent: false,
      });
    }, 300);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-lg">
        {!submitted ? (
          <>
            <DialogHeader>
              <DialogTitle>Quick Apply</DialogTitle>
              <DialogDescription>
                Share your contact details with {employerName} for "{jobTitle}"
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 1234567890"
                />
              </div>

              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <Label htmlFor="message">Message (Optional)</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Brief introduction or note to employer"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="cv" className="flex cursor-pointer items-center gap-2">
                  <Button type="button" variant="outline" size="sm" className="pointer-events-none">
                    <Upload className="mr-2 h-4 w-4" />
                    Attach CV
                  </Button>
                  <span className="text-sm text-muted-foreground">(Optional)</span>
                  <input id="cv" type="file" accept=".pdf,.doc,.docx" className="hidden" />
                </Label>
              </div>

              <div className="rounded-lg bg-muted/50 p-4">
                <div className="flex items-start gap-3">
                  <Checkbox
                    id="consent"
                    checked={formData.consent}
                    onCheckedChange={(checked) =>
                      setFormData({ ...formData, consent: checked as boolean })
                    }
                  />
                  <Label htmlFor="consent" className="text-sm leading-relaxed">
                    I agree to share my contact details with {employerName}. Your contact
                    details will be shared only with employers you request.
                  </Label>
                </div>
              </div>

              <Button type="submit" className="w-full bg-action hover:bg-action/90">
                Confirm & Send
              </Button>
            </form>
          </>
        ) : (
          <div className="py-8 text-center">
            <div className="mb-4 flex justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <CheckCircle2 className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <h3 className="mb-2 text-xl font-bold text-foreground">Contact Shared!</h3>
            <p className="mb-6 text-muted-foreground">
              The employer will reach out within 48 hours.
            </p>
            <Button onClick={handleClose} className="w-full bg-action hover:bg-action/90">
              Done
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
