import React from "react";
import AddArticle from "./AddArticle";
import Search from "./Search";

function Header() {
  return (
    <header className="header">
      <div className="container">
        <div className="header__content">
          <AddArticle />

          <Search />
        </div>
      </div>
    </header>
  );
}

export default Header;
