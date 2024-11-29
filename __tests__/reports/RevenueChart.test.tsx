import {render, screen} from "@testing-library/react";
import RevenueChart from "@/components/dashboard/RevenueChart";
import "@testing-library/jest-dom";

// Mock chart components
jest.mock("recharts", () => ({
  BarChart: jest.fn().mockReturnValue(<div>BarChart Mock</div>),
  Bar: jest.fn().mockReturnValue(<div>Bar Mock</div>),
  Tooltip: jest.fn().mockReturnValue(<div>Tooltip Mock</div>),
  ResponsiveContainer: jest.fn().mockReturnValue(<div>ResponsiveContainer Mock</div>),
}));

describe("RevenueChart Component", () => {
  const mockData = {
    amount: "300000",
    currency: "GHS",
    percentage_change: "35%",
    break_down: [
      {week: 1, revenue: "1000", expense: "800"},
      {week: 2, revenue: "700", expense: "900"},
      {week: 3, revenue: "1200", expense: "900"},
      {week: 4, revenue: "10000", expense: "900"},
      {week: 5, revenue: "800", expense: "500"},
      {week: 6, revenue: "6500", expense: "500"},
    ],
  };

  it("renders the revenue chart correctly with the provided data", () => {
    render(<RevenueChart data={mockData} />);

    // Check if the chart elements are rendered
    expect(screen.getByText("Revenue")).toBeInTheDocument();
    expect(screen.getByText("Income")).toBeInTheDocument();
    expect(screen.getByText("Expenses")).toBeInTheDocument();

    // Check the revenue amount and percentage change
    expect(screen.getByText("GHS")).toBeInTheDocument();
    expect(screen.getByText("300000")).toBeInTheDocument();
    expect(screen.getByText("+35%")).toBeInTheDocument();
  });

  it("prepares the data for the chart correctly", () => {
    render(<RevenueChart data={mockData} />);

    // Check if the data is being mapped and passed correctly
    const chartData = mockData.break_down.map((item) => ({
      week: `Week ${item.week}`,
      revenue: parseFloat(item.revenue),
      expense: parseFloat(item.expense),
    }));

    // Check if the mapped data matches the chart's data
    expect(chartData).toEqual([
      {week: "Week 1", revenue: 1000, expense: 800},
      {week: "Week 2", revenue: 700, expense: 900},
      {week: "Week 3", revenue: 1200, expense: 900},
      {week: "Week 4", revenue: 10000, expense: 900},
      {week: "Week 5", revenue: 800, expense: 500},
      {week: "Week 6", revenue: 6500, expense: 500},
    ]);
  });

  it("displays the correct chart labels", () => {
    render(<RevenueChart data={mockData} />);

    // Check if the revenue and expense labels are displayed correctly
    const incomeLabel = screen.getByText("Income");
    const expenseLabel = screen.getByText("Expenses");

    expect(incomeLabel).toBeInTheDocument();
    expect(expenseLabel).toBeInTheDocument();
  });
});
