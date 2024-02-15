import React from "react";

const MainCard = ({ className, children, onmouseover, style, onmouseout }) => {
  return (
    <section
      className={className}
      onMouseEnter={onmouseover}
      style={style}
      onMouseLeave={onmouseout}
    >
      {children}
    </section>
  );
};

export default MainCard;
