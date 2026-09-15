import { NavLink } from 'react-router-dom';
import { LuSearch, LuHeart, LuShoppingBag, LuCircleUserRound } from "react-icons/lu";
import styles from "./Header.module.css";
//import PromoBanner from '../features/PromoBanner';

function Header() {
  return (
    <>
      {/* <PromoBanner /> */}
      <header className={styles.header}>
        <nav className={styles.nav}>
          <ul>
            <li>
              <NavLink 
                to="/shop/new"
                className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "active" : "" }
              >
                <h6>New</h6> 
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/shop/womens"
                className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "active" : "" }
              >
                <h6>Women</h6>
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/shop/mens"
                className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "active" : "" }
              >
                <h6>Men</h6>
              </NavLink>
            </li>
            {/*
            <li>
              <NavLink 
                to="/brands"
                className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "active" : "" }
              >
                <h6>Brand</h6>
              </NavLink>
            </li>
            */}
            <li>
              <NavLink 
                to="/shop/sale"
                className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "active" : "" }
              >
                <h6>Sale</h6>
              </NavLink>
            </li>
          </ul>
        </nav>

        <div className={styles.logo}>
          <NavLink to="/">
            AURA
          </NavLink>
        </div>

        <div className={styles.icons}>
          <button>
            <LuSearch size={24} />
          </button>
          <NavLink to="/signup">
            <div className={styles.icon}>
              <LuCircleUserRound size={24} />
            </div>
          </NavLink>
          <NavLink to='/wishlist'>
            <LuHeart size={24} />
          </NavLink>
          <NavLink to='/cart'>
            <LuShoppingBag size={24} />
          </NavLink>
        </div>
      </header>
    </>
  )
};

export default Header
