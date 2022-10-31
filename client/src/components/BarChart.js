import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

export default function BarChartComponent({ data }) {
  return (
    <BarChart width={800} height={250} data={data} margin={{ top: 50 }}>
      <CartesianGrid strokeDasharray="3 3 " />
      <XAxis dataKey="date" />
      <YAxis allowDecimals={false} />
      <Tooltip />
      <Bar dataKey="count" fill="#8884d8" />
    </BarChart>
  );
}
