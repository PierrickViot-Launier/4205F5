import React from "react";
import MainHeader from "./MainHeader";
import NavLinks from "./NavLinks";

export default function MainNavigation() {
  return (
    <MainHeader>
      <nav>
        <NavLinks />
      </nav>
    </MainHeader>
  );
}
