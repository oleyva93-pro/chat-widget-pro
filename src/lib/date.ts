import { format } from "date-fns";

const dateFormats = {
  short: "MMM d, yyyy",
  long: "MMM d, yyyy h:mm a",
  short_date: "yyyy-MM-dd",
  time: "h:mm a",
  full: "yyyy-MM-dd HH:mm:ss",
};

export function formatDate(
  date: Date,
  dateFormat: keyof typeof dateFormats = "short"
) {
  return format(date, dateFormats[dateFormat]);
}

export const formatToFullDate = (date: string) =>
  format(new Date(date), "Pp")?.toLocaleLowerCase() || "";
