import Wrapper from "../assets/wrappers/JobsContainer.js";
import Job from "./Job.js";
import { useAppContext } from "./AppContext.js";
import { useEffect } from "react";
import Loading from "./Loading.js";
import PageBtnContainer from "./PageBtnContainer.js";

export default function JobContainer() {
  const {
    allJobs,
    jobs,
    totalJobs,
    isLoading,
    search,
    typeJob,
    typeStatus,
    sort,
    page,
  } = useAppContext();
  useEffect(() => {
    allJobs();
  }, [search, typeJob, typeStatus, sort, page]);

  if (isLoading)
    return (
      <Wrapper>
        <Loading />
      </Wrapper>
    );
  if (jobs.length === 0)
    return (
      <Wrapper>
        <h2>no job found</h2>
      </Wrapper>
    );
  return (
    <Wrapper>
      <h5>jobs : {totalJobs}</h5>
      <div className="jobs">
        {jobs.map((job) => (
          <Job key={job._id} {...job} />
        ))}
      </div>
      <PageBtnContainer />
    </Wrapper>
  );
}
