import { parseDate } from "@internationalized/date";

// generate Avatar from name
export const generateAvatarFromName = (name: string): string => {
  const avatarUrl = `https://ui-avatars.com/api/?name=${name}&size=256`;

  return avatarUrl;
};

//  !----------------------------------------------------------------
//  *-------------------------STRING RELATED FN----------------------
//  !----------------------------------------------------------------

// this function "capitalize" the string which means,
// the first character of the string is written in Capital letter
export function capitalize(str: string | null | undefined) {
  if (typeof str === "string") {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  return str;
}

//  ISO Date is of format yyyy-MM-dd and our date is of format dd-MM-yyyy
export const convertToISODate = (dateStr: string): string | null => {
  if (!dateStr || dateStr.trim() === "") return null; // Handle empty or undefined
  const [day, month, year] = dateStr.split("-").map(Number);
  if (isNaN(day) || isNaN(month) || isNaN(year)) return null;

  // Create a new date in UTC format
  const date = new Date(Date.UTC(year, month - 1, day));
  return date.toISOString().split("T")[0]; // Return format yyyy-mm-dd
};


export const formatDateForPicker = (dateStr: string | undefined): string => {
  if (!dateStr) return "";
  return convertToISODate(dateStr) || "";
};

export function parseDateSafe(dateString: string | null | undefined) {
  if (!dateString) {
    return ""; // or some default value or behavior
  }

  try {
    return parseDate(formatDateForPicker(dateString));
  } catch (error) {
    console.error("Error parsing date:", error);
    return null; // or handle the error appropriately
  }
}