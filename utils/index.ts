import type { Updater } from "@tanstack/vue-table";
import type { Ref } from "vue";
import type { Customer } from "~/types/customer";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import localeData from "dayjs/plugin/localeData";
import "dayjs/locale/th";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(localeData);
dayjs.locale("th");

export const convertToBuddhistYear = (date: any) => {
  const year = date.getFullYear();
  return year + 543;
};

export function formatThaiDate(date: Date): string {
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // getMonth() เริ่มจาก 0
  const year = date.getFullYear().toString();

  return `${day}/${month}/${year}`;
}

export function formatThaiDateforMail(date: dayjs.Dayjs): string {
  const bangkokDate = date.tz("Asia/Bangkok");
  const currentYear = dayjs().year();
  const buddhistYear = bangkokDate.year() + 543;

  const formatted = bangkokDate.format("D MMM");

  if (bangkokDate.year() === currentYear) {
    return formatted;
  }

  return `${formatted} ${buddhistYear}`;
}

export function formatMailDate(input: string | Date): string {
  const now = dayjs().tz("Asia/Bangkok");
  let date: dayjs.Dayjs;

  if (typeof input === "string") {
    // แปลง string เป็น UTC แล้วแปลงเป็น timezone ไทย
    date = dayjs.utc(input).tz("Asia/Bangkok");
  } else {
    // ถ้าเป็น Date ให้สร้าง dayjs แล้วแปลง timezone ไทย
    date = dayjs(input).tz("Asia/Bangkok");
  }

  if (!date.isValid()) return "-";

  if (date.isSame(now, "day")) {
    return date.format("HH:mm");
  }

  return formatThaiDateforMail(date);
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

export function mapCustomerResponseToCustomer(response: any[]): Customer[] {
  return response.map((c) => ({
    ID: c.id,
    StoreId: c.store_id,
    CustomerType: c.customer_type === "person" ? "บุคคลธรรมดา" : "นิติบุคคล",
    Tin: c.person_customer?.tin || c.company_customer?.tin || "-",
    FirstName:
      c.person_customer?.first_name || c.company_customer?.company_name || "-",
    LastName: c.person_customer?.last_name || "-",
    Email:
      c.customer_contacts?.find((con) => con.contact_type === "email")
        ?.contact_value || "-",
    Phone:
      c.customer_contacts?.find((con) => con.contact_type === "phone")
        ?.contact_value || "-",
    Address: [
      c.customer_address?.address_line1,
      c.customer_address?.address_line2,
    ]
      .filter(Boolean)
      .join(" "),
    CreatedAt: c.created_at,
    UpdatedAt: c.updated_at,
  }));
}

export function extractName(from: string): string {
  const match = from.match(/^(.*?)\s*<.*?>$/);
  return match ? match[1] : from;
}
