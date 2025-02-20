export const formatDate = (isoString: string): string => {
  if (!isoString) return "Invalid Date"; // Handle null/undefined cases
  const date = new Date(isoString);
  if (isNaN(date.getTime())) return "Invalid Date"; // Handle invalid date cases

  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
};
