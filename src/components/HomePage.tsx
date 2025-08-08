import React from "react";
import Header from "./Header";
import ContentComponent from "./Content";
import Footer from "./Footer";

const HomePage: React.FC = () => {
  return (
    <div>
      <Header />
      <ContentComponent />
      <Footer />
    </div>
  );
};

export default HomePage;
