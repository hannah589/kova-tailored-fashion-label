import { useCartStore } from "../../store/useCartStore";
import { Link } from "react-router-dom";
import { LuX } from "react-icons/lu";
import CartCard from "./CartCard";
import Button from "../common/Button";
import styles from "./CartSlideOut.module.css";

export default function SlideOut() {
  // Get state and functions from Zustand store
  const cartItems = useCartStore((state) => state.cartItems);
  const isOpen = useCartStore((state) => state.isCartOpen);
  const closeCart = useCartStore((state) => state.closeCart);
  const getSubtotal =  useCartStore((state) => state.getSubtotal);

  const isCartEmpty = cartItems.length === 0;

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <>
      {/* Backdrop */}
      <div
        className={`${styles.backdrop} ${isOpen ? styles.backdropOpen : ""}`}
        onClick={closeCart}
      />

      {/* Slide-out cart */}
      <div className={`${styles.panel} ${isOpen ? styles.panelOpen : ""}`}>
        <div className={styles.content}>
          <div className={styles.header}>
            <h4>CART</h4>
            <button onClick={closeCart} className={styles.closeBtn}>
              <LuX />
            </button>
          </div>

          <div className={styles.itemList}>
            {isCartEmpty ? (
              <p>Your cart is empty.</p>
            ) : (
              cartItems.map((item) => (
                <CartCard
                  key={item.id}
                  image={item.image}
                  id={item.id}
                  name={item.name}
                  price={item.price}
                  quantity={item.quantity}
                />
              ))
            )}
          </div>

          {/* Dynamic Footer */}
          <div className={styles.cartFooter}>
            {!isCartEmpty && (
              <div className={styles.totalRow}>
                <span>Total: {`(${totalItems} item)`}</span>

                <strong>${getSubtotal().toFixed(2)}</strong>
              </div>
            )}

            {isCartEmpty ? (
              <Link to="/shop" onClick={closeCart}>
                <Button>Start Shopping</Button>
              </Link>
            ) : (
              <Link to="/cart" onClick={closeCart}>
                <Button>Proceed to Checkout</Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
