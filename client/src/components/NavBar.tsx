import React, { useState } from "react";

interface NavBarProps {
  openAddRecipeFrom(): void;
  openLandingPage(): void;
}

function NavBar(props: NavBarProps) {
  const [isMobile, setIsMobile] = useState(false);
  const handleClick = () => setIsMobile(!isMobile);
  const closeMobileMenu = () => setIsMobile(false);

  const selectAddRecipe = () => {
    props.openAddRecipeFrom();
    closeMobileMenu();
  };
  const retuntToHome = () => {
    props.openLandingPage();
    closeMobileMenu();
  };

  return (
    <div className="nav-bar">
      <div className="nav-container">
        <div className="logo-container">
          <div className="logo" onClick={retuntToHome}></div>
        </div>

        <ul className={isMobile ? "nav-tab is-mobile" : "nav-tab"}>
          <li className="tab" onClick={selectAddRecipe}>
            Add recipe
          </li>
          <li className="tab" onClick={closeMobileMenu}>
            Simple 1
          </li>
          <li className="tab" onClick={closeMobileMenu}>
            Simple 2
          </li>
          <li className="tab" onClick={closeMobileMenu}>
            Simple
          </li>
        </ul>
      </div>
      <div className="mobile-menu" onClick={handleClick}>
        {isMobile ? (
          <div className="hamburger close">
            <div className="close bar1 "></div>
            <div className="close bar2 "></div>
            <div className="close bar3 "></div>
          </div>
        ) : (
          <div className="hamburger">
            <div className="bar1"></div>
            <div className="bar2"></div>
            <div className="bar3"></div>
          </div>
        )}
      </div>
    </div>
  );
}

export default NavBar;
