import { IoBarChartSharp } from "react-icons/io5";
import { FaWpforms } from "react-icons/fa";
import { MdQueryStats } from "react-icons/md";
import { ImProfile } from "react-icons/im";

export const Links = [
  {
    id: 1,
    path: "stats",
    text: "Stats",
    icon: <IoBarChartSharp />,
  },
  {
    id: 2,
    path: "add-jobs",
    text: "Add Jobs",
    icon: <MdQueryStats />,
  },
  {
    id: 3,
    path: "all-jobs",
    text: "All Jobs",
    icon: <FaWpforms />,
  },
  {
    id: 4,
    path: "profile",
    text: "Profile",
    icon: <ImProfile />,
  },
];
