// src/components/AnimatedBackground.jsx
import React from "react";
import { motion } from "framer-motion";

const FloatingTile = ({ className, delay = 0, duration = 20 }) => (
  <motion.div
    className={`absolute rounded-3xl backdrop-blur-3xl bg-white/5 border border-white/10 shadow-2xl ${className}`}
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{
      opacity: [0.4, 0.6, 0.4],
      scale: [1, 1.05, 1],
      x: [0, 30, -20, 0],
      y: [0, -40, 20, 0],
      rotate: [0, 5, -5, 0]
    }}
    transition={{
      duration: duration,
      repeat: Infinity,
      ease: "easeInOut",
      delay: delay,
    }}
  />
);

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#0a0a0a]">
      {/* Deep Atmospheric Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900 opacity-90" />

      {/* Soft Light Accents */}
      <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-blue-500/10 rounded-full blur-[120px] mix-blend-screen" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] bg-purple-500/10 rounded-full blur-[120px] mix-blend-screen" />

      {/* Floating Glass Tiles */}
      <div className="absolute inset-0">
        {/* Large Tile - Top Left */}
        <FloatingTile
          className="w-96 h-96 top-10 -left-20 rotate-12"
          delay={0}
          duration={25}
        />

        {/* Medium Tile - Top Right */}
        <FloatingTile
          className="w-72 h-72 top-20 right-10 -rotate-6"
          delay={2}
          duration={22}
        />

        {/* Large Tile - Bottom Right */}
        <FloatingTile
          className="w-[500px] h-[500px] bottom-[-50px] -right-20 rotate-3"
          delay={1}
          duration={28}
        />

        {/* Small Tile - Center Left */}
        <FloatingTile
          className="w-48 h-48 bottom-40 left-20 rotate-45"
          delay={4}
          duration={18}
        />

        {/* Extra Large Tile - Center/Background */}
        <FloatingTile
          className="w-[800px] h-[800px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20 rotate-12"
          delay={0}
          duration={35}
        />

        {/* NEW TILES */}
        <FloatingTile
          className="w-32 h-32 top-1/4 left-1/3 -rotate-12 opacity-40"
          delay={1.5}
          duration={20}
        />
        <FloatingTile
          className="w-40 h-40 bottom-1/3 right-1/4 rotate-6 opacity-30"
          delay={3}
          duration={24}
        />
        <FloatingTile
          className="w-24 h-24 top-10 left-1/2 rotate-45 opacity-50"
          delay={5}
          duration={15}
        />
        <FloatingTile
          className="w-56 h-56 bottom-10 left-10 -rotate-3 opacity-40"
          delay={2.5}
          duration={26}
        />
        <FloatingTile
          className="w-64 h-64 top-1/3 right-[-50px] rotate-12 opacity-30"
          delay={0.5}
          duration={30}
        />
      </div>

      {/* Noise Texture Overlay for Depth */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />
    </div>
  );
}
