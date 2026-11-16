import { useCartStore } from "../store/useCartStore";
import PageHeader from "../components/layout/PageHeader";
import CartCard from "../components/features/CartCard";
import styles from "../components/features/CartSlideOut.module.css";

function CartSummary() {
  // Get state and functions from Zustand store
  const cartItems = useCartStore((state) => state.cartItems);
  const getSubtotal =  useCartStore((state) => state.getSubtotal);

  const subTotal = getSubtotal()

  const isSubscribed = true //user?.isSubcribed

  const isCartEmpty = cartItems.length === 0;

  function calculateDiscount(subTotal, isSubscribed) {
    if (isSubscribed) {
      return subTotal * 0.15;
    } else{
      return 0
    }
  }
  const discount = calculateDiscount(subTotal, isSubscribed);
  
  function calculateDeliveryFee(subTotal){
    if(subTotal >= 70){
      return 0
    } else {
      return 12.95
    }
  }
  const deliveryFee = calculateDeliveryFee(subTotal);

  const total = subTotal - discount + deliveryFee;

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity, 0
  );

  return (
    <>
      <PageHeader
        title="Shopping Bag"
        description="You'll be able to select delivery or click & collect once you proceed to checkout"
        link={{
          to: "/shop",
          label: "Continue Shopping",
        }}
      />

      <section className={styles.cart}>
        <div>
          <h2>Your Items {`(${totalItems} item)`}</h2>
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
        </div>

        <div>
          <h2>Order Summary</h2>
          <p>Subtotal: {subTotal.toFixed(2)}</p>
          <p>{discount > 0 && (<span>Discount: -${discount.toFixed(2)}</span>)}</p>
          <p>Estimated Shipping: {deliveryFee === 0 ? "FREE" : `$${deliveryFee.toFixed(2)}`}</p>
          <p>Total :{total.toFixed(2)}</p>
          <button>GO TO CHECKOUT</button>
        </div>
  
      </section>
    </>
  );
}

export default CartSummary;
