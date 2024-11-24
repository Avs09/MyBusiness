import React, { useState } from "react";
import Header from "./components/header";
import Footer from "./components/footer";
import Home from "./components/home";
import Login from "./components/login";
import Register from "./components/register";
import "./styles/app.css";

function App() {
  const [currentPage, setCurrentPage] = useState("home");

  const renderContent = () => {
    switch (currentPage) {
      case "register":
        return <Register />;
      case "home":
      default:
        return <Home />;
      case "login":
        return <Login />;
    }
  };

  return (
    <div className="App">
      <Header setCurrentPage={setCurrentPage} />
      <main className="content">{renderContent()}</main>
      <Footer />
    </div>
  );
}

export default App;
