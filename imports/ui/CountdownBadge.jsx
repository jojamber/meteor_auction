import { FaRegHourglass } from "react-icons/fa";

export const CountdownBadge = ({ timeLeft }) => {
  const formatTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="green-batch">
      <FaRegHourglass />
      <span>{formatTime(timeLeft)}</span>
    </div>
  );
};
