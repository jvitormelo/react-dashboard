import { formatDistanceStrict as fnsFormatDistance } from "date-fns";

const formatDistance = (date: Date, targetDate = new Date()) => {
  return fnsFormatDistance(date, targetDate, { addSuffix: true });
};

export const dateUtils = {
  formatDistance,
};
