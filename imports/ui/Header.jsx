import { Link } from "react-router-dom";
import { useCurrentUser } from "./UserContext";
import { IoIosLogOut } from "react-icons/io";
import { Meteor } from "meteor/meteor";

export const Header = () => {
  const user = useCurrentUser();

  const handleLogout = () => {
    Meteor.logout();
  }

  return (
    <header>
      <Link to="/" className="app-logo">
        Meteor Auction
      </Link>
      {user && (
        <span className="user-info">
          <button className="icon-button" onClick={handleLogout}>
            <span>User: {user.username}</span>
            <IoIosLogOut size="1.5rem" />
          </button>
        </span>
      )}
    </header>
  );
};
