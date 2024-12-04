import { NavBar } from "@/components/NavBar";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-center mb-8">
          Welcome to Move Mate Connect
        </h1>
        <p className="text-center text-muted-foreground">
          Connect with expert movers and make your relocation seamless.
        </p>
      </main>
    </div>
  );
};

export default Index;