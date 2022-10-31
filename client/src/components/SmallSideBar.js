import Wrapper from "../assets/wrappers/SmallSidebar.js";
import { CgClose } from "react-icons/cg";
import Logo from "../assets/images/logo.svg";
import { useAppContext } from "./AppContext.js";
import NavLinks from "./NavLinks.js";
export default function SmallSideBar() {
  const { toggleSidebar, showSidebar } = useAppContext();
  return (
    <Wrapper>
      <div
        className={
          showSidebar ? "sidebar-container show-sidebar" : "sidebar-container"
        }
      >
        <div className="content">
          <button type="button" className="close-btn" onClick={toggleSidebar}>
            <CgClose />
          </button>
          <header>
            <img src={Logo} alt="" />
          </header>
          <NavLinks toggleSidebar={toggleSidebar} />
        </div>
      </div>
    </Wrapper>
  );
}
