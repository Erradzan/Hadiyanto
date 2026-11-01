
"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Footer from "@/components/footer";

const systems = [
  { code: "PWR", label: "Electrical Systems", status: "ONLINE" },
  { code: "HVAC", label: "Air Conditioning", status: "ACTIVE" },
  { code: "M&E", label: "Building Operations", status: "MONITORING" },
  { code: "BMS", label: "Building Management", status: "CONNECTED" },
];

function PowerMonitor() {
  const [levels, setLevels] = useState([78, 65, 68]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setLevels([
        72 + Math.random() * 14,
        61 + Math.random() * 8,
        54 + Math.random() * 25,
      ]);
    }, 1600);

    return () => window.clearInterval(interval);
  }, []);

  const metrics = [
    {
      label: "VOLTAGE",
      unit: "V",
      value: (220 + (levels[0] - 78) * 0.12).toFixed(1),
    },
    {
      label: "FREQUENCY",
      unit: "Hz",
      value: (50 + (levels[1] - 65) * 0.012).toFixed(2),
    },
    {
      label: "LOAD",
      unit: "%",
      value: Math.round(levels[2]).toString(),
    },
  ];

  return (
    <div className="absolute left-6 top-[24%] hidden w-48 border border-cyan-300/15 bg-[#0A1520]/80 p-4 backdrop-blur-sm lg:block">
      <div className="mb-4 flex items-center justify-between">
        <span className="text-[9px] tracking-[0.25em] text-cyan-100/60">
          POWER MONITOR
        </span>
        <motion.span
          className="h-1.5 w-1.5 rounded-full bg-cyan-300"
          animate={{
            opacity: [1, 0.3, 1],
            boxShadow: [
              "0 0 2px rgba(103,245,255,0.3)",
              "0 0 10px rgba(103,245,255,1)",
              "0 0 2px rgba(103,245,255,0.3)",
            ],
          }}
          transition={{ duration: 1.2, repeat: Infinity }}
        />
      </div>

      <div className="space-y-4">
        {metrics.map((metric, index) => (
          <div key={metric.label}>
            <div className="mb-1 flex items-center justify-between text-[9px] text-slate-400">
              <span>{metric.label}</span>
              <motion.span
                key={metric.value}
                initial={{ opacity: 0.35, y: 3 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-mono tabular-nums text-cyan-100"
              >
                {metric.value} {metric.unit}
              </motion.span>
            </div>

            <div className="relative h-[5px] overflow-hidden rounded-full bg-slate-700/70">
              <motion.div
                className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-cyan-700 via-cyan-400 to-cyan-200"
                animate={{ width: `${levels[index]}%` }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute inset-y-0 w-7 bg-gradient-to-r from-transparent via-white/60 to-transparent"
                animate={{ left: ["-25%", "110%"] }}
                transition={{
                  duration: 2.1 + index * 0.35,
                  repeat: Infinity,
                  ease: "linear",
                  delay: index * 0.35,
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3">
        <span className="text-[8px] tracking-[0.2em] text-slate-500">
          LIVE DATA
        </span>
        <span className="font-mono text-[8px] text-emerald-300">
          ● CONNECTED
        </span>
      </div>
    </div>
  );
}

function ElectricalBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden bg-[#080D16]">
      {/* Ambient lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_35%,rgba(17,69,91,0.30),transparent_65%)]" />
      <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-cyan-500/[0.07] blur-[120px]" />
      <div className="absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-blue-500/[0.08] blur-[120px]" />

      {/* Subtle engineering grid */}
      <div
        className="absolute inset-0 opacity-[0.10]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(93,190,218,0.25) 1px, transparent 1px), linear-gradient(90deg, rgba(93,190,218,0.25) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage:
            "linear-gradient(to bottom, black, transparent 90%)",
        }}
      />

      {/* Electrical circuit routes */}
      <svg
        className="absolute inset-0 h-full w-full opacity-80"
        viewBox="0 0 1440 1000"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="circuitGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#164B65" />
            <stop offset="50%" stopColor="#35C6D8" />
            <stop offset="100%" stopColor="#164B65" />
          </linearGradient>

          <filter id="electricGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Main power feed from the rotating gear logo */}
        <g
          stroke="url(#circuitGradient)"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.95"
        >
          <path d="M720 175 V205 H500 V220 H330" />
          <path d="M720 175 V205 H930 V250 H1130" />
          <path d="M720 175 V235 H720 V285" />
        </g>

        {/* Energy pulses travelling outward from the logo */}
        {[
          "M720 175 V205 H500 V220 H330",
          "M720 175 V205 H930 V250 H1130",
          "M720 175 V235 H720 V285",
        ].map((path, index) => (
          <motion.path
            key={`main-feed-${index}`}
            d={path}
            stroke="#8AF8FF"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="7 24"
            filter="url(#electricGlow)"
            animate={{ strokeDashoffset: [0, -124] }}
            transition={{
              duration: 1.8 + index * 0.45,
              repeat: Infinity,
              ease: "linear",
              delay: index * 0.25,
            }}
          />
        ))}

        {/* Logo power-source indicator */}
        <g>
          <circle cx="720" cy="175" r="13" fill="#35C6D8" fillOpacity="0.12" />
          <motion.circle
            cx="720"
            cy="175"
            r="6"
            fill="#8AF8FF"
            filter="url(#electricGlow)"
            animate={{ opacity: [0.45, 1, 0.45], r: [5, 8, 5] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
        </g>

        {/* Left circuit network */}
        <g stroke="url(#circuitGradient)" strokeWidth="1.5">
          <path d="M0 220 H110 V300 H210 V390 H330" />
          <path d="M0 440 H80 V390 H160 V500 H280" />
          <path d="M0 700 H130 V620 H230 V560 H330" />
          <path d="M120 0 V100 H200 V180 H290 V260" />
          <path d="M40 820 H170 V740 H270 V680 H360" />
        </g>

        {/* Right circuit network */}
        <g stroke="url(#circuitGradient)" strokeWidth="1.5">
          <path d="M1440 180 H1320 V260 H1240 V340 H1130" />
          <path d="M1440 430 H1350 V500 H1260 V440 H1160" />
          <path d="M1440 700 H1320 V630 H1220 V700 H1120" />
          <path d="M1320 0 V110 H1240 V190 H1150 V250" />
          <path d="M1440 850 H1320 V790 H1200 V740 H1110" />
        </g>

        {/* Moving electric current */}
        {[
          "M0 220 H110 V300 H210 V390 H330",
          "M0 440 H80 V390 H160 V500 H280",
          "M0 700 H130 V620 H230 V560 H330",
          "M120 0 V100 H200 V180 H290 V260",
          "M1440 180 H1320 V260 H1240 V340 H1130",
          "M1440 430 H1350 V500 H1260 V440 H1160",
          "M1440 700 H1320 V630 H1220 V700 H1120",
          "M1320 0 V110 H1240 V190 H1150 V250",
        ].map((path, index) => (
          <motion.path
            key={index}
            d={path}
            stroke="#67F5FF"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray="5 34"
            filter="url(#electricGlow)"
            animate={{ strokeDashoffset: [0, -156] }}
            transition={{
              duration: 2.5 + (index % 3) * 0.8,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}

        {/* Circuit connection nodes */}
        {[
          [110, 220],
          [210, 300],
          [210, 390],
          [160, 440],
          [130, 700],
          [200, 100],
          [1320, 180],
          [1240, 260],
          [1350, 430],
          [1260, 500],
          [1320, 700],
          [1220, 630],
        ].map(([cx, cy], index) => (
          <g key={index}>
            <circle
              cx={cx}
              cy={cy}
              r="5"
              fill="#35C6D8"
              fillOpacity="0.18"
            />
            <motion.circle
              cx={cx}
              cy={cy}
              r="2.5"
              fill="#8AF8FF"
              animate={{ opacity: [0.35, 1, 0.35], scale: [0.8, 1.3, 0.8] }}
              transition={{
                duration: 1.5 + (index % 4) * 0.4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: index * 0.15,
              }}
              style={{ transformOrigin: `${cx}px ${cy}px` }}
            />
          </g>
        ))}
      </svg>

      {/* Animated power monitoring panel */}
      <PowerMonitor />

      <div className="absolute bottom-[16%] right-6 hidden w-48 border border-cyan-300/15 bg-[#0A1520]/70 p-4 backdrop-blur-sm lg:block">
        <p className="mb-3 text-[9px] tracking-[0.25em] text-cyan-100/60">
          FACILITY STATUS
        </p>
        {[
          ["Electrical", "Normal"],
          ["HVAC", "Running"],
          ["Water Pump", "Active"],
        ].map(([name, status]) => (
          <div
            key={name}
            className="flex items-center justify-between border-t border-white/5 py-2"
          >
            <span className="text-[10px] text-slate-400">{name}</span>
            <span className="flex items-center gap-1.5 text-[9px] text-emerald-300">
              <span className="h-1 w-1 rounded-full bg-emerald-300" />
              {status}
            </span>
          </div>
        ))}
      </div>

      {/* Slow scanning beam */}
      <motion.div
        className="absolute left-0 h-px w-full bg-gradient-to-r from-transparent via-cyan-300/20 to-transparent"
        animate={{ top: ["10%", "90%", "10%"] }}
        transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
      />

      {/* Dark overlay for readable content */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#080D16]/25 via-[#080D16]/20 to-[#080D16]/90" />
    </div>
  );
}

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col overflow-hidden bg-[#080D16] text-white">
      <ElectricalBackground />

      {/* Rotating engineering gear logo */}
      <div className="pointer-events-none absolute left-1/2 top-7 z-20 -translate-x-1/2">
        <motion.div
          className="relative flex h-28 w-28 items-center justify-center sm:h-36 sm:w-36 lg:h-40 lg:w-40"
          animate={{ rotate: 360 }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        >
          <motion.div
            className="absolute inset-0 rounded-full bg-cyan-400/15 blur-xl"
            animate={{ opacity: [0.35, 0.8, 0.35], scale: [0.9, 1.12, 0.9] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          <img
            src="/support/logo.webp"
            alt="Hadiyanto Engineering logo"
            className="relative h-full w-full object-contain drop-shadow-[0_0_12px_rgba(53,198,216,0.45)]"
          />
        </motion.div>
      </div>

      <section className="relative z-10 flex min-h-[85vh] flex-1 items-center justify-center px-6 pb-20 pt-40 sm:px-10 sm:pt-48 lg:pt-56">
        <div className="mx-auto w-full max-w-5xl text-center">
          {/* Small engineering label */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-7 inline-flex items-center gap-3 border border-cyan-300/25 bg-cyan-300/[0.05] px-4 py-2"
          >
            <motion.span
              className="h-2 w-2 rounded-full bg-cyan-300"
              animate={{
                boxShadow: [
                  "0 0 0px rgba(103,245,255,0.2)",
                  "0 0 12px rgba(103,245,255,0.9)",
                  "0 0 0px rgba(103,245,255,0.2)",
                ],
              }}
              transition={{ duration: 1.8, repeat: Infinity }}
            />
            <span className="text-[10px] font-medium uppercase tracking-[0.28em] text-cyan-100/80 sm:text-xs">
              Skills · Problem Solving · Communication · Teamwork
            </span>
            <motion.span
              className="h-2 w-2 shrink-0 rounded-full bg-cyan-300"
              animate={{
                boxShadow: [
                  "0 0 0px rgba(103,245,255,0.2)",
                  "0 0 12px rgba(103,245,255,0.9)",
                  "0 0 0px rgba(103,245,255,0.2)",
                ],
              }}
              transition={{ duration: 1.8, repeat: Infinity }}
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mb-4 text-sm uppercase tracking-[0.35em] text-slate-400 sm:text-base"
          >
            SPV Engineering
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="text-4xl font-bold leading-tight tracking-tight sm:text-6xl lg:text-7xl"
          >
            {" "}
            <span className="bg-gradient-to-r from-cyan-200 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
              HADIYANTO
            </span>
          </motion.h1>

          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 112, opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="mx-auto my-7 h-[2px] bg-gradient-to-r from-transparent via-cyan-300 to-transparent"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mx-auto max-w-2xl text-sm leading-7 text-slate-300/80 sm:text-base sm:leading-8"
          >
            More Than 10 Years Experiences in Engineering Field
          </motion.p>

          {/* System cards */}
          <div className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {systems.map((system, index) => (
              <motion.div
                key={system.code}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.55 + index * 0.12 }}
                whileHover={{
                  y: -5,
                  borderColor: "rgba(103,245,255,0.5)",
                }}
                className="group border border-slate-500/20 bg-[#0B1622]/75 p-5 text-left backdrop-blur-md transition-colors"
              >
                <div className="mb-5 flex items-center justify-between">
                  <span className="text-lg font-semibold tracking-widest text-cyan-200">
                    {system.code}
                  </span>
                  <motion.span
                    className="h-2 w-2 rounded-full bg-cyan-300"
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{
                      duration: 1.8,
                      repeat: Infinity,
                      delay: index * 0.3,
                    }}
                  />
                </div>

                <p className="mb-3 text-xs text-slate-300">{system.label}</p>

                <div className="flex items-center gap-2 border-t border-white/5 pt-3">
                  <span className="h-px w-5 bg-cyan-400/70" />
                  <span className="text-[9px] tracking-[0.18em] text-cyan-100/60">
                    {system.status}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CV actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <a
              href="/support/ATS CV Hadiyanto.pdf"
              target="_blank"
              rel="noreferrer"
              className="group inline-flex min-w-48 items-center justify-center gap-3 border border-cyan-300/60 bg-cyan-300 px-6 py-3 text-sm font-semibold text-[#07111A] transition-all duration-300 hover:bg-cyan-200 hover:shadow-[0_0_28px_rgba(53,198,216,0.22)]"
            >
              View ATS CV
              <span className="transition-transform group-hover:translate-x-1">
                ↗
              </span>
            </a>

            <a
              href="/support/CV Hadiyanto.pdf"
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-w-48 items-center justify-center gap-3 border border-slate-400/30 bg-slate-900/50 px-6 py-3 text-sm font-medium text-slate-200 transition-all duration-300 hover:border-cyan-300/50 hover:text-cyan-100"
            >
              View Full CV
              <span>↗</span>
            </a>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3, duration: 1 }}
            className="mt-8 text-[9px] uppercase tracking-[0.3em] text-slate-500"
          >
            Electrical · Mechanical · HVAC · Facility Management
          </motion.p>
        </div>
      </section>

      <div className="relative z-10">
        <Footer />
      </div>

      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }

        body {
          background: #080d16;
        }

        ::selection {
          background: rgba(53, 198, 216, 0.3);
          color: #ffffff;
        }

        @media (prefers-reduced-motion: reduce) {
          html {
            scroll-behavior: auto;
          }
        }
      `}</style>
    </main>
  );
}
