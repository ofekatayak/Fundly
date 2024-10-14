import { differenceInDays } from "date-fns";
import { Timestamp } from "firebase/firestore";

export const formatTargetAmount = (amount: number): string => {
  if (amount >= 1000000) {
    return (amount / 1000000).toFixed(0) + "M";
  } else if (amount >= 1000) {
    return (amount / 1000).toFixed(0) + "K";
  } else {
    return amount.toString();
  }
};

export const calculateRemainingDays = (date: Timestamp): number => {
  const now = new Date();
  const toDate = date.toDate();
  return Math.max(0, differenceInDays(toDate, now));
};

export const formatRemainingTime = (
  days: number
): { value: string; unit: string } => {
  if (days >= 365) {
    const years = Math.floor(days / 365);
    return { value: years.toString(), unit: years === 1 ? "year" : "years" };
  } else if (days >= 30) {
    const months = Math.floor(days / 30);
    return {
      value: months.toString(),
      unit: months === 1 ? "month" : "months",
    };
  } else {
    return { value: days.toString(), unit: days === 1 ? "day" : "days" };
  }
};

export const extractFileName = (url: string): string => {
  try {
    const urlObj = new URL(url);
    const pathname = urlObj.pathname;
    const filenameWithEncodedChars = pathname.substring(
      pathname.lastIndexOf("/") + 1
    );
    const filename = decodeURIComponent(filenameWithEncodedChars);
    const segments = filename.split("?")[0].split("/");
    return segments[segments.length - 1]; // Remove any query parameters if present
  } catch (error) {
    console.error("Invalid URL:", error);
    return "Unknown";
  }
};
export const shortFileName = (fileName: string, numOfChars: number) => {
  if (fileName === "Unknown") {
    return fileName; // Return as is if it's already "Unknown"
  }

  if (fileName.length > numOfChars) {
    return fileName.substring(0, numOfChars) + "...";
  }

  return fileName; // Return full name if it's 5 characters or less
};

export const formatTimestamp = (timestamp: Timestamp): string => {
  const date = timestamp.toDate(); // Convert Firestore Timestamp to JavaScript Date

  const hours = String(date.getHours()).padStart(2, "0"); // Hours with leading zero
  const minutes = String(date.getMinutes()).padStart(2, "0"); // Minutes with leading zero
  const day = String(date.getDate()).padStart(2, "0"); // Day of the month with leading zero
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based, so add 1
  const year = date.getFullYear(); // Full year

  return `${hours}:${minutes} ${day}/${month}/${year}`;
};
