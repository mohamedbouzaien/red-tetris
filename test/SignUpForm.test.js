import { fireEvent, render, screen, act } from '@testing-library/react';
import SignUpForm from '../src/client/components/SignUpForm';

describe('SignUpForm', () => {
  it('renders the component without errors', () => {
    render(<SignUpForm />);
    const signupForm = screen.getByRole('button', { name: /start/i });
    expect(signupForm).toBeInTheDocument();
  });

  it('renders the input fields correctly', () => {
    render(<SignUpForm />);
    const roomInput = screen.getByLabelText(/room/i);
    const nicknameInput = screen.getByLabelText(/nickname/i);

    expect(roomInput).toBeInTheDocument();
    expect(nicknameInput).toBeInTheDocument();
  });

  it('changes input values on change events', () => {
    render(<SignUpForm />);
    const roomInput = screen.getByLabelText(/room/i);
    const nicknameInput = screen.getByLabelText(/nickname/i);

    act(() => {
      fireEvent.change(roomInput, { target: { value: 'test-room' } });
      fireEvent.change(nicknameInput, { target: { value: 'test-nickname' } });
    });

    expect(roomInput).toHaveValue('test-room');
    expect(nicknameInput).toHaveValue('test-nickname');
  });

  it('shows an error message when room or nickname is blank', () => {
    render(<SignUpForm />);
    const signupForm = screen.getByRole('button', { name: /start/i });

    act(() => {
      fireEvent.click(signupForm);
    });

    const errorMessage = screen.getByText(/Please change blank input/i);
    expect(errorMessage).toBeInTheDocument();
  });

  it('submits the form with correct values and redirects to the room page', async () => {
    const history = { push: jest.fn() };
    render(<SignUpForm history={history} />);
    const roomInput = screen.getByLabelText(/room/i);
    const nicknameInput = screen.getByLabelText(/nickname/i);
    const signupForm = screen.getByRole('button', { name: /start/i });

    act(() => {
      fireEvent.change(roomInput, { target: { value: 'test-room' } });
      fireEvent.change(nicknameInput, { target: { value: 'test-nickname' } });
    });

    await act(async () => {
      fireEvent.click(signupForm);
    });

    expect(history.push).toHaveBeenCalledWith('/test-room[test-nickname]');
  });

  it('shows an error message when the server returns an error', async () => {
    const history = { push: jest.fn() };
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ error: 'test-error' }),
      })
    );
    render(<SignUpForm history={history} />);
    const roomInput = screen.getByLabelText(/room/i);
    const nicknameInput = screen.getByLabelText(/nickname/i);
    const signupForm = screen.getByRole('button', { name: /start/i });

    act(() => {
      fireEvent.change(roomInput, { target: { value: 'test-room' } });
      fireEvent.change(nicknameInput, { target: { value: 'test-nickname' } });
    });

    await act(async () => {
      fireEvent.click(signupForm);
    });

    const errorMessage = screen.getByText(/test-error/i);
    expect(errorMessage).toBeInTheDocument();
  });
});
