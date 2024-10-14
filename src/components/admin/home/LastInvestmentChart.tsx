import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Invest from "../../../models/Invest";

interface ChartData {
  date: string;
  amount: number;
}

class EnrichedInvest extends Invest {
  investorName: string;
  companyName: string;

  constructor(invest: Invest, investorName: string, companyName: string) {
    super(
      invest.investorUid,
      invest.companyUid,
      invest.investNumber,
      invest.investAmount,
      invest.investId
    );
    this.investorName = investorName;
    this.companyName = companyName;
  }
}

interface LastInvestmentsChartProps {
  investments: EnrichedInvest[];
}

const LastInvestmentsChart: React.FC<LastInvestmentsChartProps> = ({
  investments,
}) => {
  const chartData: ChartData[] = investments
    .sort((a, b) => a.investDate.seconds - b.investDate.seconds)
    .map((invest) => ({
      date: invest.investDate
        .toDate()
        .toLocaleDateString("he-IL", { month: "short", day: "numeric" }),
      amount: invest.investAmount,
    }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="amount" fill="#d0ebea" name="Investment Amount" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default LastInvestmentsChart;
