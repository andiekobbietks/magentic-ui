import React from "react";
import { motion } from "framer-motion";

const HeroSection: React.FC = () => {
  return (
    <section className="h-screen w-full flex flex-col items-center justify-center bg-black text-white relative overflow-hidden">
      {/* Background Grid Animation */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      </div>

      <div className="z-10 text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-sm md:text-base font-mono text-green-500 mb-4 tracking-widest uppercase">
            FARA-GRC Platform
          </h2>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500"
        >
          The Sovereign
          <br />
          Audit Factory
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto font-light"
        >
          Information Velocity meets Forensic Integrity.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 text-center max-w-2xl mx-auto"
        >
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-3 border border-white/10">
            <div className="text-2xl font-bold text-green-400">39.6%</div>
            <div className="text-xs text-gray-500 font-mono">Accuracy</div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-3 border border-white/10">
            <div className="text-2xl font-bold text-blue-400">113s</div>
            <div className="text-xs text-gray-500 font-mono">Avg Success</div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-3 border border-white/10">
            <div className="text-2xl font-bold text-purple-400">74.6</div>
            <div className="text-xs text-gray-500 font-mono">SUS Score</div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-3 border border-white/10">
            <div className="text-2xl font-bold text-yellow-400">96.3%</div>
            <div className="text-xs text-gray-500 font-mono">Task Success</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-12"
        >
          <div className="animate-bounce">
            <span className="text-gray-500 text-sm font-mono">SCROLL TO DECRYPT</span>
            <div className="w-px h-12 bg-gradient-to-b from-gray-500 to-transparent mx-auto mt-2"></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
