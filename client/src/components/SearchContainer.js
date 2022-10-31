import FormRow from "./FromRow.js";
import { useAppContext } from "./AppContext";
import Wrapper from "../assets/wrappers/SearchContainer.js";
import FormRowSelect from "./FormRowSelect.js";

export default function SearchContainer() {
  const {
    isLoading,
    handleJobChange,
    search,
    typeStatus,
    statusOptions,
    typeJob,
    jobTypeOptions,
    sort,
    sortOptions,
    clearFilters,
  } = useAppContext();

  function handleSearch(e) {
    e.preventDefault();

    // if (isLoading) return;
    handleJobChange(e.target.name, e.target.value);
  }

  return (
    <Wrapper>
      <div className="form">
        <form action="" className="form-center">
          <FormRow
            labelText="Search"
            type="text"
            name="search"
            value={search}
            handleChange={handleSearch}
          />
          <FormRowSelect
            label="Status"
            name="typeStatus"
            value={typeStatus}
            onChange={handleSearch}
            list={["all", ...statusOptions]}
          />
          <FormRowSelect
            label="Job Type"
            name="typeJob"
            value={typeJob}
            onChange={handleSearch}
            list={["all", ...jobTypeOptions]}
          />
          <FormRowSelect
            label="Sort"
            name="sort"
            value={sort}
            onChange={handleSearch}
            list={[...sortOptions]}
          />
          <button
            type="button"
            className="btn btn-block btn-danger"
            disabled={isLoading}
            onClick={(e) => {
              e.preventDefault();
              clearFilters();
            }}
          >
            Clear Filters
          </button>
        </form>
      </div>
    </Wrapper>
  );
}
