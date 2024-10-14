import React from "react";
import "./FirstSection.css";
import analyticImg from "../../../../assets/images/analytic_image.png";
import { useUser } from "../../../../context/UserContext";
import { useModal } from "../../../../context/popupContext";
import { UserType } from "../../../../utils/enums";

const MainSection: React.FC = () => {
  const { user } = useUser();
  const { openModal, setUserType } = useModal();
  return (
    <section className="main-section">
      <div data-testid="check" className="main-section__content">
        <div className="main-section__text">
          <h1>
            Invest today in the private companies of{" "}
            <span className="highlight">tomorrow</span>
          </h1>
          <p>
            It's easy to invest in Israeli startups and become true partners in
            success. Our platform offers transparent and focused fundraising
            with full regulatory information to back every investment decision.
          </p>
          {!user ? (
            <div className="main-section__buttons">
              <button
                className="main-section__button raise_bttn"
                onClick={() => {
                  openModal("Sign Up As");
                  setUserType(UserType.Company);
                }}
              >
                Want to raise funds
              </button>

              <button
                className="main-section__button invest_bttn"
                onClick={() => {
                  openModal("Sign Up As");
                  setUserType(UserType.Investor);
                }}
              >
                Want to invest
              </button>
            </div>
          ) : (
            <>
              <h1
                style={{
                  marginTop: "70px",
                  textAlign: "center",
                  color: "#39958c",
                }}
              >
                !Welcome, {user.name}
              </h1>
            </>
          )}
        </div>
        <img
          src={analyticImg}
          alt="Main Illustration"
          className="main-section__image"
        />
      </div>
    </section>
  );
};

export default MainSection;
