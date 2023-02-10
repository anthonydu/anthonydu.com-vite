import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import "./container.scss";

const Container = (props: { header: string, children: React.ReactNode[] }) => {
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const [shadow, setShadow] = useState("");
  const [scaleClass, setScaleClass] = useState("");
  // In React, style={ scale: scale } uses transform: scale(), 
  // which does not work with CSS transition: scale <duration>;

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const scrollTop = document.documentElement.scrollTop;
      const parentHeight = containerRef.current!.parentElement!.clientHeight;
      const parallaxY = windowHeight - scrollTop / parentHeight * windowHeight;
      setTranslate({ x: 0, y: parallaxY });
      // For some reason, if x is not set, the animation breaks
    }
    document.addEventListener("scroll", handleScroll);

    if (translate.x !== 0 || translate.y !== 0) {
      if (scaleClass !== "scale-102") {
        setShadow("0 0 100px 10px rgba(112, 20, 210, .5)");
        setScaleClass("scale-102");
      }
    } else {
      if (scaleClass !== "scale-100") {
        setShadow("0 0 100px 10px rgba(112, 20, 210, 0)");
        setScaleClass("scale-100");
      }
    }
  });

  const handleHover = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const containerRef = (e.currentTarget! as HTMLDivElement);
    const targetLeft = containerRef.getBoundingClientRect().left;
    const targetTop = containerRef.getBoundingClientRect().top;
    const halfWidth = (containerRef.getBoundingClientRect().right - targetLeft) / 2;
    const halfHeight = (containerRef.getBoundingClientRect().bottom - targetTop) / 2;
    const centerOffsetX = e.clientX - targetLeft - halfWidth;
    const centerOffsetY = e.clientY - targetTop - halfHeight;
    const translateX = (centerOffsetX / halfWidth) * 10;
    const translateY = (centerOffsetY / halfHeight) * 10;
    setTranslate({ x: translateX, y: translateY });
  }

  const handleLeave = () => {
    setTranslate({ x: 0, y: 0 });
  }

  return (
    <motion.div 
      className={`Container ${scaleClass === null ? "" : scaleClass}`}
      ref={containerRef}
      onMouseMove={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => handleHover(e)}
      onMouseLeave={() => handleLeave()}
      animate={{ x: translate.x, y: translate.y }}
      style={{ boxShadow: shadow }}
      transition={{
        type: "spring",
        damping: 100,
        stiffness: 500
      }}
    >
      <div className="header">
        <h1>{props.header}</h1>
      </div>
      {props.children}
    </motion.div>
  );
}

export default Container;