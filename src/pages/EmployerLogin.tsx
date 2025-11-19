import { Header } from "@/components/layout/Header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Briefcase, Wrench, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const EmployerLogin = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggedIn(true);
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
          {!isLoggedIn ? (
            <Card className="p-6 md:p-8">
              <div className="mb-6 text-center">
                <h1 className="mb-2 text-3xl font-bold text-foreground">
                  Employer / Provider Login
                </h1>
                <p className="text-muted-foreground">
                  Post jobs, add services, or list your business
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="employer@example.com"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    required
                  />
                </div>

                <Button type="submit" className="w-full bg-action hover:bg-action/90">
                  Login
                </Button>

                <div className="text-center text-sm text-muted-foreground">
                  Don't have an account?{" "}
                  <Button variant="link" className="p-0 text-primary">
                    Sign up
                  </Button>
                </div>
              </form>
            </Card>
          ) : (
            <div className="space-y-6">
              <Card className="p-6">
                <h2 className="mb-4 text-2xl font-bold text-foreground">
                  Welcome back! What would you like to do?
                </h2>
                <p className="text-muted-foreground">
                  Choose an option below to post jobs, add daily services, or list your business
                </p>
              </Card>

              <Tabs defaultValue="jobs" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="jobs">
                    <Briefcase className="mr-2 h-4 w-4" />
                    <span className="hidden sm:inline">Post Jobs</span>
                    <span className="sm:hidden">Jobs</span>
                  </TabsTrigger>
                  <TabsTrigger value="daily">
                    <Wrench className="mr-2 h-4 w-4" />
                    <span className="hidden sm:inline">Daily Services</span>
                    <span className="sm:hidden">Services</span>
                  </TabsTrigger>
                  <TabsTrigger value="local">
                    <MapPin className="mr-2 h-4 w-4" />
                    <span className="hidden sm:inline">Local Business</span>
                    <span className="sm:hidden">Business</span>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="jobs">
                  <Card className="p-6">
                    <h3 className="mb-4 text-xl font-bold text-foreground">Post a Job</h3>
                    <form className="space-y-4">
                      <div>
                        <Label htmlFor="job-title">Job Title *</Label>
                        <Input id="job-title" placeholder="e.g., Sales Executive" required />
                      </div>

                      <div>
                        <Label htmlFor="job-type">Job Type *</Label>
                        <select
                          id="job-type"
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                          required
                        >
                          <option value="">Select type</option>
                          <option value="training">Training</option>
                          <option value="internship">Internship</option>
                          <option value="daily-wage">Daily-wage</option>
                          <option value="part-time">Part-time</option>
                          <option value="full-time">Full-time</option>
                        </select>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <Label htmlFor="job-location">Location *</Label>
                          <Input id="job-location" placeholder="e.g., Chandigarh" required />
                        </div>
                        <div>
                          <Label htmlFor="job-salary">Salary/Rate *</Label>
                          <Input id="job-salary" placeholder="e.g., ₹15,000/month" required />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="job-description">Job Description *</Label>
                        <textarea
                          id="job-description"
                          className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                          placeholder="Describe the role, requirements, and responsibilities..."
                          required
                        />
                      </div>

                      <Button type="submit" className="w-full bg-action hover:bg-action/90">
                        Post Job
                      </Button>
                    </form>
                  </Card>
                </TabsContent>

                <TabsContent value="daily">
                  <Card className="p-6">
                    <h3 className="mb-4 text-xl font-bold text-foreground">
                      Add Daily Service
                    </h3>
                    <form className="space-y-4">
                      <div>
                        <Label htmlFor="worker-name">Your Name *</Label>
                        <Input id="worker-name" placeholder="Full name" required />
                      </div>

                      <div>
                        <Label htmlFor="service-type">Service Type *</Label>
                        <select
                          id="service-type"
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                          required
                        >
                          <option value="">Select service</option>
                          <option value="plumber">Plumber</option>
                          <option value="mechanic">Mechanic</option>
                          <option value="electrician">Electrician</option>
                          <option value="maid">Maid</option>
                          <option value="painter">Painter</option>
                        </select>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <Label htmlFor="service-area">Service Area *</Label>
                          <Input id="service-area" placeholder="e.g., Sector 22" required />
                        </div>
                        <div>
                          <Label htmlFor="service-rate">Rate *</Label>
                          <Input id="service-rate" placeholder="e.g., ₹500/hour" required />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="service-phone">Contact Number *</Label>
                        <Input
                          id="service-phone"
                          type="tel"
                          placeholder="+91 1234567890"
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="service-bio">Short Bio</Label>
                        <textarea
                          id="service-bio"
                          className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                          placeholder="Brief description of your experience and services..."
                        />
                      </div>

                      <Button type="submit" className="w-full bg-action hover:bg-action/90">
                        Add Service
                      </Button>
                    </form>
                  </Card>
                </TabsContent>

                <TabsContent value="local">
                  <Card className="p-6">
                    <h3 className="mb-4 text-xl font-bold text-foreground">
                      Add Local Business
                    </h3>
                    <form className="space-y-4">
                      <div>
                        <Label htmlFor="business-name">Business Name *</Label>
                        <Input id="business-name" placeholder="e.g., City Pharmacy" required />
                      </div>

                      <div>
                        <Label htmlFor="business-category">Category *</Label>
                        <select
                          id="business-category"
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                          required
                        >
                          <option value="">Select category</option>
                          <option value="bank">Bank</option>
                          <option value="shop">Shop</option>
                          <option value="hospital">Hospital</option>
                          <option value="pharmacy">Pharmacy</option>
                          <option value="rental">House for Rent</option>
                          <option value="meal">Meal Service</option>
                        </select>
                      </div>

                      <div>
                        <Label htmlFor="business-address">Address *</Label>
                        <Input id="business-address" placeholder="Full address" required />
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <Label htmlFor="business-phone">Phone Number *</Label>
                          <Input
                            id="business-phone"
                            type="tel"
                            placeholder="+91 1234567890"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="business-hours">Operating Hours *</Label>
                          <Input id="business-hours" placeholder="e.g., 9 AM - 6 PM" required />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="business-description">Description</Label>
                        <textarea
                          id="business-description"
                          className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                          placeholder="Describe your business and services..."
                        />
                      </div>

                      <Button type="submit" className="w-full bg-action hover:bg-action/90">
                        Add Business
                      </Button>
                    </form>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployerLogin;
