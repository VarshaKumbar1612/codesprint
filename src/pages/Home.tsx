import { Header } from "@/components/layout/Header";
import { CategoryCard } from "@/components/home/CategoryCard";
import { SpotlightCarousel } from "@/components/home/SpotlightCarousel";
import { Briefcase, Wrench, MapPin, Sparkles } from "lucide-react";

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="border-b bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container px-4 py-12 md:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-accent/20 px-4 py-2 text-sm font-medium">
              <Sparkles className="h-4 w-4" />
              Find local work and services near you
            </div>
            <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
              Discover Opportunities in Your Neighborhood
            </h1>
            <p className="mb-8 text-lg text-muted-foreground md:text-xl">
              Connect with local jobs, skilled workers, and essential services — all in one place
            </p>
          </div>
        </div>
      </section>

      {/* Spotlight Section */}
      <section className="border-b bg-background">
        <div className="container px-4 py-8 md:py-12">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-foreground">Featured & Urgent</h2>
          </div>
          <SpotlightCarousel />
        </div>
      </section>

      {/* Category Hub */}
      <section className="bg-background">
        <div className="container px-4 py-12 md:py-16">
          <h2 className="mb-8 text-center text-3xl font-bold text-foreground">
            What are you looking for?
          </h2>
          
          <div className="grid gap-6 md:grid-cols-3">
            <CategoryCard
              icon={Briefcase}
              title="Jobs"
              subtitle="Training · Internship · Daily-wage · Part-time · Full-time"
              href="/jobs"
              color="primary"
            />
            <CategoryCard
              icon={Wrench}
              title="Daily Services"
              subtitle="Plumber · Mechanic · Electrician · Maid · Painter"
              href="/daily-services"
              color="action"
            />
            <CategoryCard
              icon={MapPin}
              title="Local Services"
              subtitle="Bank · Shops · Hospital · Pharmacy · House for Rent · Meal Services"
              href="/local-services"
              color="accent"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
