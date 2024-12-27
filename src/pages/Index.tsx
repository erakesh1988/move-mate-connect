import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { NavBar } from "@/components/NavBar";
import { SearchDestination } from "@/components/SearchDestination";
import { ExpertCard } from "@/components/ExpertCard";
import { useAuth } from "@/components/AuthProvider";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Index = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      const role = user.user_metadata?.role || 'customer';
      navigate(`/dashboard/${role}`);
    }
  }, [user, navigate]);

  const userGroupMessages = [
    {
      title: "For Relocating Employees",
      description: "Take control of your move. We streamline the relocation process, making your transition smooth and stress-free.",
      cta: "Start Your Journey"
    },
    {
      title: "For HR Professionals",
      description: "Manage employee relocations effortlessly. Our platform helps you track and support your team's moves with ease.",
      cta: "Empower Your Team"
    },
    {
      title: "For Relocation Partners",
      description: "Connect with businesses and individuals who need your expertise. Grow your relocation services reach.",
      cta: "Join Our Network"
    },
    {
      title: "For Service Vendors",
      description: "Showcase your moving, storage, or housing services to a targeted audience of relocating professionals.",
      cta: "Partner With Us"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-midnight to-powderblue">
      <NavBar />
      
      {/* Hero Section with Background Image */}
      <div 
        className="relative h-[70vh] bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: "linear-gradient(rgba(0, 0, 92, 0.7), rgba(234, 245, 254, 0.7)), url('https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d')",
          backgroundBlendMode: "overlay"
        }}
      >
        <div className="text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-white mb-6 animate-fade-up">
            Welcome to Move Mate Connect
          </h1>
          <p className="text-xl text-white/90 mb-8 animate-fade-up">
            Connect with expert movers and make your relocation seamless. Our platform helps you find reliable moving services tailored to your needs.
          </p>
          <Button 
            size="lg" 
            className="animate-fade-up bg-coral hover:bg-coral/90 text-white"
            onClick={() => navigate('/login')}
          >
            Get Started
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* User Groups Carousel */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center text-midnight mb-12">
          Solutions for Every Move
        </h2>
        
        <Carousel
          opts={{
            align: "start",
            loop: true
          }}
          className="w-full"
        >
          <CarouselContent>
            {userGroupMessages.map((message, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="bg-white rounded-xl p-6 h-full shadow-lg">
                  <h3 className="text-xl font-semibold text-midnight mb-4">
                    {message.title}
                  </h3>
                  <p className="text-midnight/80 mb-6">
                    {message.description}
                  </p>
                  <Button 
                    variant="secondary"
                    className="w-full bg-mint hover:bg-mint/90 text-midnight"
                    onClick={() => navigate('/login')}
                  >
                    {message.cta}
                  </Button>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>

      {/* Search Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="mb-16">
          <SearchDestination />
        </div>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ExpertCard
            name="John Smith"
            rating={4.9}
            reviews={156}
            image="/placeholder.svg"
            verified={true}
            experience={250}
          />
          <ExpertCard
            name="Sarah Johnson"
            rating={4.8}
            reviews={142}
            image="/placeholder.svg"
            verified={true}
            experience={180}
          />
          <ExpertCard
            name="Mike Wilson"
            rating={4.7}
            reviews={98}
            image="/placeholder.svg"
            verified={true}
            experience={120}
          />
        </section>
      </div>
    </div>
  );
};

export default Index;