import { render, screen } from '@testing-library/react';
import UpdateCard from '@/components/dashboard/summary-cards/UpdateCard';
import "@testing-library/jest-dom";

const mockData = {
    date: '2024-11-24T11:33:34.708200',  // New date format
    percentage_change: '40%',  // Updated percentage change
};

describe('UpdateCard Component', () => {
    it('renders UpdateCard with provided data', () => {
        render(<UpdateCard data={mockData} />);

        // Check if the sales increase message is rendered
        expect(screen.getByText(/Sales revenue increased/i)).toBeInTheDocument();
        expect(screen.getByText(/40%/i)).toBeInTheDocument(); // Ensure updated percentage change is displayed correctly

        // Check if the "See Statistics" link is rendered and has the correct text
        expect(screen.getByText(/See Statistics/i)).toBeInTheDocument();

        const updateText = screen.getByText(/Update/i);
        expect(updateText).toBeInTheDocument();
    });
});
