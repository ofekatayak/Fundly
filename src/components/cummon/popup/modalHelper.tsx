import StepperForm from "../../auth/CompanySignUpForm/StepperForm";
import PreferencesStep from "../../auth/InvestorSignUpForm/PreferencesStep";
import LoginForm from "../../auth/LoginForm";
import SignUpForm from "../../auth/SignUpForm";

interface RenderFormProps {
  modalType: string;
  userType: string;
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}

const renderLoginForm = () => <LoginForm />;

const renderSignUpForm = (
  userType: string,
  step: number,
  setStep: React.Dispatch<React.SetStateAction<number>>
) => {
  if (userType === "Investor") {
    return step === 1 ? (
      <SignUpForm moveStep={() => setStep(2)} userType="Investor" />
    ) : (
      <PreferencesStep />
    );
  }

  if (userType === "Company") {
    return step === 1 ? (
      <SignUpForm moveStep={() => setStep(2)} userType="Company" />
    ) : (
      <StepperForm />
    );
  }

  return null;
};

// function for know the contetnt of the pop up (ligin | sign Up As Invstor | Company)
// based on the user type and the step of the sign up

export const renderForm = ({
  modalType,
  userType,
  step,
  setStep,
}: RenderFormProps) => {
  switch (modalType) {
    case "Login":
      return renderLoginForm();
    case "Sign Up As":
      return renderSignUpForm(userType, step, setStep);
    default:
      return null;
  }
};

// function for get the title of the pop up (login | sign up based on usert type and step)
export const getTitle = (modalType: string, userType: string, step: number) => {
  if (step > 1) {
    return userType === "Investor" ? "Preferences" : "Verification process";
  }
  return modalType;
};

// fucntion for sign up buttons (Company | Investor)
export const renderSignUpAsButtons = (
  userType: string,
  setUserType: (type: string) => void
) => (
  <div className="sign-up-as">
    <button
      className={
        userType === "Company" ? "activeSignUpButton" : "unActiveSignUpButton"
      }
      onClick={() => setUserType("Company")}
    >
      Company
    </button>
    <button
      className={
        userType === "Investor" ? "activeSignUpButton" : "unActiveSignUpButton"
      }
      onClick={() => setUserType("Investor")}
    >
      Investor
    </button>
  </div>
);
