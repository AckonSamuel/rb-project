import React from "react";
import {render, screen} from "@testing-library/react";
import "@testing-library/jest-dom";
import PerformanceCard from "@/components/dashboard/PerformanceCard";

jest.mock("react-chartjs-2", () => ({
  Doughnut: jest.fn(() => <div data-testid="doughnut-chart"></div>),
}));

describe("PerformanceCard Component", () => {
  const mockData = {
    view_count: "40%",
    percentage: "30%",
    sales: "30%",
    total_count: "565K",
  };

  it("renders without crashing", () => {
    render(<PerformanceCard data={mockData} />);
    expect(screen.getByText("Total View Performance")).toBeInTheDocument();
  });

  it("displays additional text elements and button", () => {
    render(<PerformanceCard data={mockData} />);
    expect(screen.getByText("Here are some tips on how to improve your score")).toBeInTheDocument();
    expect(screen.getByRole("button", {name: /guide views/i})).toBeInTheDocument();
  });

  it("renders the legend with correct colors and labels", () => {
    render(<PerformanceCard data={mockData} />);

    expect(screen.getByText("View Count")).toBeInTheDocument();
    expect(screen.getByText("Percentage")).toBeInTheDocument();
    expect(screen.getByText("Sales")).toBeInTheDocument();
  });
});
