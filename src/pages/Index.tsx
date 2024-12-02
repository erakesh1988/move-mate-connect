import { SearchDestination } from "@/components/SearchDestination";
import { ExpertCard } from "@/components/ExpertCard";
import { ArrowRight } from "lucide-react";

const experts = [
  {
    name: "John Smith",
    rating: 4.9,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    verified: true,
    experience: 450,
  },
  {
    name: "Sarah Johnson",
    rating: 4.8,
    reviews: 132,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    verified: true,
    experience: 380,
  },
  {
    name: "Michael Chen",
    rating: 4.9,
    reviews: 198,
    image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    verified: true,
    experience: 520,
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <section className="relative px-6 pt-24 pb-20 md:pt-32 md:pb-28">
        <div className="container max-w-6xl mx-auto text-center">
          <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium rounded-full bg-primary/10 text-primary animate-fade-in">
            Find Trusted Moving Experts
          </span>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text animate-fade-up">
            Moving Made Simple with Local Experts
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto animate-fade-up">
            Connect with verified moving professionals in your destination city and get your move sorted in minutes.
          </p>
          <SearchDestination />
        </div>
      </section>

      {/* Featured Experts Section */}
      <section className="px-6 py-20 bg-white/50">
        <div className="container max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div>
              <span className="text-primary font-medium">Featured Experts</span>
              <h2 className="text-3xl font-bold mt-2">Top-Rated Moving Professionals</h2>
            </div>
            <button className="flex items-center gap-2 text-primary hover:gap-3 transition-all duration-300">
              <span>View all experts</span>
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {experts.map((expert) => (
              <ExpertCard key={expert.name} {...expert} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="px-6 py-20">
        <div className="container max-w-6xl mx-auto text-center">
          <span className="text-primary font-medium">Simple Process</span>
          <h2 className="text-3xl font-bold mt-2 mb-16">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                title: "Enter Your Destination",
                description: "Tell us where you're moving to and when you need help.",
              },
              {
                title: "Browse Experts",
                description: "View profiles, reviews, and ratings of local moving professionals.",
              },
              {
                title: "Book with Confidence",
                description: "Choose your expert and schedule your move worry-free.",
              },
            ].map((step, index) => (
              <div key={index} className="relative animate-fade-up" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary">{index + 1}</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;