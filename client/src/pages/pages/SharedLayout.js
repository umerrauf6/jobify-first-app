import Wrapper from "../../assets/wrappers/SharedLayout.js";
import { Outlet } from "react-router-dom";
import { BigSideBar, SmallSideBar, Navbar } from "../../components/index.js";

export default function SharedProfile() {
  return (
    <Wrapper>
      <main className="dashboard">
        <BigSideBar />
        <SmallSideBar />
        <div>
          <Navbar />
          <div className="dashboard-page">
            <Outlet />
          </div>
        </div>
      </main>
    </Wrapper>
  );
}
