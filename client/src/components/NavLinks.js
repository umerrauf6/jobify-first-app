import { Links } from "../pages/utiles/Links.js";
import { NavLink } from "react-router-dom";

export default function NavLinks({ toggleSidebar }) {
  return (
    <div className="nav-links">
      {Links.map((link) => {
        return (
          <NavLink
            to={link.path}
            key={link.id}
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
            onClick={toggleSidebar}
          >
            <span className="icon">{link.icon} </span>
            {link.text}
          </NavLink>
        );
      })}
    </div>
  );
}
