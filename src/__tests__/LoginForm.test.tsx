import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import LoginForm from "../components/auth/LoginForm";
import { loginUser } from "../services/authService";
import { fetchUserFromDb } from "../services/dbService";
import { handleFirebaseError } from "../services/FirebaseErrorService";

// Mock the external dependencies
jest.mock("../context/UserContext", () => ({
  useUser: () => ({ setUser: jest.fn() }),
}));

jest.mock("../context/popupContext", () => ({
  useModal: () => ({ closeModal: jest.fn() }),
}));

const mockSetLoading = jest.fn();
const mockSetError = jest.fn();
jest.mock("../context/AppStatusContext", () => ({
  useAppStatus: () => ({
    loading: false,
    setLoading: mockSetLoading,
    error: null,
    setError: mockSetError,
  }),
}));

jest.mock("../services/authService", () => ({
  loginUser: jest.fn(),
}));

jest.mock("../services/dbService", () => ({
  fetchUserFromDb: jest.fn(),
}));

jest.mock("../services/FirebaseErrorService", () => ({
  handleFirebaseError: jest.fn(),
}));

jest.mock("react-spinners", () => ({
  ClipLoader: () => <div data-testid="clip-loader">Loading...</div>,
}));

describe("LoginForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  //Unit test
  it("renders email and password inputs", () => {
    render(<LoginForm />);
    expect(screen.getByRole("textbox", { name: /email/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  //Unit test
  it("renders a submit button", () => {
    render(<LoginForm />);
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  //Unit test
  it("updates email state when typing in email input", () => {
    render(<LoginForm />);
    const emailInput = screen.getByRole("textbox", {
      name: /email/i,
    }) as HTMLInputElement;
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    expect(emailInput.value).toBe("test@example.com");
  });

  //Unit test
  it("updates password state when typing in password input", () => {
    render(<LoginForm />);
    const passwordInput = screen.getByLabelText(
      /password/i
    ) as HTMLInputElement;
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    expect(passwordInput.value).toBe("password123");
  });

  //Integration test
  it("calls loginUser and fetchUserFromDb when form is submitted with valid data", async () => {
    const mockLoginUser = loginUser as jest.MockedFunction<typeof loginUser>;
    mockLoginUser.mockResolvedValue({ user: { uid: "test-uid" } } as any);

    const mockFetchUserFromDb = fetchUserFromDb as jest.MockedFunction<
      typeof fetchUserFromDb
    >;
    mockFetchUserFromDb.mockResolvedValue({
      id: "test-uid",
      name: "Test User",
    } as any);

    render(<LoginForm />);

    const emailInput = screen.getByRole("textbox", { name: /email/i });
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole("button", { name: /login/i });

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockLoginUser).toHaveBeenCalledWith(
        "test@example.com",
        "password123"
      );
      expect(mockFetchUserFromDb).toHaveBeenCalledWith("test-uid");
    });
  });

  //Integration test
  it("displays error message when login fails", async () => {
    const mockLoginUser = loginUser as jest.MockedFunction<typeof loginUser>;
    mockLoginUser.mockRejectedValue(new Error("Invalid credentials"));

    const mockHandleFirebaseError = handleFirebaseError as jest.MockedFunction<
      typeof handleFirebaseError
    >;
    mockHandleFirebaseError.mockReturnValue("Invalid email or password");

    render(<LoginForm />);

    const emailInput = screen.getByRole("textbox", { name: /email/i });
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole("button", { name: /login/i });

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "wrongpassword" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockSetError).toHaveBeenCalledWith("Invalid email or password");
    });
  });

  //Integration test
  it("sets loading state when submitting", async () => {
    const mockLoginUser = loginUser as jest.MockedFunction<typeof loginUser>;
    mockLoginUser.mockImplementation(() => new Promise(() => {})); // Never resolves

    render(<LoginForm />);

    const emailInput = screen.getByRole("textbox", { name: /email/i });
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole("button", { name: /login/i });

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockSetLoading).toHaveBeenCalledWith(true);
    });
  });
});
