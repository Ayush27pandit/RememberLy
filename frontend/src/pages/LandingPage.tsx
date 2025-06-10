import { Feature } from "@/components/LandingPage/Feature";
import { Hero } from "@/components/LandingPage/Hero";
import Navbar from "@/components/LandingPage/Navbar";

function LandingPage() {
  return (
    <div>
      <div className="mb-20 space-y-2">
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
