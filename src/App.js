import React, { useState } from "react";
import CameraFeed from "./components/CameraFeed";
import MusicPlayer from "./components/MusicPlayer";
import { Box, Typography } from "@mui/material";
import "./App.css";

function App() {
  const [emotion, setEmotion] = useState("");

  const emotionColors = {
    happy: "#FFD700",
    sad: "#1E90FF",
    angry: "#FF4500",
    surprised: "#8A2BE2",
    neutral: "#A9A9A9"
  };

  const borderColor = emotionColors[emotion] || "#ffffff";

  return (
    <Box
      className="animated-bg"
      sx={{
        textAlign: "center",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px"
      }}
    >
      <Typography variant="h3" sx={{ color: "white", fontWeight: "bold", mb: 3 }}>
        🎶 AI Emotion Music Player
      </Typography>

      <div className="glass-panel camera-border" style={{ borderColor }}>
        <CameraFeed onEmotionDetected={setEmotion} />
      </div>

      {emotion && (
        <Typography
          variant="h4"
          className="fade-in"
          sx={{
            mt: 3,
            color: borderColor,
            fontWeight: "bold",
            textShadow: `0 0 10px ${borderColor}`
          }}
        >
          Detected Emotion: {emotion}
        </Typography>
      )}

      <div className="glass-panel">
        <MusicPlayer emotion={emotion} />
      </div>
    </Box>
  );
}

export default App;
