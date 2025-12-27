import React from "react";
import { motion } from "framer-motion";
import { Globe, Terminal, FileSearch, ShieldCheck } from "lucide-react";

const AgentCard = ({ icon: Icon, title, description, delay }: any) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.5, delay }}
    className="flex items-start gap-4 p-6 border border-gray-800 rounded-lg bg-gray-900/50 backdrop-blur-sm hover:border-green-500/50 transition-colors"
  >
    <div className="p-3 bg-gray-800 rounded-lg text-green-400">
      <Icon size={24} />
    </div>
    <div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
    </div>
  </motion.div>
);

const SolutionSection: React.FC = () => {
  return (
    <section className="min-h-screen bg-black text-white py-24 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-sm font-mono text-green-500 mb-4 tracking-widest uppercase">
            THE SOLUTION
          </h2>
          <h3 className="text-4xl md:text-6xl font-bold mb-6">
            Forensic AI-Reasoned Automation
          </h3>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            A swarm of specialized agents working in concert.
            <br />
            <span className="text-white">Perception meets Proof.</span>
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AgentCard
            icon={Globe}
            title="WebSurfer Agent"
            description="Navigates complex enterprise UIs like a human expert. Validated with 39.6% accuracy on ScreenSpot Pro benchmarks."
            delay={0.1}
          />
          <AgentCard
            icon={Terminal}
            title="Coder Agent"
            description="Executes Python in a sandboxed Docker environment to process data and verify findings programmatically."
            delay={0.2}
          />
          <AgentCard
            icon={FileSearch}
            title="FileSurfer Agent"
            description="Analyzes documents and logs with forensic precision, extracting evidence for the audit trail."
            delay={0.3}
          />
          <AgentCard
            icon={ShieldCheck}
            title="Action Guard"
            description="The 'Sudo' for AI. Enforces approval policies (Always, Never, Auto-Conservative) to prevent irreversible actions."
            delay={0.4}
          />
        </div>

        <div className="mt-24 border-t border-gray-800 pt-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-white mb-2">39.6%</div>
              <div className="text-xs text-gray-500 font-mono uppercase mb-1">UI Reading Accuracy</div>
              <div className="text-xs text-gray-600">Can understand 40% of what it sees on screens</div>
              <div className="text-xs text-gray-500 mt-1">Better than random guessing</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">113.9s</div>
              <div className="text-xs text-gray-500 font-mono uppercase mb-1">Average Success Time</div>
              <div className="text-xs text-gray-600">Takes ~2 minutes per audit task</div>
              <div className="text-xs text-gray-500 mt-1">When tasks succeed</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">74.6</div>
              <div className="text-xs text-gray-500 font-mono uppercase mb-1">User Satisfaction Score</div>
              <div className="text-xs text-gray-600">Users rate it "Good" on average</div>
              <div className="text-xs text-gray-500 mt-1">Industry standard is 68</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">96.3%</div>
              <div className="text-xs text-gray-500 font-mono uppercase mb-1">Task Completion Rate</div>
              <div className="text-xs text-gray-600">96 out of 100 tasks finish successfully</div>
              <div className="text-xs text-gray-500 mt-1">With human oversight</div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <div className="inline-block bg-gray-900/50 p-4 rounded-lg border border-gray-800">
              <div className="text-sm text-gray-400 mb-2">Research Foundation</div>
              <div className="text-lg font-bold text-white">arXiv:2507.22358</div>
              <div className="text-sm text-gray-500">Mozannar et al. (2025) - Microsoft Research</div>
              <div className="text-xs text-gray-600 mt-2">Peer-reviewed academic paper</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
