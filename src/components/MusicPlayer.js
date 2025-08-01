import React, { useEffect, useRef } from "react";

export default function MusicPlayer({ emotion }) {
  const audioRef = useRef();

  // Map emotion to file
  const emotionMusicMap = {
    happy: "/music/happy.mp3",
    sad: "/music/sad.mp3",
    neutral: "/music/neutral.mp3",
    angry: "/music/angry.mp3",
    surprised: "/music/surprised.mp3"
  };

  useEffect(() => {
    if (emotion && emotionMusicMap[emotion]) {
      audioRef.current.src = emotionMusicMap[emotion];
      audioRef.current.play().catch(err => {
        console.log("Autoplay blocked, click to play:", err);
      });
    }
  }, [emotion]);

  return (
    <div style={{ marginTop: "20px" }}>
      <h3>🎵 Now Playing: {emotion || "None"}</h3>
      <audio ref={audioRef} controls />
    </div>
  );
}
