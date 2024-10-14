import React from "react";
import PreferencesStep from "../../auth/InvestorSignUpForm/PreferencesStep";
import "./profile.css";
import Button from "../../cummon/Button";

const Profile: React.FC = () => {
  return (
    <div className="profile-container">
      <PreferencesStep isEditing={true} />
      <div className="button-container">
        <Button
          label={"Delete account"}
          onClick={function (): void {}}
          color={"red"}
          backgroundColor={"white"}
          borderColor={"red"}
        />
      </div>
    </div>
  );
};

export default Profile;
