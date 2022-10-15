import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';

const data = [
  { name: 'Jan', uv: 400, pv: 2400, amt: 2400 },
  { name: 'Ferv', uv: 200, pv: 2400, amt: 2400 },
  { name: 'Mar', uv: 450, pv: 2400, amt: 2400 },
  { name: 'Abr', uv: 40, pv: 2400, amt: 2400 },
  { name: 'Jun', uv: 120, pv: 2400, amt: 2400 },
  { name: 'Jul', uv: 350, pv: 2400, amt: 2400 },
  { name: 'Ago', uv: 70, pv: 2400, amt: 2400 },
  { name: 'Set', uv: 150, pv: 2400, amt: 2400 },
  { name: 'Out', uv: 550, pv: 2400, amt: 2400 },
  { name: 'Nov', uv: 150, pv: 2400, amt: 2400 },
  { name: 'Dez', uv: 50, pv: 2400, amt: 2400 },
];

export const LineCharts = () => {
  return (
    <LineChart
      width={1080}
      height={370}
      data={data}
      margin={{ top: 25, right: 40, bottom: 5, left: 0 }}
    >
      <Line type="monotone" dataKey="uv" stroke="#8884d8" />
      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
    </LineChart>
  );
};
