import { Header } from "@/components/layout/Header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Bookmark, History, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const jobTypes = [
  { id: "training", label: "Training" },
  { id: "internship", label: "Internship" },
  { id: "daily-wage", label: "Daily-wage" },
  { id: "part-time", label: "Part-time" },
  { id: "full-time", label: "Full-time" },
];

const Profile = () => {
  const navigate = useNavigate();
  const [preferredTypes, setPreferredTypes] = useState<string[]>(["internship", "part-time"]);
  const [contactVisible, setContactVisible] = useState(true);

  const toggleJobType = (typeId: string) => {
    setPreferredTypes((prev) =>
      prev.includes(typeId) ? prev.filter((id) => id !== typeId) : [...prev, typeId]
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container px-4 py-6">
        <Button
          variant="ghost"
          size="sm"
          className="mb-4"
          onClick={() => navigate("/")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>

        <div className="mx-auto max-w-4xl">
          <h1 className="mb-6 text-3xl font-bold text-foreground">Profile & Preferences</h1>

          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="profile">
                <Settings className="mr-2 h-4 w-4" />
                Profile
              </TabsTrigger>
              <TabsTrigger value="saved">
                <Bookmark className="mr-2 h-4 w-4" />
                Saved
              </TabsTrigger>
              <TabsTrigger value="history">
                <History className="mr-2 h-4 w-4" />
                History
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="space-y-6">
              <Card className="p-6">
                <h2 className="mb-4 text-xl font-bold text-foreground">Personal Information</h2>
                <form className="space-y-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" placeholder="Enter your name" defaultValue="Rahul Sharma" />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+91 1234567890"
                        defaultValue="+91 98765 43210"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="email@example.com"
                        defaultValue="rahul@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="location">Preferred Location</Label>
                    <Input id="location" placeholder="City or area" defaultValue="Chandigarh" />
                  </div>

                  <Button type="submit" className="bg-action hover:bg-action/90">
                    Save Changes
                  </Button>
                </form>
              </Card>

              <Card className="p-6">
                <h2 className="mb-4 text-xl font-bold text-foreground">Job Preferences</h2>
                <div className="space-y-4">
                  <div>
                    <Label className="mb-3 block">Preferred Job Types</Label>
                    <div className="flex flex-wrap gap-2">
                      {jobTypes.map((type) => (
                        <Badge
                          key={type.id}
                          variant={preferredTypes.includes(type.id) ? "default" : "outline"}
                          className="cursor-pointer transition-colors hover:bg-primary/10"
                          onClick={() => toggleJobType(type.id)}
                        >
                          {type.label}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h2 className="mb-4 text-xl font-bold text-foreground">Privacy Settings</h2>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="visibility" className="text-base">
                      Contact Details Visibility
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Allow employers to see your contact information
                    </p>
                  </div>
                  <Switch
                    id="visibility"
                    checked={contactVisible}
                    onCheckedChange={setContactVisible}
                  />
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="saved">
              <Card className="p-6">
                <h2 className="mb-4 text-xl font-bold text-foreground">Saved Jobs & Services</h2>
                <p className="text-muted-foreground">
                  You haven't saved any jobs or services yet. Browse opportunities and save your
                  favorites to access them quickly later.
                </p>
                <Button
                  className="mt-4 bg-action hover:bg-action/90"
                  onClick={() => navigate("/jobs")}
                >
                  Browse Jobs
                </Button>
              </Card>
            </TabsContent>

            <TabsContent value="history">
              <Card className="p-6">
                <h2 className="mb-4 text-xl font-bold text-foreground">Application History</h2>
                <p className="text-muted-foreground">
                  Your application history will appear here once you start applying for jobs and
                  services.
                </p>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Profile;
