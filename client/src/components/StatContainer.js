import Wrapper from "../assets/wrappers/StatsContainer.js";
import StatItems from "./StatItems.js";
import { useAppContext } from "./AppContext.js";
import { FaSuitcaseRolling, FaBug, FaCalendarCheck } from "react-icons/fa";

export default function StatContainer() {
  const { stats } = useAppContext();
  const defaultStats = [
    {
      title: "Pending Application",
      count: stats.pending || 0,
      icon: <FaSuitcaseRolling />,
      color: "#e9b949",
      bcg: "#fcefc7",
    },
    {
      title: "Interview Scheduled",
      count: stats.interview || 0,
      icon: <FaCalendarCheck />,
      color: "#647acb",
      bcg: "#e0e8f9",
    },
    {
      title: "Job Declined",
      count: stats.delined || 0,
      icon: <FaBug />,
      color: "#d66a6a",
      bcg: "#ffeeee",
    },
  ];

  return (
    <Wrapper>
      {defaultStats.map((item, index) => {
        return <StatItems key={index} {...item} />;
      })}
    </Wrapper>
  );
}
