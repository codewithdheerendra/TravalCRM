import AdminIcon from "~/public/images/icons/Admin.svg";
import { BiBriefcase, BiBus, BiChart, BiFile, BiGrid, BiSolidUserAccount, BiUser } from "react-icons/bi";
import { IconType } from "react-icons/lib";

export type NavItem = {
  label: string;
  href: string;
  icon: IconType;
};

export const NAV_ITEMS: NavItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: BiGrid,
  },
  {
    label: "User",
    href: "/user",
    icon: BiUser,
  },
  {
    label: "Tour",
    href: "/tours",
    icon: BiBriefcase,
  },
  {
    label: "Booking",
    href: "/bookings",
    icon: BiBus,
  },
  {
    label: "Admin",
    href: "/admin",
    icon: AdminIcon,
  },
  {
    label: "B2B Agent Portal",
    href: "/agent-portal",
    icon: BiSolidUserAccount,
  },
  {
    label: "Payment",
    href: "/payment",
    icon: BiFile,
  },
  {
    label: "Reports & Analytics",
    href: "/reports-analytics",
    icon: BiChart,
  },
];


export interface NumberInputProps {
  min: number; max: number; step: number;
}
export function numberInputProps(props: Partial<NumberInputProps>) {
  return {input: {inputProps: {min: props.min || 0, max: props.max || 100, step: props.step || 1}}};
}
export interface TextInputProps {
  minLength: number; maxLength: number; pattern: RegExp;
}
export function textInputProps(props: Partial<TextInputProps>) {
  return {input: {inputProps: {minLength: props.minLength || 0, max: props.maxLength || 1000000, pattern: props.pattern || /.*/}}};
}
export interface FileUploadProps {
  readOnly: boolean;
  endAdornment: React.ReactNode;
}
export function fileUploadProps(props: Partial<FileUploadProps>) {
  return {input: {readOnly: props.readOnly || false, ...props.endAdornment&& {endAdornment: props.endAdornment}}};
}

export const richTextRequired = (message = "This field is required") => {
  return (val: unknown) => {
    if (typeof val !== "string") return message;

    const plainText = val.replace(/<(.|\n)*?>/g, "").trim();
    return plainText.length > 0 || message;
  };
};


export const packageCostColumns = [
  { id: 'srNo', label: 'Sr. No', isVisbible: true },
  { id: 'availableFrom', label: 'Available From', isVisbible: true},
  { id: 'travelAccommodationType', label: 'Travel Accommodation Type', isVisbible: true },
  { id: 'duration', label: 'Duration', isVisbible: true},
  { id: 'pricePerPerson', label: 'Price Per Person', isVisbible: true},
];
export const packageCostData = [
  { srNo: 1, availableFrom: 'Ahmedabad', travelAccommodationType: 'Triple Sharing', duration: '5 days - 6 nights', pricePerPerson: '₹7499' },
  { srNo: 2, availableFrom: 'Delhi', travelAccommodationType: 'Triple Sharing', duration: '7 Days', pricePerPerson: '₹18,500' },
];