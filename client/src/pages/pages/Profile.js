import { useAppContext } from "../../components/AppContext.js";
import Wrapper from "../../assets/wrappers/DashboardFormPage.js";
import FormRow from "../../components/FromRow.js";
import Alert from "../../components/Alert.js";

import { useState } from "react";
export default function Profile() {
  const { user, showAlert, updateUser, displayAlert, isLoading } =
    useAppContext();
  console.log(user);
  const [updateState, setUpdateState] = useState({
    name: user.name,
    email: user.email,
    lastName: user.lastName,
    location: user.location,
  });

  function handleSubmit(e) {
    e.preventDefault();
    const { name, email, lastName, location } = updateState;
    if (!name || !email || !lastName || !location) {
      displayAlert();
      return;
    }
    updateUser({ name, email, lastName, location });
  }
  function handleChange(e) {
    setUpdateState((prevState) => {
      console.log(prevState);
      return { ...prevState, [e.target.name]: e.target.value };
    });
  }
  return (
    <Wrapper>
      <form onSubmit={handleSubmit} className="form">
        {showAlert && <Alert />}
        <div className="form-center">
          <FormRow
            type="name"
            name="name"
            value={updateState.name}
            handleChange={handleChange}
          />
          <FormRow
            type="email"
            name="email"
            value={updateState.email}
            handleChange={handleChange}
          />
          <FormRow
            type="lastName"
            name="lastName"
            value={updateState.lastName}
            handleChange={handleChange}
          />
          <FormRow
            type="location"
            name="location"
            value={updateState.location}
            handleChange={handleChange}
          />
          <button type="submit" className="btn btn-block" disabled={isLoading}>
            {isLoading ? "Loading..." : "Save Changes"}
          </button>
        </div>
      </form>
    </Wrapper>
  );
}
