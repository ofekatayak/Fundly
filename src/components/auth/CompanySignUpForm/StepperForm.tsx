import React, { useEffect, useState } from "react";
import { Stepper, Step, StepLabel, Button, Box } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useModal } from "../../../context/popupContext";
import { useAppStatus } from "../../../context/AppStatusContext";
import { InfoContentForm } from "./InfoContentForm";
import { RaiseContentForm } from "./RaiseContentForm";
import { DocsForm } from "./DocsForm";
import { saveUserToDb } from "../../../services/dbService";
import { useUser } from "../../../context/UserContext";
import Company from "../../../models/Company";
import { ClipLoader } from "react-spinners";

const primaryColor = "#39958c";
const secondaryColor = "#7fcbc4";
const softColor = "#D0EBEA";
const style = {
  width: "100%",
  height: "70vh",
  padding: "10px",
  overflowY: "auto",
  "&::-webkit-scrollbar": {
    display: "none",
  },
};
// custome them for stepper
const theme = createTheme({
  palette: {
    primary: {
      main: primaryColor,
    },
    secondary: {
      main: secondaryColor,
    },
  },
  components: {
    MuiStepIcon: {
      styleOverrides: {
        root: {
          "&.Mui-active": {
            color: secondaryColor, // צבע שלב פעיל
          },
          "&.Mui-completed": {
            color: primaryColor, // צבע שלב שהושלם
          },
          "&.Mui-disabled": {
            color: softColor, // צבע שלב שאינו פעיל
          },
        },
      },
    },
    MuiStepLabel: {
      styleOverrides: {
        label: {
          "&.Mui-active": {
            color: primaryColor, // צבע טקסט של שלב פעיל
          },
          "&.Mui-completed": {
            color: secondaryColor, // צבע טקסט של שלב שהושלם
          },
          "&.Mui-disabled": {
            color: "#e0e0e0", // צבע טקסט של שלב שאינו פעיל
          },
        },
      },
    },
  },
});

const steps = ["Info", "Rais", "Docs"];

interface StepContentProps {
  step: number;
  user: Company;
  updateUser: (updatedUser: Company) => void;
}
const StepContent: React.FC<StepContentProps> = ({
  step,
  user,
  updateUser,
}) => {
  switch (step) {
    case 0:
      return (
        <div>
          <InfoContentForm user={user} updateUser={updateUser} />
        </div>
      );
    case 1:
      return (
        <div>
          <RaiseContentForm user={user} updateUser={updateUser} />
        </div>
      );
    case 2:
      return <DocsForm user={user} updateUser={updateUser} />;
    default:
      return <div>Unknown Step</div>;
  }
};

const StepperForm: React.FC = () => {
  const { user, setUser } = useUser();
  const [localUser, setLocalUser] = useState<Company>(new Company());
  const [activeStep, setActiveStep] = useState(0);
  const { closeModal } = useModal();
  const { loading, setLoading, uploading } = useAppStatus();

  useEffect(() => {
    if (user) {
      const investor = user as Company;
      const updatedLocalUser = new Company(
        investor.uid || localUser.uid,
        investor.name || localUser.name,
        investor.email || localUser.email,
        {
          ...localUser.companyDetails,
          ...investor.companyDetails,
        },
        {
          ...localUser.raiseDetails,
          ...investor.raiseDetails,
        },
        investor.uploadedDocuments || localUser.uploadedDocuments
      );
      setLocalUser(updatedLocalUser);
    }
  }, [user]);

  const updateUser = (updatedUser: Company) => {
    setLocalUser(updatedUser);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const saveDataInDb = async () => {
    setLoading(true); //
    //TODO : call to SaveUserToDb from services.ts
    await saveUserToDb(localUser);
    setUser(localUser);
    // finish to save the user in db
    setLoading(false);
    // close the pop up
    closeModal();
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={style}>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <Box sx={{ marginTop: 2 }}>
          <Box>
            <StepContent
              step={activeStep}
              user={localUser}
              updateUser={updateUser}
            />
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />
              {loading ? (
                <ClipLoader color="#39958c" loading={loading} size={50} />
              ) : !uploading ? (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    if (activeStep < steps.length - 1) {
                      handleNext();
                    } else {
                      saveDataInDb();
                    }
                  }}
                >
                  {activeStep === steps.length - 1 ? "Finish" : "Next"}
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  disabled
                  onClick={() => {
                    if (activeStep < steps.length - 1) {
                      handleNext();
                    } else {
                      saveDataInDb();
                    }
                  }}
                >
                  {activeStep === steps.length - 1 ? "Finish" : "Next"}
                </Button>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default StepperForm;
