import React, { useState, useEffect } from "react";
import YesNoSelector from "./yes-no/YesNoSelector";
import Investor from "../../../models/Investor";
import {
  countries,
  InvesmentsCategories,
  InvestmentRange,
} from "../../../utils/constant";
import { useUser } from "../../../context/UserContext";
import { useModal } from "../../../context/popupContext";
import { useAppStatus } from "../../../context/AppStatusContext";
import { ClipLoader } from "react-spinners";
import { saveUserToDb } from "../../../services/dbService";
import GenericSelector from "../../cummon/drop-down/Selector";
import ListSelector from "../../cummon/list-selector/ListSelector";

interface PreferencesStepProps {
  isEditing?: boolean;
}

const PreferencesStep: React.FC<PreferencesStepProps> = ({
  isEditing = false,
}) => {
  const { user, setUser } = useUser();
  const { closeModal } = useModal();
  const { loading, setLoading, setError } = useAppStatus();

  const [categories, setCategories] = useState<string[]>([]);
  const [investmentRange, setInvestmentRange] = useState<string>("0-100k");
  const [preferenceCountry, setPreferenceCountry] = useState<string>("Israel");
  const [investInPublicCompanies, setInvestInPublicCompanies] =
    useState<boolean>(false);

  useEffect(() => {
    if (isEditing && user?.userType === "Investor") {
      const investor = user as Investor;
      setCategories(investor.preferences.categories || []);
      setInvestmentRange(investor.preferences.investmentRange || "0-100k");
      setPreferenceCountry(investor.preferences.preferenceCountry || "Israel");
      setInvestInPublicCompanies(
        investor.preferences.investInPublicCompanies || false
      );
    }
  }, [isEditing, user]);

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (user?.userType === "Investor") {
      const updatedUser = new Investor(user.uid, user.name, user.email, {
        categories,
        investmentRange,
        preferenceCountry,
        investInPublicCompanies,
      });

      try {
        setLoading(true);
        await saveUserToDb(updatedUser);
        setUser(updatedUser);
        closeModal();
      } catch (error) {
        setError("Error saving user preferences");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <label>Choose Categories</label>
      <ListSelector
        list={InvesmentsCategories}
        setList={setCategories}
        initialList={categories}
      />
      <label>Investment range</label>
      <GenericSelector
        options={InvestmentRange}
        setSelectedValue={setInvestmentRange}
        initialValue={investmentRange}
      />
      <label>Country of companies</label>
      <GenericSelector
        options={countries}
        setSelectedValue={setPreferenceCountry}
        initialValue={preferenceCountry}
      />

      <label>Investing in already public companies?</label>
      <YesNoSelector
        setYesNo={setInvestInPublicCompanies}
        initialValue={investInPublicCompanies}
      />
      {loading ? (
        <ClipLoader color="#39958c" loading={loading} size={50} />
      ) : (
        <button>{isEditing ? "Save Changes" : "Let's Start!"}</button>
      )}
    </form>
  );
};

export default PreferencesStep;
