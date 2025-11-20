import { Header } from "@/components/layout/Header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Star, MapPin, Phone, Wrench, Zap, Droplets, Sparkles, PaintBucket } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { BookNowModal } from "@/components/jobs/BookNowModal";

const serviceCategories = [
  { id: "all", label: "All Services", icon: Sparkles },
  { id: "plumber", label: "Plumber", icon: Droplets },
  { id: "mechanic", label: "Mechanic", icon: Wrench },
  { id: "electrician", label: "Electrician", icon: Zap },
  { id: "maid", label: "Maid", icon: Sparkles },
  { id: "painter", label: "Painter", icon: PaintBucket },
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

const DailyServices = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [phoneNumbers, setPhoneNumbers] = useState<Record<string, string>>({});
  const [bookNowModalOpen, setBookNowModalOpen] = useState(false);
  const [selectedWorker, setSelectedWorker] = useState<typeof mockWorkers[0] | null>(null);

  const generatePhoneNumber = (id: string) => {
    if (!phoneNumbers[id]) {
      const randomNumber = Math.floor(1000000000 + Math.random() * 9000000000).toString();
      setPhoneNumbers((prev) => ({ ...prev, [id]: randomNumber }));
      return randomNumber;
    }
    return phoneNumbers[id];
  };

  const handleContactClick = (id: string) => {
    const number = generatePhoneNumber(id);
    alert(`Contact Number: ${number}`);
  };

  const handleBookNow = (worker: typeof mockWorkers[0]) => {
    setSelectedWorker(worker);
    setBookNowModalOpen(true);
  };

  const filteredWorkers = selectedCategory === "all"
    ? mockWorkers
    : mockWorkers.filter((worker) => worker.service === selectedCategory);

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
          <h1 className="mb-2 text-3xl font-bold text-foreground">Daily Services</h1>
          <p className="text-muted-foreground">
            Find skilled workers for your daily needs — Plumber, Mechanic, Electrician, Maid, Painter
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
          {serviceCategories.map((category) => {
            const Icon = category.icon;
            return (
              <Badge
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                className="cursor-pointer whitespace-nowrap transition-colors hover:bg-primary/10"
                onClick={() => setSelectedCategory(category.id)}
              >
                <Icon className="mr-1 h-3 w-3" />
                {category.label}
              </Badge>
            );
          })}
        </div>

        {/* Workers Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredWorkers.map((worker) => (
            <Card key={worker.id} className="overflow-hidden transition-all hover:shadow-md">
              <div className="p-6">
                <div className="mb-4 flex items-start justify-between">
                  <div>
                    <h3 className="mb-1 font-semibold text-foreground">{worker.name}</h3>
                    <p className="text-sm text-muted-foreground">{worker.serviceName}</p>
                  </div>
                  <Badge variant="secondary" className="shrink-0">
                    <Star className="mr-1 h-3 w-3 fill-accent text-accent" />
                    {worker.rating}
                  </Badge>
                </div>

                <div className="mb-4 space-y-2 text-sm">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    <span className="line-clamp-1">{worker.location}</span>
                  </div>
                  <div className="font-medium text-foreground">{worker.rate}</div>
                  <div className="text-xs text-muted-foreground">{worker.reviews} reviews</div>
                </div>

                <div className="space-y-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full bg-yellow-100 hover:bg-yellow-200 border-yellow-300 text-yellow-900"
                    onClick={() => handleContactClick(worker.id)}
                  >
                    <Phone className="mr-2 h-4 w-4" />
                    Contact
                  </Button>
                  <Button 
                    className="w-full bg-action hover:bg-action/90" 
                    size="sm"
                    onClick={() => handleBookNow(worker)}
                  >
                    Book Now
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {selectedWorker && (
        <BookNowModal
          open={bookNowModalOpen}
          onOpenChange={setBookNowModalOpen}
          serviceName={selectedWorker.serviceName}
          workerName={selectedWorker.name}
        />
      )}
    </div>
  );
};

export default DailyServices;
