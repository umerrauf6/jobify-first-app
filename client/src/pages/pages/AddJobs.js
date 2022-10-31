import Wrapper from "../../assets/wrappers/DashboardFormPage.js";
import FormRow from "../../components/FromRow.js";
import Alert from "../../components/Alert.js";
import FormRowSelect from "../../components/FormRowSelect.js";
import { useAppContext } from "../../components/AppContext.js";

export default function AddJobs() {
  const {
    displayAlert,
    createJob,
    showAlert,
    isLoading,
    clearValues,
    handleJobChange,
    isEditing,
    position,
    company,
    jobLocation,
    jobTypeOptions,
    statusOptions,
    editJob,
  } = useAppContext();

  function onChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    handleJobChange(name, value);
  }
  return (
    <Wrapper>
      <form className="form">
        {showAlert && <Alert />}
        <h3>{isEditing ? "Edit Job" : "Add Job"}</h3>
        <div className="form-center">
          <FormRow
            type="text"
            name="company"
            value={company}
            handleChange={onChange}
          />
          <FormRow
            type="text"
            name="position"
            value={position}
            handleChange={onChange}
          />
          <FormRowSelect
            name="jobType"
            label="Job Type"
            list={jobTypeOptions}
            onChange={onChange}
          />
          <FormRowSelect
            name="status"
            label="status"
            list={statusOptions}
            onChange={onChange}
          />
          <FormRow
            type="text"
            name="jobLocation"
            value={jobLocation}
            handleChange={onChange}
          />
          <div className="btn-container">
            <button
              onClick={(e) => {
                e.preventDefault();
                if (!company || !position || !jobLocation)
                  return displayAlert();
                if (isEditing) editJob();
                else createJob();
              }}
              disabled={isLoading}
              className="btn btn-block submit-btn"
            >
              submit
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                clearValues();
              }}
              className="btn btn-block clear-btn"
            >
              Clear
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
}
