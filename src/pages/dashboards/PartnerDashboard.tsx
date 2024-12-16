import { useAuth } from "@/components/AuthProvider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building, Users, BadgeCheck, TrendingUp, LogOut, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate, Routes, Route } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import PartnerProfile from "./partner/Profile";
import PartnerCustomers from "./partner/Customers";

const PartnerDashboardHome = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const firstName = user?.user_metadata?.first_name || 'Partner';

  const dashboardCards = [
    {
      icon: <Users className="w-12 h-12 text-coral" />,
      title: "Manage Customers",
      description: "View and manage your customer relationships.",
      action: () => navigate("customers"),
      metric: "0 Active",
    },
    {
      icon: <Building className="w-12 h-12 text-coral" />,
      title: "Partner Profile",
      description: "Complete your business profile and services.",
      action: () => navigate("profile"),
      metric: "Incomplete",
    },
    {
      icon: <TrendingUp className="w-12 h-12 text-coral" />,
      title: "Performance",
      description: "Track your business metrics and growth.",
      action: () => navigate("analytics"),
      metric: "View Stats",
    },
    {
      icon: <BadgeCheck className="w-12 h-12 text-coral" />,
      title: "Verification",
      description: "Complete your partner verification process.",
      action: () => navigate("verification"),
      metric: "Pending",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-powderblue to-white p-8">
      <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
        <div className="flex justify-between items-center">
          <div className="space-y-1">
            <h1 className="text-4xl font-bold text-midnight">
              Welcome, {firstName}!
            </h1>
            <p className="text-lg text-gray-600">
              Manage your moving services and grow your business
            </p>
          </div>
          <Button
            variant="outline"
            onClick={signOut}
            className="flex items-center gap-2 hover:bg-red-50 hover:text-red-600"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {dashboardCards.map((card, index) => (
            <Card 
              key={index}
              className="relative overflow-hidden group hover:border-coral transition-colors duration-300"
            >
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  {card.icon}
                  <span className="text-sm font-medium text-gray-500">
                    {card.metric}
                  </span>
                </div>
                <h3 className="font-semibold text-xl text-midnight mb-2">{card.title}</h3>
                <p className="text-gray-600 mb-4">{card.description}</p>
                <Button
                  onClick={card.action}
                  variant="ghost"
                  className="w-full justify-between hover:bg-coral/10"
                >
                  Get Started
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

const PartnerDashboard = () => {
  return (
    <Routes>
      <Route index element={<PartnerDashboardHome />} />
      <Route path="profile" element={<PartnerProfile />} />
      <Route path="customers" element={<PartnerCustomers />} />
    </Routes>
  );
};

export default PartnerDashboard;