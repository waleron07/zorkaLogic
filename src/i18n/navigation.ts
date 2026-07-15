import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

// Локале-осведомлённые обёртки над next/navigation
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
