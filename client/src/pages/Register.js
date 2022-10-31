// import { Link } from "react-router-dom";
import Logo from "../assets/images/logo.svg";
import { useState } from "react";
import Wrapper from "../assets/wrappers/RegisterPage";
import FormRow from "../components/FromRow";
import Alert from "../components/Alert";
import { useAppContext } from "../components/AppContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const intialState = {
  name: "",
  email: "",
  password: "",
  isMember: true,
  isForgot: false,
};
export default function Register() {
  const navigate = useNavigate();

  const [value, setValue] = useState(intialState);
  function onChange(e) {
    setValue((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  }

  const {
    resetMail,
    user,
    isLoading,
    showAlert,
    displayAlert,
    registerUser,
    loginUser,
  } = useAppContext();

  function toggleMember() {
    setValue((prevState) => {
      return {
        ...prevState,
        isForgot: false,
        isMember: !prevState.isMember,
      };
    });
  }
  function forgetPass() {
    setValue((prevState) => {
      return {
        ...prevState,
        isForgot: true,
      };
    });
  }
  useEffect(() => {
    if (user) {
      // setTimeout(() => {
      navigate("/stats");
      // }, 3000);
    }
  }, [user, navigate]);

  function onSubmit(e) {
    e.preventDefault();
    const { name, email, password, isMember, isForgot } = value;
    if ((!password && !isForgot) || !email || (!name && !isMember)) {
      displayAlert();
      return;
    }
    const currentUser = { name, email, password };
    if (isMember && !isForgot) {
      loginUser(currentUser);
    } else if (isMember || isForgot) {
      resetMail(currentUser);
    } else {
      registerUser(currentUser);
    }
  }

  return (
    <Wrapper>
      <form className="form" onSubmit={onSubmit}>
        <img src={Logo} alt="Logo" className="logo" />
        <h3>
          {!value.isMember
            ? "REGISTER"
            : value.isForgot
            ? "FORGOT PASSWORD"
            : "LOGIN"}
        </h3>
        {showAlert && <Alert />}
        {!value.isMember && (
          <FormRow
            name="name"
            type="name"
            value={value.name}
            handleChange={onChange}
          />
        )}
        <FormRow
          name="email"
          type="email"
          value={value.email}
          handleChange={onChange}
        />
        {!value.isForgot && (
          <FormRow
            name="password"
            type="password"
            value={value.password}
            handleChange={onChange}
          />
        )}
        <button className="btn btn-block" type="submit" disabled={isLoading}>
          Submit
        </button>
        {value.isMember && !value.isForgot && (
          <button className="forgetPassword" onClick={forgetPass}>
            Forgot Password ?
          </button>
        )}
        <p>
          {value.isMember ? "Not a member yet !!" : "Already a member"}

          <button type="button" className="member-btn" onClick={toggleMember}>
            {!value.isMember ? "LOGIN" : "REGISTER"}
          </button>
        </p>
      </form>
    </Wrapper>
  );
}
