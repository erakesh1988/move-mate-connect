import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "@/components/AuthProvider";
import { RoleSelector } from "@/components/auth/RoleSelector";
import { toast } from "sonner";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const Login = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      const role = user.user_metadata?.role || 'customer';
      console.log("User authenticated, redirecting to dashboard with role:", role);
      navigate(`/dashboard/${role}`);
      toast.success(`Welcome back!`);
    }
  }, [user, navigate]);

  const slides = [
    {
      title: "For Relocating Employees",
      description: "Take control of your move. We streamline the relocation process, making your transition smooth and stress-free.",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1973&auto=format&fit=crop",
    },
    {
      title: "For HR Professionals",
      description: "Manage employee relocations effortlessly. Our platform helps you track and support your team's moves with ease.",
      image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070&auto=format&fit=crop",
    },
    {
      title: "For Relocation Partners",
      description: "Connect with businesses and individuals who need your expertise. Grow your relocation services reach.",
      image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=2069&auto=format&fit=crop",
    },
    {
      title: "For Service Vendors",
      description: "Showcase your moving, storage, or housing services to a targeted audience of relocating professionals.",
      image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=2069&auto=format&fit=crop",
    }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Carousel className="w-full h-screen relative" opts={{ loop: true }}>
        <CarouselContent>
          {slides.map((slide, index) => (
            <CarouselItem key={index} className="h-screen">
              <div 
                className="w-full h-full bg-cover bg-center relative"
                style={{
                  backgroundImage: `linear-gradient(rgba(0, 0, 92, 0.7), rgba(0, 0, 92, 0.5)), url('${slide.image}')`
                }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                      <div className="text-white space-y-6 animate-fade-up">
                        <h1 className="text-4xl sm:text-5xl font-bold leading-tight">
                          {slide.title}
                        </h1>
                        <p className="text-xl sm:text-2xl text-white/90">
                          {slide.description}
                        </p>
                      </div>
                      <div className="backdrop-blur-sm bg-white/10 rounded-2xl p-6 animate-fade-up">
                        <Card className="w-full bg-white/95 backdrop-blur-sm">
                          <CardHeader className="text-center">
                            <h2 className="text-2xl font-bold text-midnight">
                              Get Started
                            </h2>
                          </CardHeader>
                          <CardContent>
                            <RoleSelector defaultRole="customer" />
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="h-12 w-12 left-4" />
        <CarouselNext className="h-12 w-12 right-4" />
      </Carousel>
    </div>
  );
};

export default Login;