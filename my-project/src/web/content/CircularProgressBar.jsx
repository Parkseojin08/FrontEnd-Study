import { useState, useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function CircularProgressBar({ value, text }) {
  const [color, setColor] = useState("");
  const colors = ["yellowgreen", "skyblue"];
  useEffect(() => {
    console.log(Math.floor(Math.random() * colors.length));
  }, [text]);
  return (
    <div style={{ width: 250, height: 250, margin: 10 }}>
      <CircularProgressbar
        value={value}
        text={`${text}
        ${value}%`}
        strokeWidth={10}
        styles={buildStyles({
          textSize: 12,
          pathColor: colors[Math.floor(Math.random() * colors.length)],
          textColor: "black",
          trailColor: "#e5e7eb",
          strokeLinecap: "round",
        })}
      />
    </div>
  );
}
