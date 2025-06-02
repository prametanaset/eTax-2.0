import type { Updater } from "@tanstack/vue-table";
import type { Ref } from "vue";
import dayjs from "dayjs";

export const convertToBuddhistYear = (date: any) => {
  const year = date.getFullYear();
  return year + 543;
};

export const formatThaiDate = (date: any) => {
  if (!date || date === "") return "";

  const thaiMonths = [
    "ม.ค.",
    "ก.พ.",
    "มี.ค.",
    "เม.ย.",
    "พ.ค.",
    "มิ.ย.",
    "ก.ค.",
    "ส.ค.",
    "ก.ย.",
    "ต.ค.",
    "พ.ย.",
    "ธ.ค.",
  ];

  const day = date.getDate().toString().padStart(2, "0");
  const month = thaiMonths[date.getMonth()];
  const year = convertToBuddhistYear(date);

  return `${day} ${month} ${year}`;
};

export function formatMailDate(input: string | Date): string {
  const now = dayjs();
  const date = dayjs(input);

  if (date.isSame(now, "day")) {
    return date.format("HH:mm");
  }

  return formatThaiDate(date);
}

export const currencyFormat = (number: any) => {
  return Number(number).toLocaleString("th-TH", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

export function valueUpdater<T extends Updater<any>>(
  updaterOrValue: T,
  ref: Ref
) {
  ref.value =
    typeof updaterOrValue === "function"
      ? updaterOrValue(ref.value)
      : updaterOrValue;
}
