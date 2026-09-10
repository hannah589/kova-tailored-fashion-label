import { NavLink } from 'react-router-dom';
import { IoMdHeartEmpty } from "react-icons/io";
import { LiaShoppingBagSolid } from "react-icons/lia";
import styles from "./Header.module.css";

function Header() {
  return (
    <>
      <NavLink to="/">
        <img
          src="https://store.manutd.com/img/logo-trident.svg"
          alt="logo"
          className='logo'
        />
      </NavLink>

      <nav>
        <ul>
          <li>
            <NavLink 
              to="/women"
              className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "active" : "" }
            >
             WOMEN
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/men"
              className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "active" : "" }
            >
              MEN
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/brands"
              className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "active" : "" }
            >
              BRANDS
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/accessories"
              className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "active" : "" }
            >
              SALE
            </NavLink>
          </li>
        </ul>
      </nav>

      <div className={styles.icons}>
        <NavLink to="/signup">JOIN</NavLink>
        <NavLink to="/login">SIGN IN</NavLink>
        <NavLink to='/wishlist'>
          <IoMdHeartEmpty size={24}/>
        </NavLink>
        <NavLink to='/cart'>
          <LiaShoppingBagSolid size={24} className='icon'/>
        </NavLink>
      </div>
      
    </>
  )
};

export default Header
