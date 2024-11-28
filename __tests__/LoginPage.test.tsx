import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LoginPage from '@/components/Login';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';


beforeAll(() => {
    global.ResizeObserver = class {
        observe() { }
        unobserve() { }
        disconnect() { }
    };
});
describe('LoginPage', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should render the login form', () => {
        render(<LoginPage />);
        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
        const loginButton = screen.getByRole('button', { name: /login/i });
        expect(loginButton).toBeInTheDocument();

        expect(screen.getByText(/forgot password/i)).toBeInTheDocument();
    });

    it('should show error messages for empty fields', async () => {
        render(<LoginPage />);
        const submitButton = screen.getByRole('button', { name: /login/i });
        userEvent.click(submitButton);

        expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
        expect(await screen.findByText(/password is required/i)).toBeInTheDocument();
    });
});
