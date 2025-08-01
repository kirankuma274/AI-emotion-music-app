import React, { useRef, useEffect, useState } from "react";
import * as faceapi from "face-api.js";

export default function CameraFeed({ onEmotionDetected }) {
  const videoRef = useRef();
  const [error, setError] = useState("");

  useEffect(() => {
    const loadModels = async () => {
      try {
        await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
        await faceapi.nets.faceExpressionNet.loadFromUri("/models");
        startVideo();
      } catch (err) {
        console.error("Model loading failed:", err);
        setError("⚠️ Face detection models are missing in /public/models");
      }
    };
    loadModels();
  }, []);

  const startVideo = () => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
      })
      .catch(() => setError("⚠️ Cannot access webcam. Please allow camera access."));
  };

  const handlePlay = async () => {
    setInterval(async () => {
      try {
        const detections = await faceapi
          .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
          .withFaceExpressions();

        if (detections.length > 0) {
          const expressions = detections[0].expressions;
          const mainEmotion = Object.keys(expressions).reduce((a, b) =>
            expressions[a] > expressions[b] ? a : b
          );
          onEmotionDetected(mainEmotion);
        }
      } catch (err) {
        console.error("Detection error:", err);
      }
    }, 2000);
  };

  return (
    <div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <video
        ref={videoRef}
        autoPlay
        muted
        width="400"
        height="300"
        onPlay={handlePlay}
        style={{ border: "2px solid black" }}
      />
    </div>
  );
}
