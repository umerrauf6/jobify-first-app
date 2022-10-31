import Wrapper from "../assets/wrappers/RegisterPage";
import Logo from "../assets/images/logo.svg";
import FormRow from "../components/FromRow";
import { useEffect, useState } from "react";
import { useAppContext } from "../components/AppContext";
import Alert from "../components/Alert";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const navigate = useNavigate();

  const { token, id } = useParams();
  const [value, setValue] = useState({
    password: "",
    token,
    id,
  });
  const {
    showAlert,
    isLoading,
    resetPasswordSuccess,
    displayAlert,
    verify,
    resetPasswordAuth,
    user,
  } = useAppContext();
  useEffect(() => {
    resetPasswordAuth({ token, id });
  }, [id, resetPasswordAuth, token]);
  function onSubmit(e) {
    e.preventDefault();
    if (!value.password) {
      displayAlert();
      return;
    }
    console.log(value);
    resetPasswordSuccess(value);
  }
  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/stats");
      }, 3000);
    }
  }, [user, navigate]);
  function onChange(e) {
    setValue((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  }

  return (
    <Wrapper>
      {verify ? (
        <form className="form" onSubmit={onSubmit}>
          <img src={Logo} alt="Logo" className="logo" />
          <h3>Set New Password</h3>
          {showAlert && <Alert />}
          <FormRow
            type="password"
            name="password"
            value={value.password}
            labelText="Password"
            handleChange={onChange}
          />
          <button className="btn btn-block" type="submit" disabled={isLoading}>
            Submit
          </button>
        </form>
      ) : (
        <h1>link not valid</h1>
      )}
    </Wrapper>
  );
}
