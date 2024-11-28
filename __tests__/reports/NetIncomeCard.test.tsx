import { render, screen } from '@testing-library/react';
import NetIncomeCard from '@/components/dashboard/summary-cards/NetIncome';
import "@testing-library/jest-dom";

const mockData = {
  amount: "300000",
  currency: "GHS",
  percentage_change: "35%",
};

describe('NetIncomeCard Component', () => {
  it('renders net income card with provided data', () => {
    render(<NetIncomeCard data={mockData} />);

    // Check if the currency is rendered
    expect(screen.getByText(/GHS/i)).toBeInTheDocument();

    // Check if the amount is rendered and is formatted as text
    expect(screen.getByText(/300000/i)).toBeInTheDocument();

    // Check if the percentage change is rendered correctly
    expect(screen.getByText(/\+35%/i)).toBeInTheDocument();

    // Check if the label "Net Income" is rendered
    expect(screen.getByText(/Net Income/i)).toBeInTheDocument();

    // Check if the "from last month" text is rendered correctly
    expect(screen.getByText(/from last month/i)).toBeInTheDocument();
  });
});
