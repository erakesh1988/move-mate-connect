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

  const carouselSlides = [
    {
      title: "For Relocating Employees",
      description: "Take control of your move. We streamline the relocation process, making your transition smooth and stress-free.",
      cta: "Start Your Journey",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1973&auto=format&fit=crop",
    },
    {
      title: "For HR Professionals",
      description: "Manage employee relocations effortlessly. Our platform helps you track and support your team's moves with ease.",
      cta: "Empower Your Team",
      image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070&auto=format&fit=crop",
    },
    {
      title: "For Relocation Partners",
      description: "Connect with businesses and individuals who need your expertise. Grow your relocation services reach.",
      cta: "Join Our Network",
      image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=2069&auto=format&fit=crop",
    },
    {
      title: "For Service Vendors",
      description: "Showcase your moving, storage, or housing services to a targeted audience of relocating professionals.",
      cta: "Partner With Us",
      image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=2069&auto=format&fit=crop",
    }
  ];

  return (
    <div className="min-h-screen">
      <NavBar />
      
      {/* Hero Carousel Section */}
      <div className="h-screen relative">
        <Carousel
          opts={{
            align: "start",
            loop: true
          }}
          className="w-full h-full"
        >
          <CarouselContent className="h-full">
            {carouselSlides.map((slide, index) => (
              <CarouselItem key={index} className="h-full relative">
                <div 
                  className="w-full h-full bg-cover bg-center relative"
                  style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 92, 0.7), rgba(0, 0, 92, 0.5)), url('${slide.image}')`
                  }}
                >
                  <div className="absolute inset-0 flex flex-col justify-center items-start px-16 max-w-3xl">
                    <h2 className="text-5xl font-bold text-white mb-6 animate-fade-up">
                      {slide.title}
                    </h2>
                    <p className="text-2xl text-white/90 mb-8 animate-fade-up">
                      {slide.description}
                    </p>
                    <Button 
                      size="lg"
                      className="animate-fade-up bg-coral hover:bg-coral/90 text-white text-xl py-8 px-12"
                      onClick={() => navigate('/login')}
                    >
                      {slide.cta}
                      <ArrowRight className="ml-2 h-6 w-6" />
                    </Button>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="h-12 w-12 left-4" />
          <CarouselNext className="h-12 w-12 right-4" />
        </Carousel>
      </div>

      {/* Search Section */}
      <div className="max-w-7xl mx-auto px-4 py-16 bg-powderblue">
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