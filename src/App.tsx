import React from "react";
import ArticlesList from "./components/ArticlesList";
import Footer from "./components/Footer";
import Header from "./components/Header";

function App() {  
  return (
    <div>
      <Header />

      <ArticlesList />

      <Footer />
    </div>
  );
}

export default App;