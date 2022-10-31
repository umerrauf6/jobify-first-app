import Wrapper from "../assets/wrappers/Navbar.js";
import { FaAlignLeft, FaUserCircle, FaCaretDown } from "react-icons/fa";
import Logo from "../assets/images/logo.svg";
import { useAppContext } from "./AppContext.js";
import { useState } from "react";

export default function Navbar() {
  const { user } = useAppContext();
  const { toggleSidebar, logoutUser } = useAppContext();
  const [showToggle, setShowToggle] = useState(false);
  return (
    <Wrapper>
      <div className="nav-center">
        <button className="toggle-btn" onClick={() => toggleSidebar()}>
          <FaAlignLeft />
        </button>
        <div>
          <h3 className="logo-text">Dashboard</h3>
          <img src={Logo} alt="" className="logo" />
        </div>
        <div className="btn-container">
          <button
            className="btn"
            onClick={() => setShowToggle((prevState) => !prevState)}
          >
            <FaUserCircle />
            {user.name}
            <FaCaretDown />
          </button>
          <div className={showToggle ? "dropdown show-dropdown" : "dropdown"}>
            <button className="dropdown-btn" onClick={() => logoutUser()}>
              logout
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}
