import { useAuth } from "@/components/AuthProvider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building, Users, BadgeCheck, TrendingUp, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate, Routes, Route } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const PartnerDashboardHome = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const firstName = user?.user_metadata?.first_name || 'Partner';

  const onboardingSteps = [
    {
      icon: <Building className="w-6 h-6 text-primary" />,
      title: "Welcome Partner",
      description: "Start your journey as a moving service partner.",
    },
    {
      icon: <Users className="w-6 h-6 text-primary" />,
      title: "Manage Customers",
      description: "View and manage your customer relationships.",
      action: () => navigate("customers"),
    },
    {
      icon: <BadgeCheck className="w-6 h-6 text-primary" />,
      title: "Complete Profile",
      description: "Set up your business profile and services.",
      action: () => navigate("profile"),
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-primary" />,
      title: "View Analytics",
      description: "Track your performance and growth.",
      action: () => navigate("analytics"),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-powderblue to-white p-8">
      <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
        <div className="flex justify-between items-center">
          <div className="text-center space-y-4">
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

        <Card className="border-2 border-coral/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Partner Dashboard
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {onboardingSteps.map((step, index) => (
                <Card 
                  key={index}
                  className="relative overflow-hidden group hover:border-coral transition-colors duration-300"
                >
                  <CardContent className="p-6 space-y-4">
                    <div className="flex justify-between items-start">
                      {step.icon}
                    </div>
                    <h3 className="font-semibold text-lg text-midnight">{step.title}</h3>
                    <p className="text-sm text-gray-600">{step.description}</p>
                    {step.action && (
                      <Button
                        onClick={() => {
                          step.action();
                          toast({
                            title: "Navigating to " + step.title,
                            description: "Loading your personalized experience...",
                          });
                        }}
                        variant="ghost"
                        className="w-full mt-4 hover:bg-coral/10"
                      >
                        Get Started
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const PartnerDashboard = () => {
  return (
    <Routes>
      <Route index element={<PartnerDashboardHome />} />
    </Routes>
  );
};

export default PartnerDashboard;