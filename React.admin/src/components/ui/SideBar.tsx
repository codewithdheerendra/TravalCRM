"use client";

import { useRef, useEffect } from "react";
import { useNavAction } from "../NavActionProvider";
import useMediaQuery from "@mui/material/useMediaQuery";
import { NAV_ITEMS } from "@/lib/constants";
import { usePathname } from "next/navigation";
import Image from "next/image";
import SettingIcon from "~/public/images/icons/Setting.svg";
import LogoutIcon from "~/public/images/icons/Logout.svg";
import Link from "next/link";
import "./sidebar.css";
const END_NAV_ITEMS = [
  {
    label: "Setting",
    href: "/setting",
    icon: SettingIcon,
  },
  {
    label: "Logout",
    href: "/login",
    icon: LogoutIcon,
  },
];

type SideBarProps = {
  onWidthChange?: (width: number) => void;
};

const SideBar = ({ onWidthChange }: SideBarProps) => {
  const { open, closeNav } = useNavAction();
  const sidebarRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const pathname = usePathname();

  useEffect(() => {
    if (!open || !isMobile) {
      return;
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        closeNav();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, isMobile, closeNav]);

  useEffect(() => {
    if (sidebarRef.current && onWidthChange) {
      onWidthChange(!isMobile ? sidebarRef.current.parentElement?.offsetWidth || 0 : 0);
    }
  }, [isMobile, open, onWidthChange]);

  return (
    <div className={`h-dvh sticky top-0 z-12 ${open ? "nav--open" : ""}`}>
      {(isMobile && open) && <div className={`sidebarOverlay show`} onClick={closeNav} />}
      <div ref={sidebarRef} className={`sideBar ${open ? "show" : ""}`}>
        <div className="h-full flex flex-col gap-2">
          <Link href="/dashboard" className="flex justify-center mb-8 mt-4">
            {open ? (
              <Image
                src="/images/Logo.svg"
                alt="logo"
                width={116}
                height={36}
              />
            ) : (
              <Image
                src={"/images/LogoSmall.svg"}
                alt="logo"
                width={36}
                height={36}
                className="object-contain max-h-[36px]"
              />
            )}
          </Link>
          <div className="overflow-auto flex-1">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname.startsWith(item.href);

              return (
                <Link
                  href={item.href}
                  key={item.label}
                  title={item.label}
                  className={`sidebarItem font-medium ${isActive ? "text-white active" : "secondary-text"
                    } ${!open && 'mx-auto'}`}
                >
                  <span className={!open ? 'mx-auto' : ''}><item.icon size={20} /></span>
                  <span className={open ? "" : "sr-only"}>{item.label}</span>
                </Link>
              );
            })}
          </div>
          <div className="border border-gray-300 my-2 rounded-2xl flex flex-col items-center">
            {END_NAV_ITEMS.map((item) => {
              const isActive = pathname.startsWith(item.href);

              return (
                <a
                  href={item.href}
                  key={item.label}
                  className={`sidebarItem font-medium ${isActive ? "text-white" : "secondary-text"
                    }`}
                >
                  <item.icon className="text-inherit" />
                  <span className={open ? "" : "sr-only"}>{item.label}</span>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
