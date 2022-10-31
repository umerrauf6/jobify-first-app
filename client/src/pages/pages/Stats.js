import StatContainer from "../../components/StatContainer";
import ChartContainer from "../../components/ChartContainer";
import { useAppContext } from "../../components/AppContext.js";
import { useEffect } from "react";
import Loading from "../../components/Loading.js";

export default function Stats() {
  const { isLoading, monthlyStats, showStats } = useAppContext();

  useEffect(() => {
    showStats();
  }, []);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div>
      <StatContainer />
      {monthlyStats.length > 0 && <ChartContainer />}
    </div>
  );
}
