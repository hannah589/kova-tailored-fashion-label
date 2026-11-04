import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";
import Header from "./Header";
import FilterSlideOut from "../features/FilterSlideOut";
import CartSlideOut from '../features/CartSlideOut';
import Footer from "./Footer"
//import styles from './Layout.module.css';

function Layout() {
  return (
    <div className="app-container">
      <Toaster
        position="top-center"
        duration={3000}
        richColors
        closeButton
      />
      <Header /> 
      <FilterSlideOut />
      <main>
        <Outlet /> 
      </main>
      <CartSlideOut />
      <Footer />
    </div>
  );
}

export default Layout