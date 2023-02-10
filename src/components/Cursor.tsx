import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./cursor.scss";

const Cursor = () => {
  const [coord, setCoord] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      setCoord({ x: e.clientX - 5, y: e.clientY - 5 });
    }
    document.addEventListener("mousemove", onMouseMove);

    document.querySelectorAll("a, button").forEach((a: Element) => {
      a.addEventListener("mouseover", () => setScale(2));
      a.addEventListener("mouseout", () => setScale(1));
    });
  });

  return (
    <motion.div 
      className="Cursor" 
      animate={{ left: coord.x, top: coord.y, scale: scale }}
    />
  );
}

export default Cursor;