import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const ProblemSection: React.FC = () => {
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0, 1, 0]);
  const y = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [50, 0, -50]);

  return (
    <section ref={ref} className="h-[150vh] bg-black text-white relative flex items-center justify-center">
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center px-4">
        <motion.div style={{ opacity, y }} className="max-w-4xl text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-8 text-red-500">
            Compliance is Broken.
          </h2>
          <p className="text-2xl md:text-4xl text-gray-300 font-light leading-relaxed">
            Snapshots are obsolete the moment they are taken.
            <br />
            <span className="text-gray-500">
              Human error costs £20k-£50k per incident.
            </span>
          </p>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <div className="border-l border-red-900 pl-4">
              <h3 className="text-red-500 font-mono mb-2">MANUAL AUDITS</h3>
              <p className="text-gray-400 text-sm">Slow, expensive, and prone to fatigue-induced errors.</p>
            </div>
            <div className="border-l border-red-900 pl-4">
              <h3 className="text-red-500 font-mono mb-2">STATIC SNAPSHOTS</h3>
              <p className="text-gray-400 text-sm">Fail to capture the dynamic state of modern cloud environments.</p>
            </div>
            <div className="border-l border-red-900 pl-4">
              <h3 className="text-red-500 font-mono mb-2">BLACK BOX AI</h3>
              <p className="text-gray-400 text-sm">Unverifiable reasoning chains that auditors cannot trust.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProblemSection;
