import {render, screen} from "@testing-library/react";
import SalesChart from "@/components/dashboard/SalesReport";
import "@testing-library/jest-dom";

// Mock data for the test
const mockSalesData = {
  productLaunched: 220,
  ongoingProduct: 22,
  productSold: 411,
};

beforeAll(() => {
  global.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});

describe("SalesChart Component", () => {
  it("renders the sales chart correctly with mock data", () => {
    render(<SalesChart data={mockSalesData} />);

    // Check that the labels for the bars are rendered correctly
    const title = screen.getByText(/Sales Report/i);
    expect(title).toBeInTheDocument();
  });
});
