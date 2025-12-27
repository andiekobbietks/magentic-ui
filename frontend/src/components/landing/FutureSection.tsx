import React from "react";
import { motion } from "framer-motion";

const FutureSection: React.FC = () => {
  return (
    <section className="h-screen bg-black text-white flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-green-900/20 via-black to-black"></div>
      
      <div className="z-10 text-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-6xl md:text-9xl font-bold tracking-tighter mb-8 text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-800">
            2026
          </h2>
        </motion.div>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl text-gray-400 font-light"
        >
          Coming Soon in 2026.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-12"
        >
          <button className="px-8 py-3 border border-gray-700 rounded-full text-sm font-mono hover:bg-white hover:text-black transition-colors duration-300">
            JOIN THE WAITLIST
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default FutureSection;
