"use client";
import { useEffect, useRef, useState } from "react";

export default function SmartAudioPlayer({ src }) {
  const audioRef = useRef(null);
  const sectionRef = useRef(null);
  const [hasPlayed, setHasPlayed] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasPlayed) {
          audioRef.current?.play();
          setHasPlayed(true);
        }
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, [hasPlayed]);

  return (
    <div ref={sectionRef}>
      <audio ref={audioRef} src={src} preload="auto" />
    </div>
  );
}
