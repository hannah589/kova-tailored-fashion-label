import { NavLink, useNavigate } from "react-router-dom";
import { useCartStore } from "../../store/useCartStore";
//import { useAuthStore } from '../../store/useAuthStore'
import { useAuth } from "../../contexts/AuthContext";
import {
  LuSearch,
  LuHeart,
  LuShoppingBag,
  LuCircleUserRound,
} from "react-icons/lu";
import styles from "./Header.module.css";
import PromoBanner from "../features/PromoBanner";

function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/");
  }

  //grab out what zustand state and function you need to use
  const cartItems = useCartStore((state) => state.cartItems);
  //if use SlideOut. Add onClick={openCart} to the button
  //const openCart = useCartStore((state) => state.openCart);

  //calculate the total item count for the badge bubble
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <PromoBanner />
      <header className={styles.header}>
        <nav className={styles.nav}>
          <ul>
            <li>
              <NavLink
                to="/shop/new"
                className={({ isActive, isPending }) =>
                  isPending ? "pending" : isActive ? "active" : ""
                }
              >
                <h6>New</h6>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/shop/womens"
                className={({ isActive, isPending }) =>
                  isPending ? "pending" : isActive ? "active" : ""
                }
              >
                <h6>Women</h6>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/shop/mens"
                className={({ isActive, isPending }) =>
                  isPending ? "pending" : isActive ? "active" : ""
                }
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
                  isPending ? "pending" : isActive ? "active" : ""
                }
              >
                <h6>Sale</h6>
              </NavLink>
            </li>
          </ul>
        </nav>

        <div className={styles.logo}>
          <NavLink to="/">AURA</NavLink>
        </div>

        <div className={styles.icons}>
          <button>
            <LuSearch size={24} />
          </button>

          {user ? (
            <>
              <NavLink to="/profile">Profile</NavLink>

              <button onClick={handleLogout}>Logout</button>

              <NavLink to="/admin">
                <div className={styles.icon}>Admin Dashboard</div>
              </NavLink>
            </>
          ) : (
            <>
              <NavLink to="/signin">
                  <LuCircleUserRound size={24} />
              </NavLink>
            </>
          )}

          <NavLink to="/wishlist">
            <LuHeart size={24} />
          </NavLink>
          {/* Click triggers Zustand state update anywhere in the app */}
          <NavLink to="/cart" className={styles.cart}>
            {/*<button className={styles.cart}>*/}
            <LuShoppingBag size={24} />
            <span>{totalItems}</span>
            {/*</button>*/}
          </NavLink>
        </div>
      </header>
    </>
  );
}

export default Header;
