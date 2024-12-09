import { NavBar } from "@/components/NavBar";

const Index = () => {
  return (
    <div className="min-h-screen bg-powderblue">
      <NavBar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-center mb-8 text-midnight">
          Welcome to Move Mate Connect
        </h1>
        <p className="text-center text-midnight/80 text-lg max-w-2xl mx-auto">
          Connect with expert movers and make your relocation seamless. Our platform helps you find reliable moving services tailored to your needs.
        </p>
      </main>
    </div>
  );
};

export default Index;