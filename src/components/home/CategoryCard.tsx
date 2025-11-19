import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

interface CategoryCardProps {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  href: string;
  color: "primary" | "action" | "accent";
}

export const CategoryCard = ({ icon: Icon, title, subtitle, href, color }: CategoryCardProps) => {
  const navigate = useNavigate();
  
  const colorClasses = {
    primary: "bg-primary/10 text-primary hover:bg-primary/20",
    action: "bg-action/10 text-action hover:bg-action/20",
    accent: "bg-accent/10 text-accent-foreground hover:bg-accent/20",
  };

  return (
    <Card
      className="group cursor-pointer overflow-hidden border-2 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
      onClick={() => navigate(href)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          navigate(href);
        }
      }}
    >
      <div className="p-6">
        <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg transition-colors ${colorClasses[color]}`}>
          <Icon className="h-6 w-6" />
        </div>
        <h3 className="mb-2 text-xl font-bold text-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      </div>
    </Card>
  );
};
