import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { useAppStatus } from "../context/AppStatusContext";
import { useCompanyList } from "../context/CompanyListContext";
import InvestmentsSection from "../components/investor/home/body-section/InvestmentSection";

// Define types for mock data
interface Company {
  name: string;
}

// Mock context and external modules
jest.mock("../context/CompanyListContext", () => ({
  useCompanyList: jest.fn(),
}));

jest.mock("../context/AppStatusContext", () => ({
  useAppStatus: jest.fn(),
}));

jest.mock("react-spinners", () => ({
  ClipLoader: jest.fn(() => <div role="status">Loading...</div>),
}));

// Define the mock for InvestmentList
jest.mock("../components/cummon/invest-card/InvestList", () => {
  return {
    __esModule: true,
    default: ({ companies }: { companies: Company[] }) => (
      <div>
        {companies.map((company, index) => (
          <div key={index}>{company.name}</div>
        ))}
      </div>
    ),
  };
});

describe("InvestmentsSection Component", () => {
  //Integretion test
  it("renders the investments section with company data", () => {
    (useAppStatus as jest.Mock).mockReturnValue({ loading: false });
    (useCompanyList as jest.Mock).mockReturnValue({
      companies: [
        { name: "Company A" },
        { name: "Company B" },
        { name: "Company C" },
        { name: "Company D" },
      ],
    });

    render(
      <Router>
        <InvestmentsSection />
      </Router>
    );

    expect(screen.getByText("Suggested Investments")).toBeInTheDocument();
    expect(screen.getByText("Company A")).toBeInTheDocument();
    expect(screen.getByText("Company B")).toBeInTheDocument();
    expect(screen.getByText("Company C")).toBeInTheDocument();
    expect(screen.queryByText("Company D")).not.toBeInTheDocument();
  });

  //Integration test
  it("renders without company data", () => {
    (useAppStatus as jest.Mock).mockReturnValue({ loading: false });
    (useCompanyList as jest.Mock).mockReturnValue({
      companies: [],
    });

    render(
      <Router>
        <InvestmentsSection />
      </Router>
    );

    expect(screen.getByText("Suggested Investments")).toBeInTheDocument();
    expect(screen.queryByText("Company A")).not.toBeInTheDocument();
  });

  //Unit test
  it("displays loading container when data is loading", () => {
    (useAppStatus as jest.Mock).mockReturnValue({ loading: true });
    (useCompanyList as jest.Mock).mockReturnValue({ companies: [] });

    const { container } = render(
      <Router>
        <InvestmentsSection />
      </Router>
    );

    expect(container.querySelector(".loading-container")).toBeInTheDocument();
    expect(screen.queryByText("Suggested Investments")).not.toBeInTheDocument();
  });
});
