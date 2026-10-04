import { useMemo } from 'react';

// Polar coordinate conversion: 0° is 12 o'clock, 90° is 3 o'clock, 180° is 6 o'clock, 270° is 9 o'clock
function polarToCartesian(r, deg) {
  const rad = ((deg - 90) * Math.PI) / 180;
  return {
    x: Number((r * Math.cos(rad)).toFixed(2)),
    y: Number((r * Math.sin(rad)).toFixed(2)),
  };
}

function makeArc(r, startDeg, endDeg) {
  const p1 = polarToCartesian(r, startDeg);
  const p2 = polarToCartesian(r, endDeg);
  const diff = (endDeg - startDeg + 360) % 360;
  const largeArc = diff > 180 ? 1 : 0;
  return `M ${p1.x} ${p1.y} A ${r} ${r} 0 ${largeArc} 1 ${p2.x} ${p2.y}`;
}

function makeSector(rIn, rOut, startDeg, endDeg) {
  const p1 = polarToCartesian(rOut, startDeg);
  const p2 = polarToCartesian(rOut, endDeg);
  const p3 = polarToCartesian(rIn, endDeg);
  const p4 = polarToCartesian(rIn, startDeg);
  const diff = (endDeg - startDeg + 360) % 360;
  const largeArc = diff > 180 ? 1 : 0;
  return `M ${p1.x} ${p1.y} A ${rOut} ${rOut} 0 ${largeArc} 1 ${p2.x} ${p2.y} L ${p3.x} ${p3.y} A ${rIn} ${rIn} 0 ${largeArc} 0 ${p4.x} ${p4.y} Z`;
}

function makeTicks(r1, r2, stepDeg, startDeg, endDeg) {
  const ticks = [];
  for (let d = startDeg; d <= endDeg; d += stepDeg) {
    const p1 = polarToCartesian(r1, d);
    const p2 = polarToCartesian(r2, d);
    ticks.push({ x1: p1.x, y1: p1.y, x2: p2.x, y2: p2.y, deg: d });
  }
  return ticks;
}

function CircularHud({ className = '' }) {
  // Pre-generate static geometry
  const leftCaliperTicks = useMemo(() => makeTicks(138, 146, 5, 215, 325), []);
  const rightCaliperTicks = useMemo(() => makeTicks(138, 146, 5, 35, 145), []);

  // Dense radial ticks with small gaps for cardinal chevrons (0°, 90°, 180°, 270°)
  const denseTicks = useMemo(() => {
    const ranges = [
      [14, 76],
      [104, 166],
      [194, 256],
      [284, 346],
    ];
    const result = [];
    ranges.forEach(([start, end]) => {
      for (let d = start; d <= end; d += 2.5) {
        const isMajor = Math.round(d * 10) % 100 === 0;
        const rOuter = isMajor ? 116 : 113;
        const p1 = polarToCartesian(105, d);
        const p2 = polarToCartesian(rOuter, d);
        result.push({ x1: p1.x, y1: p1.y, x2: p2.x, y2: p2.y, isMajor });
      }
    });
    return result;
  }, []);

  // Chunky sectors
  const sector1 = useMemo(() => makeSector(68, 94, 18, 76), []);
  const sector2 = useMemo(() => makeSector(68, 94, 104, 164), []);
  const sector3 = useMemo(() => makeSector(68, 94, 226, 314), []);

  // Inner orbital trails
  const orbitArc1 = useMemo(() => makeArc(48, 0, 130), []);
  const orbitDot1 = useMemo(() => polarToCartesian(48, 130), []);

  const orbitArc2 = useMemo(() => makeArc(38, 40, 200), []);
  const orbitDot2 = useMemo(() => polarToCartesian(38, 200), []);

  const orbitArc3 = useMemo(() => makeArc(28, 100, 210), []);
  const orbitDot3 = useMemo(() => polarToCartesian(28, 210), []);

  return (
    <div className={`circular-hud-wrapper ${className}`} aria-hidden="true">
      <div className="circular-hud-inner">
        {/* Subtle ambient telemetry header */}
        <div className="circular-hud-readout">
          <span className="circular-hud-tag">RADIAL // GYRO_HUD</span>
          <span className="circular-hud-val">CAL [0.41 : 0.06]</span>
        </div>

        <svg
          className="circular-hud-svg"
          viewBox="-170 -170 340 340"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Glow Filters */}
            <filter id="circPurpleGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="circBrightDot" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* ================= 1. OUTER CALIPER BRACKETS & NUMBERS ================= */}
          <g className="circ-calipers">
            {/* Left Caliper Arc */}
            <path
              d={makeArc(138, 215, 325)}
              stroke="rgba(167, 139, 250, 0.75)"
              strokeWidth="1.4"
            />
            {/* Left Outward Ticks */}
            {leftCaliperTicks.map((t, i) => (
              <line
                key={`lt-${i}`}
                x1={t.x1}
                y1={t.y1}
                x2={t.x2}
                y2={t.y2}
                stroke="rgba(167, 139, 250, 0.75)"
                strokeWidth="1.2"
              />
            ))}
            {/* Left End Terminal Notches */}
            <line
              x1="-80.5"
              y1="-113"
              x2="-88"
              y2="-120"
              stroke="#c084fc"
              strokeWidth="1.4"
            />
            <line
              x1="-80.5"
              y1="113"
              x2="-88"
              y2="120"
              stroke="#c084fc"
              strokeWidth="1.4"
            />
            {/* Left Decimal Label: 0.41 */}
            <text
              x="-122"
              y="14"
              textAnchor="middle"
              fill="#e9d5ff"
              fontSize="9"
              fontFamily="DM Mono, monospace"
              letterSpacing="0.05em"
              opacity="0.9"
            >
              0.41
            </text>

            {/* Right Caliper Arc */}
            <path
              d={makeArc(138, 35, 145)}
              stroke="rgba(167, 139, 250, 0.75)"
              strokeWidth="1.4"
            />
            {/* Right Outward Ticks */}
            {rightCaliperTicks.map((t, i) => (
              <line
                key={`rt-${i}`}
                x1={t.x1}
                y1={t.y1}
                x2={t.x2}
                y2={t.y2}
                stroke="rgba(167, 139, 250, 0.75)"
                strokeWidth="1.2"
              />
            ))}
            {/* Right End Terminal Notches */}
            <line
              x1="80.5"
              y1="-113"
              x2="88"
              y2="-120"
              stroke="#c084fc"
              strokeWidth="1.4"
            />
            <line
              x1="80.5"
              y1="113"
              x2="88"
              y2="120"
              stroke="#c084fc"
              strokeWidth="1.4"
            />
            {/* Right Decimal Label: 0.06 */}
            <text
              x="122"
              y="-4"
              textAnchor="middle"
              fill="#e9d5ff"
              fontSize="9"
              fontFamily="DM Mono, monospace"
              letterSpacing="0.05em"
              opacity="0.9"
            >
              0.06
            </text>
          </g>

          {/* ================= 2. DENSE RADIAL TICK RING & BOUNDARY ================= */}
          <g className="circ-tick-ring">
            {/* Outer boundary circle for ticks */}
            <circle
              cx="0"
              cy="0"
              r="117"
              stroke="rgba(139, 92, 246, 0.3)"
              strokeWidth="0.8"
            />
            {/* Fine Radial Ticks */}
            {denseTicks.map((t, i) => (
              <line
                key={`dt-${i}`}
                x1={t.x1}
                y1={t.y1}
                x2={t.x2}
                y2={t.y2}
                stroke={t.isMajor ? '#c084fc' : 'rgba(167, 139, 250, 0.65)'}
                strokeWidth={t.isMajor ? '1' : '0.7'}
              />
            ))}
          </g>

          {/* ================= 3. SOLID CIRCLE & 4 CARDINAL CHEVRONS ================= */}
          <g className="circ-cardinal-group">
            {/* Main Solid Circle */}
            <circle
              cx="0"
              cy="0"
              r="104"
              stroke="#e9d5ff"
              strokeWidth="1.6"
              filter="url(#circPurpleGlow)"
            />

            {/* Top Chevron (Points Down into center) */}
            <polygon
              points="0,-92 -8,-104 8,-104"
              fill="#e9d5ff"
              stroke="#c084fc"
              strokeWidth="0.8"
            />

            {/* Bottom Chevron (Points Up into center) */}
            <polygon
              points="0,92 -8,104 8,104"
              fill="#e9d5ff"
              stroke="#c084fc"
              strokeWidth="0.8"
            />

            {/* Right Chevron (Points Left into center) */}
            <polygon
              points="92,0 104,-8 104,8"
              fill="#e9d5ff"
              stroke="#c084fc"
              strokeWidth="0.8"
            />

            {/* Left Chevron (Points Right into center) */}
            <polygon
              points="-92,0 -104,-8 -104,8"
              fill="#e9d5ff"
              stroke="#c084fc"
              strokeWidth="0.8"
            />
          </g>

          {/* ================= 4. 3 CHUNKY SECTOR BLOCKS WITH CENTERLINE ================= */}
          <g className="circ-chunky-spin">
            {/* Sector 1 (Top-Right) */}
            <path
              d={sector1}
              fill="rgba(139, 92, 246, 0.28)"
              stroke="#a78bfa"
              strokeWidth="1.2"
            />
            {/* Sector 2 (Bottom-Right) */}
            <path
              d={sector2}
              fill="rgba(139, 92, 246, 0.28)"
              stroke="#a78bfa"
              strokeWidth="1.2"
            />
            {/* Sector 3 (Left) */}
            <path
              d={sector3}
              fill="rgba(139, 92, 246, 0.28)"
              stroke="#a78bfa"
              strokeWidth="1.2"
            />

            {/* Continuous Centerline passing through the sectors */}
            <circle
              cx="0"
              cy="0"
              r="81"
              stroke="rgba(233, 213, 255, 0.55)"
              strokeWidth="1.1"
              strokeDasharray="none"
            />
          </g>

          {/* ================= 5. INNER CONCENTRIC ORBITAL TRAILS & GLOWING DOTS ================= */}
          {/* Guide Circle */}
          <circle
            cx="0"
            cy="0"
            r="56"
            stroke="rgba(167, 139, 250, 0.25)"
            strokeWidth="0.8"
          />

          {/* Orbit Track 1 (Outer Inner Orbit - CCW) */}
          <g className="circ-orbit-1">
            <path
              d={orbitArc1}
              stroke="rgba(233, 213, 255, 0.85)"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
            <circle
              cx={orbitDot1.x}
              cy={orbitDot1.y}
              r="2.5"
              fill="#ffffff"
              filter="url(#circBrightDot)"
            />
          </g>

          {/* Orbit Track 2 (Middle Inner Orbit - CW) */}
          <g className="circ-orbit-2">
            <path
              d={orbitArc2}
              stroke="rgba(192, 132, 252, 0.85)"
              strokeWidth="1.1"
              strokeLinecap="round"
            />
            <circle
              cx={orbitDot2.x}
              cy={orbitDot2.y}
              r="2.2"
              fill="#ffffff"
              filter="url(#circBrightDot)"
            />
          </g>

          {/* Orbit Track 3 (Innermost Orbit - CCW) */}
          <g className="circ-orbit-3">
            <path
              d={orbitArc3}
              stroke="rgba(167, 139, 250, 0.8)"
              strokeWidth="1"
              strokeLinecap="round"
            />
            <circle
              cx={orbitDot3.x}
              cy={orbitDot3.y}
              r="1.8"
              fill="#e9d5ff"
            />
          </g>
        </svg>
      </div>
    </div>
  );
}

export default CircularHud;
