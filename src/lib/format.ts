export function formatTourDate(startDate: string, endDate?: string): string {
  const start = parseLocalISO(startDate);
  if (!start) return startDate;
  const startMonth = start.toLocaleString("en-US", { month: "short" });
  const startDay = start.getDate();
  const startYear = start.getFullYear();

  if (!endDate || endDate === startDate) {
    return `${startMonth} ${startDay}, ${startYear}`;
  }
  const end = parseLocalISO(endDate);
  if (!end) return `${startMonth} ${startDay}, ${startYear}`;

  const endMonth = end.toLocaleString("en-US", { month: "short" });
  const endDay = end.getDate();
  const endYear = end.getFullYear();

  if (startYear !== endYear) {
    return `${startMonth} ${startDay}, ${startYear} – ${endMonth} ${endDay}, ${endYear}`;
  }
  if (startMonth !== endMonth) {
    return `${startMonth} ${startDay} – ${endMonth} ${endDay}, ${endYear}`;
  }
  return `${startMonth} ${startDay}–${endDay}, ${endYear}`;
}

function parseLocalISO(iso: string): Date | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!m) return null;
  return new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
}
