import type { Updater } from "@tanstack/vue-table";
import type { Ref } from "vue";
import dayjs from "dayjs";
import type { Customer } from "~/types/customer";

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
