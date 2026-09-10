import { Outlet } from "react-router-dom";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer"

export default function Layout() {
  return (
    <div className="app-container">
      <Header /> 
      <main>
        <Outlet /> {/* Dynamic child pages render here */}
      </main>
      <Footer />
    </div>
  );
}