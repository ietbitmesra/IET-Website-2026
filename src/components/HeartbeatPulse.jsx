import { useEffect, useRef } from 'react';

function HeartbeatPulse({ className = '' }) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <div className={`about-pulse-divider ${className}`} aria-hidden="true">
      <div className="about-pulse-track">
        <video
          ref={videoRef}
          className="about-pulse-video"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/heartbeat-pulse-clean.webm" type="video/webm" />
          <source src="/heartbeat-pulse-clean.mp4" type="video/mp4" />
        </video>
      </div>
    </div>
  );
}

export default HeartbeatPulse;
