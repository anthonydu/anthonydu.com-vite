import React, { useState } from "react";
import "./footer.scss";

const Footer = () => {
  const [left, setLeft] = useState(0);
  const [top, setTop] = useState(0);

  const handleMouseOver = (event: React.MouseEvent) => {
    setLeft(event.clientX);
    setTop(event.clientY - 25);
  }

  return (
    <footer className="Footer">
      <a href="https://github.com/anthonydu/anthonydu.com-react" onMouseOver={handleMouseOver}>&#xA9;&nbsp;2023&nbsp;Anthony&nbsp;Du&nbsp;&#x2665;&#xFE0E;&nbsp;Scaffolded&nbsp;with&nbsp;Vite&nbsp;&#x26A1;&#xFE0E;</a>
      <div id="tooltip" style={{ top: `${top}px`, left: `${left}px` }}>View&nbsp;Source&nbsp;Code&nbsp;on&nbsp;GitHub</div>
    </footer>
  );
}

export default Footer;