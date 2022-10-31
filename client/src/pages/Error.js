import { Link } from "react-router-dom";
import img from "../assets/images/not-found.svg";
import Wrapper from "../assets/wrappers/ErrorPage";

export default function Error() {
  return (
    <Wrapper className="full-page">
      <img src={img} alt="Not Found" />
      <h1>OHh! PAge not found</h1>
      <p>We cant Seem to find this page</p>
      <Link to="/landing">Back Home</Link>
    </Wrapper>
  );
}
