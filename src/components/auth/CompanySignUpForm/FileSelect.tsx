import React, { useEffect, useState } from "react";
import { Box, Button, Grid, IconButton } from "@mui/material";
import { useAppStatus } from "../../../context/AppStatusContext";
import Company from "../../../models/Company";
import { ImageSection } from "../../../utils/enums";
import { uploadDoc } from "../../../services/dbService";
import { extractFileName, shortFileName } from "../../../utils/functions";
import DeleteIcon from "@mui/icons-material/Delete";
import fileImage from "../../.././assets/images/file input.jpg";
import fileNoPlus from "../../.././assets/images/file_No_Plus.jpg";

interface Props {
  index: number;
  files: string[];
  setFiles: React.Dispatch<React.SetStateAction<string[]>>;
  user: Company;
  updateUser: (updatedUser: Company) => void;
  fileAddress: string;
}

export const FileSelect: React.FC<Props> = ({
  index,
  files,
  setFiles,
  user,
  updateUser,
  fileAddress,
}) => {
  const [selectedFileAddress, setSelectedFileAddress] = useState(fileAddress);
  const { setUploading } = useAppStatus();

  useEffect(() => {
    if (fileAddress) {
      setSelectedFileAddress(fileAddress);
    }
  }, [fileAddress]);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const fileUrl = await uploadDoc(
        e.target.files[0],
        user.uid,
        ImageSection.Docs,
        setUploading
      );
      setSelectedFileAddress(fileUrl);
      setFiles((prev) => [...prev, fileUrl]);
    }
  };

  const handleDelete = () => {
    setFiles((prev) => prev.filter((file) => file !== selectedFileAddress));
    setSelectedFileAddress("");
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <Box>
        <Grid container direction="column" spacing={2}>
          <label
            {...(!selectedFileAddress
              ? { htmlFor: `file-upload-${index}` }
              : {})}
            style={{ cursor: "pointer" }}
          >
            <img
              src={!selectedFileAddress ? fileImage : fileNoPlus}
              alt="Main Illustration"
              className="main-section__image"
              style={{ width: "80px", height: "95px" }}
            />
          </label>
        </Grid>
        <Grid container direction="row" alignItems="center" spacing={2}>
          <input
            type="file"
            accept="image/*"
            id={`file-upload-${index}`}
            style={{ display: "none" }}
            onChange={handleChange}
          />
          <label
            style={{
              fontSize: "16px",
              marginLeft: "2px",
              marginTop: "30px",
            }}
          >
            {selectedFileAddress
              ? shortFileName(extractFileName(selectedFileAddress), 5)
              : ""}
          </label>
          {selectedFileAddress && (
            <IconButton
              onClick={handleDelete}
              color="secondary"
              aria-label="delete file"
              style={{ marginLeft: "10px", marginTop: "20px" }}
            >
              <DeleteIcon />
            </IconButton>
          )}
        </Grid>
      </Box>
    </form>
  );
};
