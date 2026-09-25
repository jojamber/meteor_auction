import { useState, useEffect } from "react";
import { FaRegHourglass } from "react-icons/fa";

export const CountdownBadge = ({ endTime }) => {
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const timeLeft = Math.max(0, endTime - now); // avoid negative time after auction ends

  return (
    <div className="green-batch">
      <FaRegHourglass />
      <span>{formatTime(timeLeft)}</span>
    </div>
  );
};
