import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { UserType } from "../utils/enums";
import SignUpForm from "../components/auth/SignUpForm";

// Mock Context Providers
jest.mock("../context/UserContext", () => ({
  useUser: () => ({
    user: null,
    setUser: jest.fn(),
  }),
}));

jest.mock("../context/AppStatusContext", () => ({
  useAppStatus: () => ({
    loading: false,
    setLoading: jest.fn(),
    error: null,
    setError: jest.fn(),
    uploading: false,
    setUploading: jest.fn(),
  }),
}));

jest.mock("../components/auth/CompanySignUpForm/StepperForm", () => ({
  __esModule: true,
  default: () => <div>Stepper Form</div>,
}));

jest.mock("../components/auth/InvestorSignUpForm/PreferencesStep", () => ({
  __esModule: true,
  default: () => <div>Preferences Step</div>,
}));

const mockMoveStep = jest.fn();

const renderSignUpForm = (userType: UserType) => {
  return render(<SignUpForm userType={userType} moveStep={mockMoveStep} />);
};

//Unit test
test("renders Sign Up form with required elements", () => {
  renderSignUpForm(UserType.Investor);

  // Check if the form elements are present
  expect(screen.getByLabelText(/Investor Name/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /Sign Up/i })).toBeInTheDocument();
});

//Integration test
test("form submission triggers moveStep", async () => {
  // Mock the API call to avoid real network requests
  jest
    .spyOn(require("../services/authService"), "registerUser")
    .mockResolvedValue({
      user: { uid: "test-uid" },
    });

  renderSignUpForm(UserType.Investor);

  // Fill the form fields
  fireEvent.change(screen.getByLabelText(/Investor Name/i), {
    target: { value: "John Doe" },
  });
  fireEvent.change(screen.getByLabelText(/Email/i), {
    target: { value: "john@example.com" },
  });
  fireEvent.change(screen.getByLabelText(/Password/i), {
    target: { value: "password123" },
  });

  // Submit the form by clicking the submit button
  fireEvent.click(screen.getByRole("button", { name: /Sign Up/i }));

  // Use waitFor to handle async form submission
  await waitFor(() => {
    expect(mockMoveStep).toHaveBeenCalledTimes(1);
  });
});
