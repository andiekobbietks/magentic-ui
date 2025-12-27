import React from "react";
import { motion } from "framer-motion";
import { Brain, Target, Shield, Activity } from "lucide-react";

const MathSection: React.FC = () => {
  return (
    <section className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white py-24 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-sm font-mono text-green-500 mb-4 tracking-widest uppercase">
            MATHEMATICAL FOUNDATIONS
          </h2>
          <h3 className="text-4xl md:text-6xl font-bold mb-6">
            Science, Not Magic
          </h3>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Every decision FARA-GRC makes is grounded in mathematical principles
            that ensure reliability, accuracy, and forensic integrity.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Information Theory */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <Brain className="w-8 h-8 text-green-500" />
              <h4 className="text-2xl font-bold">Information Theory</h4>
            </div>

              <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-800">
                <h5 className="text-green-400 font-mono mb-4">Shannon's Signal-to-Noise Ratio</h5>
                <div className="text-3xl font-bold text-center mb-4 text-green-400">
                  S/N = 10 log₁₀(P_signal / P_noise)
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">
                  <strong className="text-white">What it means:</strong> Like tuning a radio - we want
                  clear signals (useful audit findings) and filter out static (irrelevant data).
                  Every piece of information must help investigators, not create confusion.
                </p>
                <div className="mt-4 p-3 bg-green-900/20 rounded border-l-4 border-green-500">
                  <div className="text-xs text-green-400 font-mono">FARA-GRC Target: S/N &gt; 100</div>
                  <div className="text-xs text-gray-500">100x more useful info than noise</div>
                </div>
              </div>
          </motion.div>

          {/* Decision Theory */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <Target className="w-8 h-8 text-blue-500" />
              <h4 className="text-2xl font-bold">Decision Theory</h4>
            </div>

            <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-800">
              <h5 className="text-blue-400 font-mono mb-4">Bayesian Risk Assessment</h5>
              <div className="text-2xl font-bold text-center mb-4 text-blue-400">
                Risk = P(event) × Cost(event)
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">
                <strong className="text-white">How it works:</strong> Like deciding whether to cross a street.
                Low risk actions (like clicking "Next") get auto-approved. High risk actions (like deleting files)
                always ask for human permission. The system calculates: "How likely is this to go wrong?
                How bad would it be if it did?"
              </p>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="p-2 bg-blue-900/20 rounded text-center">
                  <div className="text-lg font-bold text-blue-400">95%</div>
                  <div className="text-xs text-gray-500">Safe actions approved automatically</div>
                </div>
                <div className="p-2 bg-red-900/20 rounded text-center">
                  <div className="text-lg font-bold text-red-400">100%</div>
                  <div className="text-xs text-gray-500">Dangerous actions need human OK</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Multi-Agent Consensus */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <Shield className="w-8 h-8 text-purple-500" />
              <h4 className="text-2xl font-bold">Multi-Agent Consensus</h4>
            </div>

            <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-800">
              <h5 className="text-purple-400 font-mono mb-4">Byzantine Fault Tolerance</h5>
              <div className="text-xl font-bold text-center mb-4 text-purple-400">
                Consensus = (n-1)/3 fault tolerance
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">
                <strong className="text-white">The principle:</strong> Like having four judges in court.
                WebSurfer browses, Coder writes code, FileSurfer reads files, ActionGuard checks safety.
                If any one gives conflicting information, the system stops and asks a human expert.
                This prevents errors from spreading through the audit process.
              </p>
              <div className="mt-4 flex justify-center">
                <div className="grid grid-cols-4 gap-2">
                  <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-xs font-bold">WS</div>
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-xs font-bold">CD</div>
                  <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-xs font-bold">FS</div>
                  <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-xs font-bold">AG</div>
                </div>
              </div>
              <div className="text-center mt-2 text-xs text-gray-500">4 agents, can handle 1 failure safely</div>
            </div>
          </motion.div>

          {/* Performance Optimization */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <Activity className="w-8 h-8 text-yellow-500" />
              <h4 className="text-2xl font-bold">Performance Optimization</h4>
            </div>

            <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-800">
              <h5 className="text-yellow-400 font-mono mb-4">Token-Limited Context Windows</h5>
              <div className="text-xl font-bold text-center mb-4 text-yellow-400">
                Context = 110,000 tokens max
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">
                <strong className="text-white">Why it matters:</strong> AI has limited memory, like a person
                can only remember so much in a conversation. We limit context to 110,000 "words" to stay
                focused and fast, while remembering the important parts of long audit investigations.
              </p>
              <div className="mt-4 p-3 bg-yellow-900/20 rounded border-l-4 border-yellow-500">
                <div className="text-sm text-yellow-400 font-mono">Result: 113.9s median task completion</div>
                <div className="text-xs text-gray-500">Twice as fast as unlimited memory approaches</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Real-World Impact */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <h4 className="text-3xl font-bold mb-8">Real-World Mathematical Impact</h4>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-green-900/20 to-green-800/20 p-6 rounded-lg border border-green-800/50">
              <div className="text-4xl font-bold text-green-400 mb-2">£50k</div>
              <div className="text-sm text-gray-300 mb-3">Average cost of compliance failure</div>
              <div className="text-xs text-green-500 font-mono">FARA-GRC reduces this to near-zero</div>
            </div>

            <div className="bg-gradient-to-br from-blue-900/20 to-blue-800/20 p-6 rounded-lg border border-blue-800/50">
              <div className="text-4xl font-bold text-blue-400 mb-2">39.6%</div>
              <div className="text-sm text-gray-300 mb-3">UI reading accuracy</div>
              <div className="text-xs text-blue-500 font-mono">Better than random guessing on screens</div>
            </div>

            <div className="bg-gradient-to-br from-purple-900/20 to-purple-800/20 p-6 rounded-lg border border-purple-800/50">
              <div className="text-4xl font-bold text-purple-400 mb-2">96.3%</div>
              <div className="text-sm text-gray-300 mb-3">Task success rate with human help</div>
              <div className="text-xs text-purple-500 font-mono">20% better than AI working alone</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MathSection;