import React, { useState, useEffect, useRef, useContext } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import "../assets/styles/Header.css";
import searchIcon from "../assets/images/search.svg";
import logo from "../assets/images/logo.svg";
import menuIcon from "../assets/images/menu-icon.svg";
import submenuIcon from "../assets/images/submenu-icon.svg";
import menuData from "../assets/data/menu.json";
import { SearchContext } from "../context/SearchContext";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [hideHeader, setHideHeader] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);
  const searchInputRef = useRef(null);
  const { searchQuery, setSearchQuery } = useContext(SearchContext);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPosition = window.pageYOffset;

      if (currentScrollPosition > 200) {
        if (currentScrollPosition > scrollPosition) {
          // Scrolling down
          setHideHeader(true);
        } else {
          // Scrolling up
          setHideHeader(false);
        }
      } else {
        // At the top of the page
        setHideHeader(false);
      }

      setScrollPosition(currentScrollPosition);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollPosition]);

  useEffect(() => {
    if (searchVisible && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchVisible]);

  const handleSearchClick = () => {
    setSearchVisible(true);
  };

  const handleSearchBlur = () => {
    setSearchVisible(false);
  };

  const handleSearchKeyPress = (event) => {
    if (event.key === 'Enter') {
      setSearchVisible(false);
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const handleOverlayClick = () => {
    setMenuOpen(false);
  };

  const renderMenu = (menu) => {
    return menu.map((item, index) => (
      <li key={index} className={item.submenu ? "dropdown" : ""}>
        <a href={item.link}>
          {item.title}
          {item.submenu && <img src={menuIcon} alt="Menu Icon" className="menu-icon" />}
        </a>
        {item.submenu && (
          <ul className="dropdown-menu">
            {item.submenu.map((subItem, subIndex) => (
              <li key={subIndex}>
                <a href={subItem.link} className="submenu-item">
                  <span>{subItem.title}</span>
                  {item.submenuIcon && <img src={submenuIcon} alt="Submenu Icon" className="submenu-icon" />}
                </a>
              </li>
            ))}
          </ul>
        )}
      </li>
    ));
  };

  return (
    <header className={`header ${hideHeader ? "hide" : ""}`}>
      <div className="header-top">
        <div className="mobile-menu-icon" onClick={handleMenuToggle}>
          {menuOpen ? <FiX /> : <FiMenu />}
        </div>
        <div className="logo">
          <img src={logo} alt="Logo" />
        </div>
        {searchVisible ? (
          <input
            type="text"
            className="search-input"
            ref={searchInputRef}
            value={searchQuery}
            onChange={handleSearchChange}
            onBlur={handleSearchBlur}
            onKeyPress={handleSearchKeyPress}
          />
        ) : (
          <button className="search-button" onClick={handleSearchClick}>
            <img src={searchIcon} alt="Search" />
          </button>
        )}
      </div>
      <div className="header-bottom">
        <nav className="desktop-menu">
          <ul>
            {renderMenu(menuData.menu)}
          </ul>
        </nav>
      </div>
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <div className="mobile-menu-header">
          <div className="logo">
            <img src={logo} alt="Logo" />
          </div>
          <div className="mobile-menu-icon" onClick={handleMenuToggle}>
            <FiX />
          </div>
        </div>
        <ul>
          {renderMenu(menuData.menu)}
        </ul>
      </div>
      {menuOpen && <div className="overlay show" onClick={handleOverlayClick}></div>}
    </header>
  );
};

export default Header;