import { NavBar } from "@/components/NavBar";
import { SearchDestination } from "@/components/SearchDestination";
import { ExpertCard } from "@/components/ExpertCard";

const Index = () => {
  return (
    <div className="min-h-screen bg-powderblue">
      <NavBar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-center mb-8 text-midnight">
          Welcome to Move Mate Connect
        </h1>
        <p className="text-center text-midnight/80 text-lg max-w-2xl mx-auto mb-12">
          Connect with expert movers and make your relocation seamless. Our platform helps you find reliable moving services tailored to your needs.
        </p>
        
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
      </main>
    </div>
  );
};

export default Index;