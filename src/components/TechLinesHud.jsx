import { useEffect, useState } from 'react';

function TechLinesHud({ className = '' }) {
  const [activeNode, setActiveNode] = useState(3);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveNode((prev) => (prev % 4) + 1);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`tech-hud-divider ${className}`} aria-hidden="true">
      <div className="tech-hud-container">
        {/* Subtle HUD Telemetry Header */}
        <div className="tech-hud-telemetry">
          <div className="tech-hud-tag">
            <span className="tech-hud-dot" />
            <span className="tech-hud-mono">BUS // PROTOCOL_0x8B</span>
          </div>
          <div className="tech-hud-tag tech-hud-tag-right">
            <span className="tech-hud-mono">CORE_NET : ONLINE</span>
            <span className="tech-hud-coord">NODE_0{activeNode}</span>
          </div>
        </div>

        {/* Technical SVG Traces - All in Theme Purple Shades */}
        <svg
          className="tech-hud-svg"
          viewBox="0 0 1200 135"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMinYMid meet"
        >
          <defs>
            {/* Theme Violet Gradient for Primary Traces */}
            <linearGradient id="hudTraceViolet" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.75" />
              <stop offset="60%" stopColor="#a78bfa" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.2" />
            </linearGradient>

            {/* Glowing Purple Pulse Gradient 1 */}
            <linearGradient id="hudPulseGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#7c3aed" stopOpacity="0" />
              <stop offset="60%" stopColor="#a855f7" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#f3e8ff" stopOpacity="1" />
            </linearGradient>

            {/* Glowing Deep Purple / Electric Violet Pulse Gradient 2 */}
            <linearGradient id="hudPulseGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#6d28d9" stopOpacity="0" />
              <stop offset="55%" stopColor="#c084fc" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#faf5ff" stopOpacity="1" />
            </linearGradient>

            {/* Purple Accent Glow */}
            <filter id="hudGlowPurple" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Intense Purple Beacon Glow */}
            <filter id="hudGlowBeacon" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="3.8" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Background Grid Accent Crosshairs */}
          <g className="tech-hud-grid-marks" opacity="0.32">
            <path d="M40 18 h8 M44 14 v8" stroke="rgba(167, 139, 250, 0.4)" strokeWidth="1" />
            <path d="M380 50 h8 M384 46 v8" stroke="rgba(167, 139, 250, 0.3)" strokeWidth="1" />
            <path d="M720 22 h8 M724 18 v8" stroke="rgba(167, 139, 250, 0.25)" strokeWidth="1" />
          </g>

          {/* Faint Background Guide Line */}
          <path
            d="M0 18 L500 18 L560 60 L1080 60"
            stroke="rgba(139, 92, 246, 0.12)"
            strokeWidth="1"
            strokeDasharray="4 6"
          />

          {/* ================= TRACE 1 (Top Bus Trace) ================= */}
          {/* Base Track */}
          <path
            d="M0 32 L380 32 L440 76 L950 76"
            className="tech-hud-path-base"
            stroke="rgba(139, 92, 246, 0.32)"
            strokeWidth="1.4"
          />
          {/* Active Flowing Signal */}
          <path
            d="M0 32 L380 32 L440 76 L950 76"
            className="tech-hud-pulse tech-hud-pulse-1"
            stroke="url(#hudPulseGrad1)"
            strokeWidth="2"
            filter="url(#hudGlowPurple)"
          />
          {/* Terminal Node 1 */}
          <circle cx="950" cy="76" r="5" stroke="#8b5cf6" strokeWidth="1.5" fill="none" opacity="0.85" />
          <circle cx="950" cy="76" r="2.2" fill="#a78bfa" />

          {/* ================= TRACE 2 (Middle Bus Trace) ================= */}
          {/* Base Track */}
          <path
            d="M0 56 L280 56 L345 102 L860 102"
            className="tech-hud-path-base"
            stroke="rgba(139, 92, 246, 0.26)"
            strokeWidth="1.4"
          />
          {/* Active Flowing Signal */}
          <path
            d="M0 56 L280 56 L345 102 L860 102"
            className="tech-hud-pulse tech-hud-pulse-2"
            stroke="url(#hudPulseGrad1)"
            strokeWidth="2"
            filter="url(#hudGlowPurple)"
          />
          {/* Terminal Node 2 */}
          <circle cx="860" cy="102" r="5" stroke="#8b5cf6" strokeWidth="1.5" fill="none" opacity="0.75" />
          <circle cx="860" cy="102" r="2.2" fill="#a78bfa" />

          {/* ================= TRACE 3 (Stepped Trace - All Purple) ================= */}
          {/* Base Track */}
          <path
            d="M0 80 L220 80 L255 110 L440 110 L475 128 L1020 128"
            className="tech-hud-path-base"
            stroke="rgba(139, 92, 246, 0.35)"
            strokeWidth="1.5"
          />
          {/* Active Flowing Signal (Electric Purple) */}
          <path
            d="M0 80 L220 80 L255 110 L440 110 L475 128 L1020 128"
            className="tech-hud-pulse tech-hud-pulse-3"
            stroke="url(#hudPulseGrad2)"
            strokeWidth="2.2"
            filter="url(#hudGlowPurple)"
          />
          {/* Terminal Node 3 (Featured Glowing Purple Node) */}
          <g className="tech-hud-featured-node" transform="translate(1020, 128)">
            {/* Outer Pulsing Purple Ring */}
            <circle cx="0" cy="0" r="8" className="tech-hud-beacon-ring" stroke="#c084fc" strokeWidth="1" opacity="0.45" />
            {/* Solid Ring */}
            <circle cx="0" cy="0" r="5.5" stroke="#a855f7" strokeWidth="1.5" fill="#0b0d0f" />
            {/* Bright Purple Center Node */}
            <circle cx="0" cy="0" r="2.6" fill="#e9d5ff" filter="url(#hudGlowBeacon)" />
          </g>

          {/* ================= TRACE 4 (Secondary Branching Trace) ================= */}
          <path
            d="M380 32 L412 12 L760 12"
            stroke="rgba(139, 92, 246, 0.22)"
            strokeWidth="1.2"
            strokeDasharray="2 3"
          />
          <circle cx="760" cy="12" r="3.2" stroke="rgba(167, 139, 250, 0.5)" strokeWidth="1" fill="none" />

          {/* Micro HUD Labels on Traces */}
          <text x="490" y="70" fill="rgba(167, 139, 250, 0.45)" fontSize="8.5" fontFamily="DM Mono, monospace" letterSpacing="0.08em">
            01 // BUS_X
          </text>
          <text x="580" y="96" fill="rgba(167, 139, 250, 0.45)" fontSize="8.5" fontFamily="DM Mono, monospace" letterSpacing="0.08em">
            02 // DATA_STREAM
          </text>
          <text x="660" y="122" fill="rgba(192, 132, 252, 0.55)" fontSize="8.5" fontFamily="DM Mono, monospace" letterSpacing="0.08em">
            03 // SYNC_ACTIVE
          </text>
        </svg>
      </div>
    </div>
  );
}

export default TechLinesHud;
