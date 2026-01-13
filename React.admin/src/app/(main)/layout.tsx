'use client';
import { NavActionProvider } from "@/components/NavActionProvider";
import SideBar from "@/components/ui/SideBar";
import TopBar from "@/components/ui/TopBar";
import { Box } from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sideRef = useRef<HTMLDivElement>(null);
  const [sideWidth, setSideWidth] = useState(0);
  useEffect(() => {
    const updateWidth = () => {
      if (sideRef.current) {
        if (sideRef.current) {
          setSideWidth(sideRef.current.offsetWidth);
        }
      }
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);

    return () => {
      window.removeEventListener('resize', updateWidth);
    };
  }, []);

  const handleSidebarWidthChange = useCallback((width: number) => {
    setSideWidth(width);
  }, []);

  return (
    <NavActionProvider>
      <div className="flex relative min-h-dvh">
        <aside ref={sideRef} style={{zIndex:11}}>
          <SideBar onWidthChange={handleSidebarWidthChange} />
        </aside>
        <Box component={"main"} sx={{maxWidth: {sm: `calc(100% - ${sideWidth}px)`}}} className="w-full">
          <TopBar leftOffset={sideWidth} />
          <Box display={'flex'} flexDirection={"column"} minHeight='calc(100dvh - 55px)'>{children} </Box>
        </Box>
      </div>
    </NavActionProvider>
  );
}
