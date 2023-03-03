import {
  format,
  formatDistanceStrict as fnsFormatDistance,
  formatDuration,
  intervalToDuration,
} from "date-fns";

const formatDistance = (date: Date, targetDate = new Date()) => {
  return fnsFormatDistance(date, targetDate, { addSuffix: true });
};

const formatDate = (date: Date | string) => {
  const auxDate = typeof date === "string" ? new Date(date) : date;

  return format(auxDate, "dd/MM/yyyy");
};

const formatHoursDistance = (hours: number) => {
  const interval = intervalToDuration({
    start: 0,
    end: hours * 60 * 60 * 1000,
  });
  return formatDuration(interval, {
    format: ["days", "hours", "minutes"],
    delimiter: " ",
  });
};

export const dateUtils = {
  formatDistance,
  formatDate,
  formatHoursDistance,
};
