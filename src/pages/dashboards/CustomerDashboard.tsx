import { useAuth } from "@/components/AuthProvider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { House, Smile, User, CheckCircle, Info, ArrowRight, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate, Routes, Route } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import CustomerProfile from "./customer/Profile";

const CustomerDashboardHome = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const firstName = user?.user_metadata?.first_name || 'there';

  const onboardingSteps = [
    {
      icon: <House className="w-6 h-6 text-primary" />,
      title: "Welcome Home",
      description: "Your journey to a new home starts here. Let's make it amazing together.",
    },
    {
      icon: <User className="w-6 h-6 text-primary" />,
      title: "Complete Your Profile",
      description: "Help us understand your preferences better.",
      action: () => navigate("profile"),
    },
    {
      icon: <Gift className="w-6 h-6 text-primary" />,
      title: "Explore Services",
      description: "Discover our range of moving services tailored for you.",
      action: () => navigate("services"),
    },
    {
      icon: <CheckCircle className="w-6 h-6 text-primary" />,
      title: "Plan Your Move",
      description: "Start planning your move with our interactive tools.",
      action: () => navigate("plan"),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-powderblue to-white p-8">
      <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
        {/* Welcome Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-midnight">
            Welcome, {firstName}! <Smile className="inline-block w-8 h-8 text-coral ml-2" />
          </h1>
          <p className="text-lg text-gray-600">
            Let's make your moving journey smooth and enjoyable
          </p>
        </div>

        {/* Quick Start Guide */}
        <Card className="border-2 border-coral/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Info className="w-5 h-5 text-coral" />
              Getting Started
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
                      {step.action && (
                        <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-coral transition-colors duration-300" />
                      )}
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

const CustomerDashboard = () => {
  return (
    <Routes>
      <Route index element={<CustomerDashboardHome />} />
      <Route path="profile" element={<CustomerProfile />} />
    </Routes>
  );
};

export default CustomerDashboard;