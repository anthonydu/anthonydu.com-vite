import React, { useState, useEffect, useRef } from "react";
import "./navBar.scss";
import cssVars from "../_variables.module.scss";

const NavBar = () => {
  const [menuPressed, setMenuPressed] = useState(false);
  const [navHeight, setNavHeight] = useState(cssVars.navHeight);
  const [rectLeft, setRectLeft] = useState(0);
  const [rectWidth, setRectWidth] = useState(0);
  const rectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // reset navHeight when interacting with main
    const resetNav = () => {
      setNavHeight(cssVars.navHeight);
      setMenuPressed(false);
    }
    document.getElementsByTagName("main")[0].addEventListener("wheel", resetNav);
    document.getElementsByTagName("main")[0].addEventListener("mousedown", resetNav);
    document.getElementsByTagName("main")[0].addEventListener("touchstart", resetNav);

    // reset navHeight when window exceeds mobileBreakpoint
    const handleResize = () => {
      if (window.innerWidth > parseInt(cssVars.mobileBreakpoint)) {
        resetNav();
        setRect();
      }
    }
    window.addEventListener("resize", handleResize);

    // handle nav indicatior (rect)
    const getRectWidth = (currentSection: number, navItemWidth: number) => {
      const snapDistance = 1 - Math.abs(0.5 - currentSection%1) * 2;
      const allLinks = document.querySelectorAll(".nav-item a");
      const nthLink = Math.round(currentSection) + 1;
      return allLinks[nthLink].clientWidth + navItemWidth * 0.5 * snapDistance;
    }
    const getRectLeft = (currentSection: number, navItemWidth: number) => {
      let nthItem = 0;
      const rectWidth = rectRef.current!.clientWidth;
      const centerOfItem = (navItemWidth - rectWidth) * 0.5;
      if (window.innerWidth > parseInt(cssVars.tabletBreakpoint)) nthItem = 2 + currentSection;
      else if (window.innerWidth > parseInt(cssVars.mobileBreakpoint)) nthItem = 1 + currentSection;
      return navItemWidth * nthItem + centerOfItem;
    }
    const setRect = () => {
      const scrollY = document.documentElement.scrollTop;
      const mainHeight = document.getElementsByTagName("main")[0].clientHeight;
      const currentSection = scrollY / mainHeight;
      const navItemWidth = document.getElementsByClassName("nav-item")[0].clientWidth;
      setRectWidth(getRectWidth(currentSection, navItemWidth));
      setRectLeft(getRectLeft(currentSection, navItemWidth));
    }
    setRect();
    document.addEventListener("scroll", setRect);
  });

  const handleClick = () => {
    if (window.innerWidth > parseInt(cssVars.mobileBreakpoint)) return;
    setNavHeight(`calc(${navHeight} ${menuPressed ? "/" : "*"} 5)`); 
    setMenuPressed(!menuPressed);
  }

  return (
    <nav className="NavBar" style={{ height: navHeight }}> 
      <div id="nav-menu" onClick={handleClick}>
        <svg viewBox="0 0 92.833 92.833"><path d="M89.834,1.75H3c-1.654,0-3,1.346-3,3v13.334c0,1.654,1.346,3,3,3h86.833c1.653,0,3-1.346,3-3V4.75 C92.834,3.096,91.488,1.75,89.834,1.75z M89.834,36.75H3c-1.654,0-3,1.346-3,3v13.334c0,1.654,1.346,3,3,3h86.833c1.653,0,3-1.346,3-3V39.75 C92.834,38.096,91.488,36.75,89.834,36.75z M89.834,71.75H3c-1.654,0-3,1.346-3,3v13.334c0,1.654,1.346,3,3,3h86.833c1.653,0,3-1.346,3-3V74.75 C92.834,73.095,91.488,71.75,89.834,71.75z" /></svg>
      </div>
      <div className="nav-item" id="nav-logo">
        <a href="/"><b>Anthony Du</b></a>
      </div>
      <div className="nav-spacer"></div>
      <div className="nav-item" onClick={handleClick}><a href="#Home">Home</a></div>
      <div className="nav-item" onClick={handleClick}><a href="#About">About</a></div>
      <div className="nav-item" onClick={handleClick}><a href="#Contact">Contact</a></div>
      <div className="nav-spacer"></div>
      <div className="nav-item" id="nav-icons">
        <div>
          <a href="https://www.flickr.com/people/196183743@N05/" target="_blank" rel="noreferrer"><svg viewBox="0 0 1024 1024"><path d="M548.945 280.496C548.945 407.794 655.304 511.014 786.493 511.014C917.661 511.014 1024 407.794 1024 280.496C1024 153.198 917.661 50 786.493 50C655.304 50 548.945 153.198 548.945 280.496ZM0 280.496C0 407.794 106.337 511.014 237.526 511.014C368.715 511.014 475.052 407.794 475.052 280.496C475.052 153.198 368.715 50 237.526 50C106.337 50 0 153.198 0 280.496Z"/><path d="M41.0085 797.051L0 797.051L0 746.563L42.1674 746.563L42.1674 733.745C42.1674 671.64 70.4079 650 126.113 650C141.204 650 152.81 652.403 161.705 654.009L157.454 703.693C151.653 701.687 145.848 700.486 135.406 700.486C117.612 700.486 110.648 713.308 110.648 733.745L110.648 746.565L160.163 746.565L160.163 797.053L110.646 797.053L110.646 955.318L41.0064 955.318L41.0064 797.051L41.0085 797.051ZM196.52 654.81L266.154 654.81L266.154 955.313L196.52 955.313L196.52 654.81ZM325.727 659.619L395.36 659.619L395.36 712.507L325.727 712.507L325.727 659.619ZM325.727 746.563L395.36 746.563L395.36 955.313L325.727 955.313L325.727 746.563ZM604.649 806.262C591.882 798.252 579.116 794.645 562.48 794.645C532.304 794.645 509.091 816.281 509.091 852.343C509.091 885.602 536.176 907.236 566.346 907.236C582.209 907.236 598.072 903.63 609.675 897.218L611.222 950.91C593.812 956.923 572.924 960.126 554.355 960.126C487.813 960.126 437.137 920.061 437.137 851.142C437.137 781.824 487.813 741.757 554.355 741.757C575.246 741.757 593.81 745.362 609.675 753.375L604.649 806.262ZM640.243 654.81L709.875 654.81L709.875 834.313L710.647 834.313L768.676 746.563L844.886 746.563L774.865 842.325L850.691 955.315L766.354 955.315L710.649 851.942L709.875 851.942L709.875 955.315L640.243 955.315L640.243 654.81ZM1020.52 804.258C1012.77 801.86 1005.04 801.86 996.915 801.86C964.425 801.86 946.239 826.299 946.239 867.168L946.239 955.315L876.607 955.315L876.607 746.56L940.051 746.56L940.051 785.029L940.825 785.029C952.814 758.584 970.224 741.757 1000.4 741.757C1008.52 741.757 1017.03 742.956 1024 744.157L1020.52 804.258Z"/></svg></a>
          <a href="https://anthdu.wixsite.com/gallery" target="_blank" rel="noreferrer"><svg viewBox="0 0 1280 1024"><path d="M786.76 263.38c0 26.06 4.16 65.38-57.36 87.66-19.04 6.9-31.9 19.32-31.9 19.32 0-62 9.44-84.44 34.8-97.72 19.5-10.22 54.46-9.26 54.46-9.26z m-231.6 71.08l-68.48 265.32-56.96-217.14c-15.38-63.98-41.62-97.06-96.86-97.06-54.74 0-81.32 32.36-96.86 97.06L179.04 599.78 110.56 334.46C99.46 281.02 47.72 257.92 0 263.92l131.14 495.86s43.26 3.12 64.92-7.92c28.44-14.5 41.96-25.68 59.18-93.14 15.34-60.14 58.22-236.82 62.24-249.4 9.52-29.88 22.18-27.62 30.8 0 3.94 12.6 46.9 189.26 62.24 249.4 17.2 67.46 30.74 78.64 59.18 93.14 21.64 11.04 64.92 7.92 64.92 7.92l131.14-495.86c-48.84-6.14-99.64 17.86-110.6 70.54z m231.56 10.42s-8.2 12.68-26.92 23.14c-12.02 6.72-23.56 11.28-35.94 17.22-30.28 14.52-26.36 27.9-26.36 70.4v304.14s33.1 4.18 54.74-6.86c27.86-14.2 34.26-27.9 34.52-89.56V362.82l-0.04 0.02v-17.96z m326.88 168.16L1280 265.56s-70.22-11.96-105 19.7c-26.6 24.2-48.82 59.1-108.36 144.94-0.94 1.46-12.5 21.08-26.14 0-58.58-84.46-81.6-120.58-108.36-144.94-34.78-31.66-105-19.7-105-19.7l166.4 247.48-165.94 246.72s73.14 9.24 107.9-22.42c22.98-20.92 35.16-40.74 105.02-141.44 13.62-21.04 25.14-1.54 26.14 0 58.8 84.76 78.46 116.12 106.28 141.44 34.78 31.66 106.64 22.42 106.64 22.42L1113.6 513.04z"/></svg></a>
          <a href="https://github.com/anthonydu" target="_blank" rel="noreferrer"><svg viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg></a>
          <a href="https://www.linkedin.com/in/antdu/" target="_blank" rel="noreferrer"><svg viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg></a>
          <a href="https://www.youtube.com/@antdu" target="_blank" rel="noreferrer"><svg viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg></a>
        </div>
      </div>
      <div id="rect" ref={rectRef} style={{ left: `${rectLeft}px`, width: `${rectWidth}px` }} />
    </nav>
  );
}

export default NavBar;