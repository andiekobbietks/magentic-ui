import React from "react";
import { motion } from "framer-motion";
import { Server, Database, Cpu, Network, Lock, Zap } from "lucide-react";

const StackSection: React.FC = () => {
  return (
    <section className="min-h-screen bg-gray-900 text-white py-24 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-sm font-mono text-blue-500 mb-4 tracking-widest uppercase">
            TECHNOLOGY STACK
          </h2>
          <h3 className="text-4xl md:text-6xl font-bold mb-6">
            Every Component Chosen for a Reason
          </h3>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            FARA-GRC's architecture is not accidental. Each technology was selected
            based on mathematical performance, security requirements, and forensic integrity.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {/* AutoGen Framework */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-black/50 p-6 rounded-lg border border-gray-800 hover:border-blue-500/50 transition-colors"
          >
            <div className="flex items-center gap-3 mb-4">
              <Network className="w-8 h-8 text-blue-500" />
              <h4 className="text-xl font-bold">AutoGen Framework</h4>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Microsoft's production-grade multi-agent orchestration system.
            </p>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-500">Why chosen:</span>
                <span className="text-blue-400">Battle-tested in production</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Performance:</span>
                <span className="text-blue-400">96.3% task success rate</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Security:</span>
                <span className="text-blue-400">Enterprise-grade isolation</span>
              </div>
            </div>
          </motion.div>

          {/* Playwright + Docker */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-black/50 p-6 rounded-lg border border-gray-800 hover:border-green-500/50 transition-colors"
          >
            <div className="flex items-center gap-3 mb-4">
              <Server className="w-8 h-8 text-green-500" />
              <h4 className="text-xl font-bold">Playwright + Docker</h4>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Headless browser automation with complete sandbox isolation.
            </p>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-500">Accuracy:</span>
                <span className="text-green-400">39.6% benchmark score</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Forensics:</span>
                <span className="text-green-400">Cryptographic isolation</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Compatibility:</span>
                <span className="text-green-400">All major browsers</span>
              </div>
            </div>
          </motion.div>

          {/* ChromaDB Vector Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-black/50 p-6 rounded-lg border border-gray-800 hover:border-purple-500/50 transition-colors"
          >
            <div className="flex items-center gap-3 mb-4">
              <Database className="w-8 h-8 text-purple-500" />
              <h4 className="text-xl font-bold">ChromaDB</h4>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Vector database for semantic search and plan retrieval.
            </p>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-500">Search quality:</span>
                <span className="text-purple-400">Semantic understanding</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Performance:</span>
                <span className="text-purple-400">Sub-second retrieval</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Scalability:</span>
                <span className="text-purple-400">Millions of vectors</span>
              </div>
            </div>
          </motion.div>

          {/* FastAPI + WebSocket */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-black/50 p-6 rounded-lg border border-gray-800 hover:border-yellow-500/50 transition-colors"
          >
            <div className="flex items-center gap-3 mb-4">
              <Zap className="w-8 h-8 text-yellow-500" />
              <h4 className="text-xl font-bold">FastAPI + WebSocket</h4>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Real-time communication for human-in-the-loop oversight.
            </p>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-500">Latency:</span>
                <span className="text-yellow-400">&lt;100ms response time</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Concurrency:</span>
                <span className="text-yellow-400">10,000+ concurrent users</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Real-time:</span>
                <span className="text-yellow-400">WebSocket streaming</span>
              </div>
            </div>
          </motion.div>

          {/* LXD Containers */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-black/50 p-6 rounded-lg border border-gray-800 hover:border-red-500/50 transition-colors"
          >
            <div className="flex items-center gap-3 mb-4">
              <Lock className="w-8 h-8 text-red-500" />
              <h4 className="text-xl font-bold">LXD Containers</h4>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              System-level virtualization for forensic-grade isolation.
            </p>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-500">Isolation:</span>
                <span className="text-red-400">Kernel-level separation</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Forensics:</span>
                <span className="text-red-400">Immutable audit trails</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Performance:</span>
                <span className="text-red-400">Near-native speed</span>
              </div>
            </div>
          </motion.div>

          {/* OmniParser Vision */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-black/50 p-6 rounded-lg border border-gray-800 hover:border-cyan-500/50 transition-colors"
          >
            <div className="flex items-center gap-3 mb-4">
              <Cpu className="w-8 h-8 text-cyan-500" />
              <h4 className="text-xl font-bold">OmniParser Vision</h4>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Microsoft's vision-based UI understanding model.
            </p>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-500">Accuracy:</span>
                <span className="text-cyan-400">39.6% on ScreenSpot Pro</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Training:</span>
                <span className="text-cyan-400">Millions of UI samples</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Output:</span>
                <span className="text-cyan-400">Structured JSON elements</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Architecture Diagram */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="bg-black/30 p-8 rounded-lg border border-gray-700"
        >
          <h4 className="text-2xl font-bold text-center mb-8">System Architecture</h4>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-lg font-bold text-blue-400 mb-2">Frontend Layer</div>
              <div className="text-sm text-gray-400">React + TypeScript + WebSocket</div>
              <div className="text-xs text-gray-500 mt-2">Real-time human oversight</div>
            </div>

            <div>
              <div className="text-lg font-bold text-green-400 mb-2">Orchestration Layer</div>
              <div className="text-sm text-gray-400">AutoGen + FastAPI + PostgreSQL</div>
              <div className="text-xs text-gray-500 mt-2">Multi-agent coordination</div>
            </div>

            <div>
              <div className="text-lg font-bold text-purple-400 mb-2">Execution Layer</div>
              <div className="text-sm text-gray-400">Docker + Playwright + LXD</div>
              <div className="text-xs text-gray-500 mt-2">Sandboxed automation</div>
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-gray-400">Human Interface</span>
              </div>
              <div className="w-8 h-px bg-gray-600"></div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-gray-400">AI Orchestration</span>
              </div>
              <div className="w-8 h-px bg-gray-600"></div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                <span className="text-gray-400">System Automation</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Performance Metrics */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          <div className="text-center">
            <div className="text-3xl font-bold text-green-400 mb-2">&lt;100ms</div>
            <div className="text-xs text-gray-500 font-mono uppercase">API Response Time</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-400">99.9%</div>
            <div className="text-xs text-gray-500 font-mono uppercase">Uptime SLA</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-400">256-bit</div>
            <div className="text-xs text-gray-500 font-mono uppercase">Encryption</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-400">SOC 2</div>
            <div className="text-xs text-gray-500 font-mono uppercase">Compliance Ready</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default StackSection;