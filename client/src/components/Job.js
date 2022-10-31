import React from "react";
import Wrapper from "../assets/wrappers/Job.js";
import { Link } from "react-router-dom";
import JobInfo from "./JobInfo.js";
import moment from "moment";
import { GoLocation } from "react-icons/go";
import { BsFillCalendarDateFill } from "react-icons/bs";
import { MdOutlineWork } from "react-icons/md";
import { GrUserWorker } from "react-icons/gr";
import { useAppContext } from "./AppContext.js";

export default function Job({
  _id,
  company,
  position,
  jobLocation,
  createdAt,
  status,
  jobType,
}) {
  const { setEditbtn, setDeletebtn } = useAppContext();
  const date = moment(createdAt).format("MMM Do YY");
  return (
    <Wrapper>
      <div>
        <header>
          <div className="main-icon">{company.charAt(0)}</div>
          <div className="info">
            <h5>{company}</h5>
            <h5>{position}</h5>
          </div>
        </header>
        <div className="content">
          <div className="content-center">
            <JobInfo icon={<GoLocation />} text={jobLocation} />
            <JobInfo icon={<BsFillCalendarDateFill />} text={date} />
            <JobInfo icon={<MdOutlineWork />} text={status} />
            <JobInfo icon={<GrUserWorker />} text={jobType} />
          </div>
          <footer>
            <div className="actions ">
              <Link
                to="/add-jobs"
                className="btn edit-btn"
                onClick={() => setEditbtn(_id)}
              >
                Edit
              </Link>
              <button
                className="btn delete-btn"
                onClick={() => setDeletebtn(_id)}
              >
                Delete
              </button>
            </div>
          </footer>
        </div>
      </div>
    </Wrapper>
  );
}
