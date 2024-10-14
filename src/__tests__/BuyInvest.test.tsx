import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { toast } from "react-toastify";
import BuyInvest from "../components/company/company-profile/buy-invest/BuyInvest";

// Mock context values
const mockBuyInvestment = jest.fn();
const mockCloseModal = jest.fn();
const mockLoading = false;

// Mock the contexts
jest.mock("../context/PurchedContext", () => ({
  useUserPurchedContext: () => ({
    buyInvestment: mockBuyInvestment,
  }),
}));

jest.mock("../context/popupContext", () => ({
  useModal: () => ({
    closeModal: mockCloseModal,
  }),
}));

jest.mock("../context/AppStatusContext", () => ({
  useAppStatus: () => ({
    loading: mockLoading,
  }),
}));

jest.mock("react-spinners", () => ({
  ClipLoader: () => <div data-testid="clip-loader" />,
}));

jest.mock("react-toastify", () => ({
  toast: {
    error: jest.fn(),
  },
}));

describe("BuyInvest", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  //Integration test
  it("shows error toast when total amount is less than minInvest", async () => {
    const toastErrorMock = jest.fn();
    (toast.error as jest.Mock).mockImplementation(toastErrorMock);

    render(
      <BuyInvest
        investorUid="investor1"
        companyUid="company1"
        minInvest={200}
      />
    );

    const buyButton = screen.getByRole("button", { name: /Buy now!/i });
    fireEvent.click(buyButton);
  });
});
