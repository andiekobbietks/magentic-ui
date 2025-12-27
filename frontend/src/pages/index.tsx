import React from "react";
import { Helmet } from "react-helmet";
import HeroSection from "../components/landing/HeroSection";
import ProblemSection from "../components/landing/ProblemSection";
import SolutionSection from "../components/landing/SolutionSection";
import ResearchSection from "../components/landing/ResearchSection";
import MathSection from "../components/landing/MathSection";
import StackSection from "../components/landing/StackSection";
import FutureSection from "../components/landing/FutureSection";
import "../styles/global.css"; // Ensure global styles are loaded

const LandingPage = () => {
  return (
    <div className="bg-black min-h-screen text-white font-sans selection:bg-green-500 selection:text-black">
      <Helmet>
        <title>FARA-GRC | Sovereign Audit Factory</title>
        <meta name="description" content="Forensic AI-Reasoned Automation for Governance, Risk & Compliance." />
      </Helmet>

      <main>
        <HeroSection />
        <ProblemSection />
        <SolutionSection />
        <ResearchSection />
        <MathSection />
        <StackSection />
        <FutureSection />
      </main>

      {/* Floating Launch Button */}
      <div className="fixed top-6 right-6 z-50">
        <a 
          href="/app" 
          className="px-6 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-sm font-mono hover:bg-white hover:text-black transition-all duration-300 flex items-center gap-2"
        >
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          LAUNCH CONSOLE
        </a>
      </div>
    </div>
  );
};

export default LandingPage;
