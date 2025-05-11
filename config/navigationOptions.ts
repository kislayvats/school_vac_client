import {
  Bars3Icon,
  CalendarIcon,
  ChartPieIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

export const navigation = [
  { name: "Dashboard", href: "/", icon: HomeIcon, current: true },
  { name: "Students", href: "/students", icon: UsersIcon, current: false },
  { name: "Vaccination", href: "/vaccination/all", icon: FolderIcon, current: false },
  { name: "Calendar", href: "/calendar", icon: CalendarIcon, current: false },
  { name: "Documents", href: "/documents", icon: DocumentDuplicateIcon, current: false },
  { name: "Reports", href: "/reports", icon: ChartPieIcon, current: false },
];
export const teams = [

];