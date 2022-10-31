import AreaChartComponent from "./AreaChart";
import BarChartComponent from "./BarChart";
import { useAppContext } from "./AppContext";
import { useState } from "react";
import Wrapper from "../assets/wrappers/ChartsContainer.js";

export default function ChartContainer() {
  const { monthlyStats } = useAppContext();
  const [barChartVal, setBarChartVal] = useState(true);
  return (
    <Wrapper>
      <h4>Monthly Application</h4>
      <button type="button" onClick={() => setBarChartVal(!barChartVal)}>
        {barChartVal ? "BarChart" : "AreaChart"}
      </button>
      {barChartVal ? (
        <BarChartComponent data={monthlyStats} />
      ) : (
        <AreaChartComponent data={monthlyStats} />
      )}
    </Wrapper>
  );
}
