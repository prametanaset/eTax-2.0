import type { Updater } from "@tanstack/vue-table";
import type { Ref } from "vue";
import type { Customer } from "~/types/customer";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import localeData from "dayjs/plugin/localeData";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/th";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(localeData);
dayjs.extend(relativeTime);
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
  const match = from.match(/^(.*?)\s*<(.+?)>$/); // ดึงชื่อกับ email
  const profileStore = useProfileStore();
  if (match) {
    const name = match[1].trim();

    if (name === profileStore.user?.username) return "me";
    return name;
  }

  if (from === profileStore.user?.username) return "me";
  return from;
}

/**
 * แสดงวันที่เมลแบบ: อา. 13 ก.ค. 19:03 (2 วันที่ผ่านมา)
 */
export function formatMailDisplayDate(dateString: string): string {
  const date = dayjs(dateString);
  const formatted = date.format("dd D MMM HH:mm"); // อา. 13 ก.ค. 19:03
  const relative = dayjs().to(date); // (2 วันที่ผ่านมา)

  return `${formatted} (${relative})`;
}

export function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  const size = parseFloat((bytes / Math.pow(k, i)).toFixed(2));
  return `${size} ${sizes[i]}`;
}

export function convertToFormProps(res: any) {
  const address = res.customer.customer_address;
  const contacts = res.contact;
  const customerType = res.customer.customer_type;

  const email =
    contacts.find((c: any) => c.contact_type === "email")?.contact_value || "-";
  const phone =
    contacts.find((c: any) => c.contact_type === "phone")?.contact_value || "-";
  const zipCode = parseInt(address.postal_code);

  if (customerType === "person") {
    const person = res.person;
    return {
      id: person.customer_id,
      customerType,
      firstName: person.first_name,
      lastName: person.last_name,
      tin: person.tin,
      email,
      phone,
      zipCode,
      address: address.address_line1,
      provinceId: address.province_id,
      districtsId: address.districts_id,
      subdistrictsId: address.subdistricts_id,
    };
  } else {
    const company = res.company;
    return {
      id: company.customer_id,
      customerType,
      companyName: company.company_name,
      email,
      phone,
      zipCode,
      tin: company.tin,
      branchCode: company.branch_no,
      address: address.address_line1,
      provinceId: address.province_id,
      districtsId: address.districts_id,
      subdistrictsId: address.subdistricts_id,
    };
  }
}
