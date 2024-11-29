import {render, screen} from "@testing-library/react";
import TotalReturnCard from "@/components/dashboard/summary-cards/TotalReturns";
import "@testing-library/jest-dom";

const mockData = {
  amount: "500000",
  currency: "USD",
  percentage_change: "-10%",
};

describe("TotalReturnCard Component", () => {
  it("renders total return card with provided data", () => {
    render(<TotalReturnCard data={mockData} />);

    // Check if the currency is rendered
    expect(screen.getByText(/USD/i)).toBeInTheDocument();

    // Check if the amount is rendered and is formatted as text
    expect(screen.getByText(/500000/i)).toBeInTheDocument();

    // Check if the negative percentage change is rendered correctly
    expect(screen.getByText(/-10%/i)).toBeInTheDocument();

    // Check if the label "Total Returns" is rendered
    expect(screen.getByText(/Total Returns/i)).toBeInTheDocument();

    // Check if the "from last month" text is rendered correctly
    expect(screen.getByText(/from last month/i)).toBeInTheDocument();
  });
});
