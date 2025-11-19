import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { MapPin, SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface JobFiltersProps {
  selectedTypes: string[];
  onTypeToggle: (type: string) => void;
}

const jobTypes = [
  { id: "training", label: "Training" },
  { id: "internship", label: "Internship" },
  { id: "daily-wage", label: "Daily-wage" },
  { id: "part-time", label: "Part-time" },
  { id: "full-time", label: "Full-time" },
];

export const JobFilters = ({ selectedTypes, onTypeToggle }: JobFiltersProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [salary, setSalary] = useState([0, 100000]);
  const [remote, setRemote] = useState(false);

  return (
    <div className="rounded-lg border bg-card p-4">
      {/* Mobile Collapsible Header */}
      <Collapsible open={isOpen} onOpenChange={setIsOpen} className="md:hidden">
        <CollapsibleTrigger asChild>
          <Button variant="ghost" className="w-full justify-between">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4" />
              <span>Filters</span>
              {selectedTypes.length > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {selectedTypes.length}
                </Badge>
              )}
            </div>
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-4 space-y-6">
          <FilterContent
            jobTypes={jobTypes}
            selectedTypes={selectedTypes}
            onTypeToggle={onTypeToggle}
            salary={salary}
            setSalary={setSalary}
            remote={remote}
            setRemote={setRemote}
          />
        </CollapsibleContent>
      </Collapsible>

      {/* Desktop Always Visible */}
      <div className="hidden md:block">
        <div className="mb-4 flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4" />
          <h3 className="font-semibold">Filters</h3>
          {selectedTypes.length > 0 && (
            <Badge variant="secondary" className="ml-auto">
              {selectedTypes.length} applied
            </Badge>
          )}
        </div>
        <FilterContent
          jobTypes={jobTypes}
          selectedTypes={selectedTypes}
          onTypeToggle={onTypeToggle}
          salary={salary}
          setSalary={setSalary}
          remote={remote}
          setRemote={setRemote}
        />
      </div>
    </div>
  );
};

interface FilterContentProps {
  jobTypes: { id: string; label: string }[];
  selectedTypes: string[];
  onTypeToggle: (type: string) => void;
  salary: number[];
  setSalary: (value: number[]) => void;
  remote: boolean;
  setRemote: (value: boolean) => void;
}

const FilterContent = ({
  jobTypes,
  selectedTypes,
  onTypeToggle,
  salary,
  setSalary,
  remote,
  setRemote,
}: FilterContentProps) => (
  <>
    {/* Job Type */}
    <div>
      <h4 className="mb-3 text-sm font-medium">Job Type</h4>
      <div className="flex flex-wrap gap-2">
        {jobTypes.map((type) => (
          <Badge
            key={type.id}
            variant={selectedTypes.includes(type.id) ? "default" : "outline"}
            className="cursor-pointer transition-colors hover:bg-primary/10"
            onClick={() => onTypeToggle(type.id)}
          >
            {type.label}
          </Badge>
        ))}
      </div>
    </div>

    {/* Location */}
    <div>
      <h4 className="mb-3 text-sm font-medium">Location</h4>
      <Button variant="outline" size="sm" className="w-full justify-start">
        <MapPin className="mr-2 h-4 w-4" />
        Auto-detect location
      </Button>
    </div>

    {/* Remote Toggle */}
    <div className="flex items-center justify-between">
      <Label htmlFor="remote-toggle" className="text-sm font-medium">
        Remote only
      </Label>
      <Switch id="remote-toggle" checked={remote} onCheckedChange={setRemote} />
    </div>

    {/* Salary Range */}
    <div>
      <h4 className="mb-3 text-sm font-medium">
        Salary Range: ₹{salary[0].toLocaleString()} - ₹{salary[1].toLocaleString()}
      </h4>
      <Slider
        value={salary}
        onValueChange={setSalary}
        min={0}
        max={100000}
        step={5000}
        className="w-full"
      />
    </div>
  </>
);
