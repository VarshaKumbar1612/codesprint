import { Header } from "@/components/layout/Header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Briefcase, Wrench, MapPin, Search as SearchIcon, Star, Phone, Clock } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useMemo, useState } from "react";

// Import mock data (in a real app, this would come from an API or context)
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
    location: "No. 42, 3rd Main Road, Keshwapur, Hubli",
    jobType: "daily-wage",
    salary: "₹600/day",
    postedTime: "5h ago",
    description: "Daily wage construction work. Experience in masonry or general labor preferred.",
  },
  {
    id: "3",
    title: "Retail Sales Associate",
    company: "Fashion Hub",
    location: "Shop No. 15, 2nd Floor, City Centre Mall, Dharwad",
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
    location: "No. 28, 5th Cross, Vidyanagar, Dharwad",
    jobType: "full-time",
    salary: "₹25,000 - ₹35,000/month",
    postedTime: "3d ago",
    description: "Full-time accounting position. Tally and basic accounting knowledge required.",
  },
  {
    id: "6",
    title: "Sales Executive",
    company: "Local Retail Hub",
    location: "No. 37, 6th Cross, Mayuri Estate, Vijaynagar, Hubli",
    jobType: "full-time",
    salary: "₹20,000 - ₹30,000/month",
    postedTime: "1d ago",
    description: "Full-time sales position with excellent growth opportunities.",
  },
];

const mockWorkers = [
  {
    id: "1",
    name: "Ravi Kumar",
    service: "plumber",
    serviceName: "Plumber",
    location: "No. 37, 6th Cross, Mayuri Estate, Vijaynagar, Hubli",
    rate: "₹500/hour",
    rating: 4.8,
    reviews: 127,
    phone: "+91 98765 43210",
  },
  {
    id: "2",
    name: "Suresh Patel",
    service: "electrician",
    serviceName: "Electrician",
    location: "No. 51, 4th Main, Saptapur, Dharwad",
    rate: "₹600/hour",
    rating: 4.9,
    reviews: 203,
    phone: "+91 98765 43211",
  },
  {
    id: "3",
    name: "Amit Singh",
    service: "mechanic",
    serviceName: "Mechanic",
    location: "No. 23, Industrial Area, Gokul Road, Hubli",
    rate: "₹800/day",
    rating: 4.7,
    reviews: 95,
    phone: "+91 98765 43212",
  },
  {
    id: "4",
    name: "Rajesh Sharma",
    service: "painter",
    serviceName: "Painter",
    location: "No. 19, 2nd Cross, Kelgeri Road, Dharwad",
    rate: "₹700/day",
    rating: 4.6,
    reviews: 78,
    phone: "+91 98765 43213",
  },
];

const mockBusinesses = [
  {
    id: "1",
    name: "State Bank of India - Branch 205",
    category: "bank",
    address: "No. 45, Station Road, Near Clock Tower, Hubli",
    hours: "Mon-Fri: 10 AM - 4 PM",
    phone: "+91 836 2223456",
    description: "Full-service banking with ATM, loans, and account services",
  },
  {
    id: "2",
    name: "City Hospital & Medical Center",
    category: "hospital",
    address: "No. 12, 3rd Main, SDM College Road, Dharwad",
    hours: "24/7 Emergency Services",
    phone: "+91 836 2234567",
    description: "Multi-specialty hospital with emergency care, surgery, and diagnostics",
  },
  {
    id: "3",
    name: "MedPlus Pharmacy",
    category: "pharmacy",
    address: "No. 8, 1st Floor, Keshwapur Main Road, Hubli",
    hours: "8 AM - 10 PM Daily",
    phone: "+91 836 2789456",
    description: "Prescription medicines, health products, and medical supplies",
  },
  {
    id: "4",
    name: "Kumar Electronics & Appliances",
    category: "shop",
    address: "Shop No. 24, 2nd Cross, PB Road, Dharwad",
    hours: "10 AM - 8 PM Daily",
    phone: "+91 836 2654321",
    description: "Electronics, home appliances, and gadgets at competitive prices",
  },
  {
    id: "5",
    name: "Cozy Stay - 2BHK Apartment",
    category: "rental",
    address: "No. 33, 7th Cross, Vidyanagar Extension, Dharwad",
    hours: "Contact for viewing",
    phone: "+91 98765 11111",
    description: "Fully furnished 2BHK apartment near IT park, ₹15,000/month",
  },
  {
    id: "6",
    name: "Home Kitchen Tiffin Service",
    category: "meal",
    address: "No. 56, 4th Main, Unkal Lake Road, Hubli",
    hours: "Delivery: 12 PM - 2 PM, 7 PM - 9 PM",
    phone: "+91 98765 22222",
    description: "Hygienic home-cooked meals, monthly packages available",
  },
];

const SearchResults = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [phoneNumbers, setPhoneNumbers] = useState<Record<string, string>>({});

  const generatePhoneNumber = (id: string, type: string) => {
    const key = `${type}-${id}`;
    if (!phoneNumbers[key]) {
      const randomNumber = Math.floor(1000000000 + Math.random() * 9000000000).toString();
      setPhoneNumbers((prev) => ({ ...prev, [key]: randomNumber }));
      return randomNumber;
    }
    return phoneNumbers[key];
  };

  const handleContactClick = (id: string, type: string) => {
    const number = generatePhoneNumber(id, type);
    alert(`Contact Number: ${number}`);
  };

  const searchResults = useMemo(() => {
    if (!query.trim()) {
      return { jobs: [], workers: [], businesses: [] };
    }

    const searchTerm = query.toLowerCase().trim();

    // Search jobs
    const jobs = mockJobs.filter(
      (job) =>
        job.title.toLowerCase().includes(searchTerm) ||
        job.company.toLowerCase().includes(searchTerm) ||
        job.location.toLowerCase().includes(searchTerm) ||
        job.description.toLowerCase().includes(searchTerm) ||
        job.jobType.toLowerCase().includes(searchTerm)
    );

    // Search workers/services
    const workers = mockWorkers.filter(
      (worker) =>
        worker.name.toLowerCase().includes(searchTerm) ||
        worker.serviceName.toLowerCase().includes(searchTerm) ||
        worker.service.toLowerCase().includes(searchTerm) ||
        worker.location.toLowerCase().includes(searchTerm)
    );

    // Search businesses
    const businesses = mockBusinesses.filter(
      (business) =>
        business.name.toLowerCase().includes(searchTerm) ||
        business.category.toLowerCase().includes(searchTerm) ||
        business.address.toLowerCase().includes(searchTerm) ||
        business.description.toLowerCase().includes(searchTerm)
    );

    return { jobs, workers, businesses };
  }, [query]);

  const totalResults = searchResults.jobs.length + searchResults.workers.length + searchResults.businesses.length;

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

        <div className="mb-6">
          <h1 className="mb-2 text-3xl font-bold text-foreground">Search Results</h1>
          {query ? (
            <p className="text-muted-foreground">
              {totalResults > 0
                ? `Found ${totalResults} result${totalResults !== 1 ? "s" : ""} for "${query}"`
                : `No results found for "${query}"`}
            </p>
          ) : (
            <p className="text-muted-foreground">Enter a search term to find jobs, services, or locations</p>
          )}
        </div>

        {!query.trim() ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <SearchIcon className="mb-4 h-12 w-12 text-muted-foreground" />
            <p className="text-lg text-muted-foreground">Please enter a search term</p>
          </div>
        ) : totalResults === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <SearchIcon className="mb-4 h-12 w-12 text-muted-foreground" />
            <p className="mb-2 text-lg font-semibold text-foreground">No results found</p>
            <p className="text-muted-foreground">
              Try searching for different keywords or check your spelling
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Jobs Results */}
            {searchResults.jobs.length > 0 && (
              <section>
                <h2 className="mb-4 text-xl font-semibold text-foreground flex items-center gap-2">
                  <Briefcase className="h-5 w-5" />
                  Jobs ({searchResults.jobs.length})
                </h2>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {searchResults.jobs.map((job) => (
                    <Card key={job.id} className="p-6 transition-all hover:shadow-md">
                      <div className="flex flex-col gap-3">
                        <div>
                          <h3 className="mb-1 font-semibold text-foreground">{job.title}</h3>
                          <p className="text-sm text-muted-foreground">{job.company}</p>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="h-3.5 w-3.5" />
                          <span>{job.location}</span>
                        </div>
                        <Badge variant="secondary" className="w-fit">
                          {job.jobType}
                        </Badge>
                        <p className="text-sm font-medium text-foreground">{job.salary}</p>
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full"
                          onClick={() => navigate(`/jobs/${job.id}`)}
                        >
                          View Details
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </section>
            )}

            {/* Services/Workers Results */}
            {searchResults.workers.length > 0 && (
              <section>
                <h2 className="mb-4 text-xl font-semibold text-foreground flex items-center gap-2">
                  <Wrench className="h-5 w-5" />
                  Daily Services ({searchResults.workers.length})
                </h2>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {searchResults.workers.map((worker) => (
                    <Card key={worker.id} className="p-6 transition-all hover:shadow-md">
                      <div className="flex flex-col gap-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="mb-1 font-semibold text-foreground">{worker.name}</h3>
                            <p className="text-sm text-muted-foreground">{worker.serviceName}</p>
                          </div>
                          <Badge variant="secondary" className="shrink-0">
                            <Star className="mr-1 h-3 w-3 fill-accent text-accent" />
                            {worker.rating}
                          </Badge>
                        </div>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <MapPin className="h-3 w-3" />
                            <span className="line-clamp-1">{worker.location}</span>
                          </div>
                          <div className="font-medium text-foreground">{worker.rate}</div>
                          <div className="text-xs text-muted-foreground">{worker.reviews} reviews</div>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="w-full bg-yellow-100 hover:bg-yellow-200 border-yellow-300 text-yellow-900"
                          onClick={() => handleContactClick(worker.id, "worker")}
                        >
                          <Phone className="mr-2 h-4 w-4" />
                          Contact
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </section>
            )}

            {/* Local Services/Businesses Results */}
            {searchResults.businesses.length > 0 && (
              <section>
                <h2 className="mb-4 text-xl font-semibold text-foreground flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Local Services ({searchResults.businesses.length})
                </h2>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {searchResults.businesses.map((business) => (
                    <Card key={business.id} className="p-6 transition-all hover:shadow-md">
                      <div className="flex flex-col gap-3">
                        <div>
                          <h3 className="mb-1 font-semibold text-foreground line-clamp-2">
                            {business.name}
                          </h3>
                          <Badge variant="secondary" className="mt-1 text-xs">
                            {business.category}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {business.description}
                        </p>
                        <div className="space-y-2 text-sm text-muted-foreground">
                          <div className="flex items-start gap-1">
                            <MapPin className="mt-0.5 h-3 w-3 shrink-0" />
                            <span className="line-clamp-1">{business.address}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3 shrink-0" />
                            <span>{business.hours}</span>
                          </div>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="w-full bg-yellow-100 hover:bg-yellow-200 border-yellow-300 text-yellow-900"
                          onClick={() => handleContactClick(business.id, "business")}
                        >
                          <Phone className="mr-2 h-4 w-4" />
                          Contact
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;

