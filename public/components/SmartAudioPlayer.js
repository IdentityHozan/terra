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
          setHasPlayed(true); // only plays once
        }
      },
      {
        threshold: 0.5, // section must be at least 50% visible
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [hasPlayed]);

  return (
    <div ref={sectionRef}>
      <audio ref={audioRef} src={src} preload="auto" />
    </div>
  );
}
