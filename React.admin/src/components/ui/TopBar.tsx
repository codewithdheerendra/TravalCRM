"use client";

import { useNavAction } from "@/components/NavActionProvider"; // Adjust path as needed
import { IconButton } from "@mui/material";
import MenuOpenOutlinedIcon from "@mui/icons-material/MenuOpenOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { BiBell, BiUserCircle } from "react-icons/bi";
import { useEffect, useRef, useState } from "react";

const TopBar = ({ leftOffset }: {leftOffset: number}) => {
  const { toggleNav, open } = useNavAction();
  const navRef = useRef<HTMLElement | null>(null);
  const [navHeight, setNavHeight] = useState(0);

  useEffect(() => {
    const updateHeight = () => {
      if (navRef.current) {
        setNavHeight(navRef.current.offsetHeight);
      }
    };

    updateHeight(); // set initial height
    window.addEventListener('resize', updateHeight);

    return () => {
      window.removeEventListener('resize', updateHeight);
    };
  }, []);
  const navStyle = { left: 'auto', width: `calc(100% - ${leftOffset}px)` };

  return (
    <>
      <nav className="top-bar px-3 flex gap-1 items-center fixed top-0 z-10 backdrop-blur-2xl bg-white" ref={navRef} style={navStyle}>
        {open ? (
          <MenuOpenOutlinedIcon
            className="cursor-pointer"
            onClick={toggleNav}
          />
        ) : (
          <MenuOutlinedIcon className="cursor-pointer" onClick={toggleNav} />
        )}
        <span>Dashboard</span>
        <p className="flex ms-auto">
          <IconButton color="inherit" aria-label="Show notification">
            <BiBell />
          </IconButton>
          <IconButton color="inherit" aria-label="Show Profile">
            <BiUserCircle />
          </IconButton>
        </p>
      </nav>
      <span className="navSpacer w-full block" style={{ height: `${navHeight}px` }}></span>
    </>
  );
};

export default TopBar;
