import { Feature } from "@/components/LandingPage/Feature";
import { Hero } from "@/components/LandingPage/Hero";
import Navbar from "@/components/LandingPage/Navbar";

function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between bg-background px-4 md:px-0">
      <div className="mb-20 space-y-2 ">
        <Navbar />
      </div>
      <div>
        <Hero />
      </div>
      <div>
        <Feature />
      </div>
    </div>
  );
}

export default LandingPage;
