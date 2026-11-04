import { useCartStore } from '../../store/useCartStore';
import { LuTrash, LuPlus, LuMinus } from "react-icons/lu";
import styles from './CartCard.module.css'

function CartCard({id, image, name, price, quantity}) {
  const updateQuantity = useCartStore((state) => state.updateQuantity); 
  const removeFromCart = useCartStore((state) => state.removeFromCart); 

  return (   
    <div className={styles.cartItem}>
      <div className={styles.img_box}>
        <img
          src={image || "https://blocks.astratic.com/img/general-img-landscape.png"}
          alt={name}
          loading="lazy"
        />
      </div>

      <div className={styles.textContent}>
        <div>
          <h4>{name}</h4>
          <p>${price}</p>
        </div>
        {/* Quantity Controls */}
        <div className={styles.controls}>
          <button
            onClick={() =>
              updateQuantity(id, -1)
            }
          >
            <LuMinus />
          </button>

          <span>{quantity}</span>

          <button
            onClick={() =>
              updateQuantity(id, 1)
            }
          >
            <LuPlus />
          </button>

          <button
            onClick={() =>
              removeFromCart(id)
            }
            className={styles.deleteBtn}
          >
            <LuTrash />
          </button>
        </div>
      </div>
    </div>
  )
}

export default CartCard
