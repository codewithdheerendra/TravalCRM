import React from "react";

// --- TYPE DEFINITION ---
// Defines the props for our UICard component.
// Props are optional ('?') so you don't have to provide them every time.
type CardInput = {
  children: React.ReactNode; // Use React.ReactNode to allow any valid React child
  border?: boolean;
  bgColor?: string;
  bgImage?: string;
  className?: string; // Allow passing extra CSS classes
};

// --- COMPONENT DEFINITION ---
const UICard = ({
  children,
  border,
  bgColor,
  bgImage,
  className = "",
}: CardInput) => {
  // --- STYLE LOGIC ---
  const cardStyles: React.CSSProperties = {
    width: "100%",
    height: "100%",
    borderRadius: "12px", // Rounded corners
    padding: "20px",
    position: "relative", // Needed for background image overlay
    overflow: "hidden", // Ensures content respects the border radius
  };

  // --- CONDITIONAL STYLING ---

  // 1. Background Color
  if (bgColor) {
    cardStyles.backgroundColor = bgColor;
  }

  // 2. Background Image
  if (bgImage) {
    cardStyles.backgroundImage = `url(${bgImage})`;
    cardStyles.backgroundSize = "cover";
    cardStyles.backgroundPosition = "center";
  }

  if (border) {
    cardStyles.border = "1px solid #e5e7eb"; // A light gray border
  } else if (!bgColor && !bgImage) {
    cardStyles.border = "1px solid #d1d5db"; // A default, slightly darker gray border
  }

  return (
    <div style={cardStyles} className={className}>
      {bgImage && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            zIndex: 1,
          }}
        ></div>
      )}
      <div style={{ position: "relative", zIndex: 2, height: "100%" }}>
        {children}
      </div>
    </div>
  );
};

export default UICard;
