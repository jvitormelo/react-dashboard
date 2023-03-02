import { formatDistanceStrict as fnsFormatDistance, format } from "date-fns";

const formatDistance = (date: Date, targetDate = new Date()) => {
  return fnsFormatDistance(date, targetDate, { addSuffix: true });
};

const formatDate = (date: Date | string) => {
  const auxDate = typeof date === "string" ? new Date(date) : date;

  return format(auxDate, "dd/MM/yyyy");
};

export const dateUtils = {
  formatDistance,
  formatDate,
};
