import { Header } from "@/components/layout/Header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MapPin, Phone, Clock, Heart, Building2, ShoppingBag, Hospital, Pill, Home, UtensilsCrossed } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const serviceCategories = [
  { id: "all", label: "All", icon: Building2 },
  { id: "bank", label: "Bank", icon: Building2 },
  { id: "shop", label: "Shops", icon: ShoppingBag },
  { id: "hospital", label: "Hospital", icon: Hospital },
  { id: "pharmacy", label: "Pharmacy", icon: Pill },
  { id: "rental", label: "House for Rent", icon: Home },
  { id: "meal", label: "Meal Services", icon: UtensilsCrossed },
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

const LocalServices = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [phoneNumbers, setPhoneNumbers] = useState<Record<string, string>>({});

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

  const filteredBusinesses = selectedCategory === "all"
    ? mockBusinesses
    : mockBusinesses.filter((business) => business.category === selectedCategory);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
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

        <div className="mb-6">
          <h1 className="mb-2 text-3xl font-bold text-foreground">Local Services</h1>
          <p className="text-muted-foreground">
            Discover essential services in your area — Bank, Shops, Hospital, Pharmacy, House for Rent, Meal Services
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

        {/* Businesses Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredBusinesses.map((business) => (
            <Card key={business.id} className="overflow-hidden transition-all hover:shadow-md">
              <div className="p-6">
                <div className="mb-4 flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="mb-1 font-semibold text-foreground line-clamp-2">
                      {business.name}
                    </h3>
                    <Badge variant="secondary" className="mt-1 text-xs">
                      {serviceCategories.find((c) => c.id === business.category)?.label}
                    </Badge>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="shrink-0"
                    onClick={() => toggleFavorite(business.id)}
                    aria-label="Add to favorites"
                  >
                    <Heart
                      className={`h-4 w-4 ${
                        favorites.includes(business.id) ? "fill-red-500 text-red-500" : ""
                      }`}
                    />
                  </Button>
                </div>

                <p className="mb-4 text-sm text-muted-foreground line-clamp-2">
                  {business.description}
                </p>

                <div className="mb-4 space-y-2 text-sm text-muted-foreground">
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
                  onClick={() => handleContactClick(business.id)}
                >
                  <Phone className="mr-2 h-4 w-4" />
                  Contact
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LocalServices;
