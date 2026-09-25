import { Link, useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import { useCurrentUser } from "../auth/UserContext";
import { IoIosLogOut } from "react-icons/io";
import { Meteor } from "meteor/meteor";

export const Header = () => {
  const { user } = useCurrentUser();
  const [confirmingReset, setConfirmingReset] = useState(false);
  const resetTimeoutRef = useRef(null);

  const navigate = useNavigate();

  const handleResetClick = () => {
    if (!confirmingReset) {
      setConfirmingReset(true);
      resetTimeoutRef.current = setTimeout(() => {
        setConfirmingReset(false);
      }, 3000);
      return;
    }

    clearTimeout(resetTimeoutRef.current);
    setConfirmingReset(false);
    Meteor.call("testData.reset", (error) => {
      if (!error) {
        navigate("/");
      }
    });
  };

  const handleLogout = () => {
    Meteor.logout();
  }

  return (
    <header>
      <Link to="/" className="app-logo">
        Meteor Auction
      </Link>
      {user && (
        <>
          <button
            className={`reset-data-button ${confirmingReset ? "confirm-reset-button" : "outline"}`}
            onClick={handleResetClick}
          >
            {confirmingReset ? "Confirm?" : "Reset Test Data"}
          </button>
          <span className="user-info">
            <button className="icon-button" onClick={handleLogout}>
              <span>User: {user.username}</span>
              <IoIosLogOut size="1.5rem" />
            </button>
          </span>
        </>
      )}
    </header>
  );
};
