import React, { useState } from "react";
import {
  Header,
  HeaderName,
  HeaderGlobalBar,
  HeaderMenuButton,
  HeaderNavigation,
  HeaderMenuItem,
  SideNav,
  SideNavItems,
  SideNavMenuItem,
} from "@carbon/react";
import { useBasket } from "../contexts/BasketContext";

const AppHeader = () => {
  const [isSideNavExpanded, setIsSideNavExpanded] = useState(false);
  const { itemCount } = useBasket();

  const toggleSideNav = () => {
    setIsSideNavExpanded(!isSideNavExpanded);
  };

  const menuItems = [
    {
      name: "Films",
      href: "#",
    },
    {
      name: "People",
      href: "#",
    },
    {
      name: "Planets",
      href: "#",
    },
    {
      name: "Species",
      href: "#",
    },
    {
      name: "Starships",
      href: "#",
    },
    {
      name: "Vehicles",
      href: "#",
    },
  ];

  return (
    <>
      <Header aria-label="SWAPI API Test Header">
        <HeaderName href="./" prefix="">
          SWAPI API Test
        </HeaderName>

        <HeaderNavigation aria-label="Header Navigation">
          {menuItems.map((menuItem) => (
            <HeaderMenuItem key={menuItem.name} href={menuItem.href}>
              {menuItem.name}
            </HeaderMenuItem>
          ))}
        </HeaderNavigation>

        <HeaderGlobalBar>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              paddingRight: "20px",
              paddingTop: "16px",
            }}
          >
            <div>
              Basket: <span>{itemCount}</span> items
            </div>
          </div>
          <HeaderMenuButton
            aria-label="Header Menu Button"
            onClick={toggleSideNav}
            isActive={isSideNavExpanded}
          />
        </HeaderGlobalBar>
      </Header>

      <SideNav
        aria-label="SWAPI API Test SideNav"
        expanded={isSideNavExpanded}
        isPersistent={false}
        onOverlayClick={() => setIsSideNavExpanded(false)}
      >
        <SideNavItems>
          {menuItems.map((menuItem) => (
            <SideNavMenuItem key={menuItem.name} href={menuItem.href}>
              {menuItem.name}
            </SideNavMenuItem>
          ))}
        </SideNavItems>
      </SideNav>
    </>
  );
};

export default AppHeader;
