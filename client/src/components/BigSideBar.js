import Wrapper from "../assets/wrappers/BigSidebar.js";
import { useAppContext } from "./AppContext.js";
import NavLinks from "./NavLinks.js";
import Logo from "../assets/images/logo.svg";

export default function BigSideBar() {
  const { showSidebar, toggleSidebar } = useAppContext();
  return (
    <Wrapper>
      <div
        className={
          showSidebar ? "sidebar-container" : "sidebar-container show-sidebar"
        }
      >
        <div className="content">
          <header>
            <img src={Logo} alt="" />
          </header>
          <NavLinks toggleSidebar={toggleSidebar} />
        </div>
      </div>
    </Wrapper>
  );
}
