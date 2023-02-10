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
      <a href="https://github.com/anthonydu/anthonydu.com-react" onMouseOver={handleMouseOver}>Est.&nbsp;July&nbsp;2021&nbsp;&middot;&nbsp;&copy;&nbsp;2023&nbsp;Anthony&nbsp;Du&nbsp;♥️ Scaffolded&nbsp;with&nbsp;Vite&nbsp;⚡</a>
      <div id="tooltip" style={{ top: `${top}px`, left: `${left}px` }}>View&nbsp;GitHub&nbsp;Repository</div>
    </footer>
  );
}

export default Footer;