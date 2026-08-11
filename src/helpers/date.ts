import dayjs from "src/libs/dayjs/dayjs.config";

function isExpired(date: Date): boolean {
  return date < new Date();
}

function formatTodayChipLabel(date = dayjs()): string {
  const formattedLabel = date.locale("pt-br").format("ddd, D MMM");
  return (
    formattedLabel.charAt(0).toUpperCase() + formattedLabel.slice(1)
  );
}

export { formatTodayChipLabel, isExpired };
