import React from "react";
import { render, screen } from "@testing-library/react";
import { CompanyDetails } from "../components/company/company-profile/CompanyDetails";
import Company from "../models/Company";
import { Timestamp } from "firebase/firestore";

// Mock the child components
jest.mock(
  "../components/company/company-profile/companyPresentation/companyBasicInfo/CompanyBasicInfo",
  () => ({
    CompanyBasicInfo: jest.fn(() => (
      <div data-testid="mock-company-basic-info" />
    )),
  })
);

jest.mock(
  "../components/company/company-profile/companyPresentation/contact/Contact",
  () => ({
    Contact: jest.fn(() => <div data-testid="mock-company-contact" />),
  })
);

jest.mock(
  "../components/company/company-profile/companyPresentation/companyDocs/CompanyDocs",
  () => ({
    CompanyDocs: jest.fn(() => <div data-testid="mock-company-docs" />),
  })
);

// Mock the image imports
jest.mock("../assets/images/company1.png", () => "mocked-company-image-path");
jest.mock("../assets/images/logo1.png", () => "mocked-logo-image-path");

describe("CompanyDetails", () => {
  const mockCompany = new Company(
    "test-uid",
    "Test Company",
    "test@company.com",
    {
      website: "https://testcompany.com",
      promoVideoLink: "https://youtube.com/testvideo",
      country: "Test Country",
      registrarOfCompanies: true,
      category: "AI",
      description: "A test company description",
      about: "About test company",
      image: "mocked-company-image-path",
      logo: "mocked-logo-image-path",
    },
    {
      targetAmount: 1000000,
      deadline: Timestamp.fromDate(new Date("2023-12-31")),
      minInvestment: 10000,
      raisePurpose: ["Expansion", "R&D"],
      raisedAmount: 500000,
      currentInvestmentsAmount: 450000,
    },
    ["document1.pdf", "document2.pdf"]
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  //Integration test
  it("renders without crashing and contains all expected sections", () => {
    const { container } = render(<CompanyDetails company={mockCompany} />);

    expect(container.querySelector(".details-container")).toBeInTheDocument();
    expect(container.querySelector(".docs-container")).toBeInTheDocument();
    expect(container.querySelector(".info-container")).toBeInTheDocument();
    expect(container.querySelector(".contact-container")).toBeInTheDocument();
    expect(container.querySelectorAll(".separator")).toHaveLength(2);
  });

  //Integration test
  it("passes the company prop to child components", () => {
    render(<CompanyDetails company={mockCompany} />);
    // We're not checking the actual rendering of these components,
    // just that they were called with the correct props
    expect(
      require("../components/company/company-profile/companyPresentation/companyDocs/CompanyDocs")
        .CompanyDocs
    ).toHaveBeenCalledWith({ company: mockCompany }, {});
    expect(
      require("../components/company/company-profile/companyPresentation/companyBasicInfo/CompanyBasicInfo")
        .CompanyBasicInfo
    ).toHaveBeenCalledWith({ company: mockCompany }, {});
    expect(
      require("../components/company/company-profile/companyPresentation/contact/Contact")
        .Contact
    ).toHaveBeenCalledWith({ receiver: mockCompany }, {});
  });

  //Unit test
  it("calculates progress correctly", () => {
    const progress = mockCompany.calculateProgress();
    expect(progress).toBe(45); // (450000 / 1000000) * 100 = 45%
  });

  //Unit test
  it("renders with correct CSS classes for styling", () => {
    const { container } = render(<CompanyDetails company={mockCompany} />);

    expect(container.querySelector(".details-container")).toHaveClass(
      "details-container"
    );
    expect(container.querySelector(".docs-container")).toHaveClass(
      "docs-container",
      "company-section"
    );
    expect(container.querySelector(".info-container")).toHaveClass(
      "info-container",
      "company-section"
    );
    expect(container.querySelector(".contact-container")).toHaveClass(
      "contact-container",
      "company-section"
    );

    const separators = container.querySelectorAll(".separator");
    expect(separators).toHaveLength(2);
    separators.forEach((separator) => {
      expect(separator).toHaveClass("separator");
    });
  });

  //Integration test
  it("updates when company prop changes", () => {
    const { rerender } = render(<CompanyDetails company={mockCompany} />);

    const updatedCompany = new Company(
      "updated-uid",
      "Updated Company",
      "updated@company.com",
      {
        ...mockCompany.companyDetails,
        description: "Updated description",
      },
      {
        ...mockCompany.raiseDetails,
        targetAmount: 2000000,
      },
      ["updated-document.pdf"]
    );

    rerender(<CompanyDetails company={updatedCompany} />);

    // Check if the mocked child components were called with the updated company
    expect(
      require("../components/company/company-profile/companyPresentation/companyDocs/CompanyDocs")
        .CompanyDocs
    ).toHaveBeenCalledWith({ company: updatedCompany }, {});
    expect(
      require("../components/company/company-profile/companyPresentation/companyBasicInfo/CompanyBasicInfo")
        .CompanyBasicInfo
    ).toHaveBeenCalledWith({ company: updatedCompany }, {});
    expect(
      require("../components/company/company-profile/companyPresentation/contact/Contact")
        .Contact
    ).toHaveBeenCalledWith({ receiver: updatedCompany }, {});
  });
});
