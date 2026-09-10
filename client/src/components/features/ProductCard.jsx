import { useState } from "react"
import { IoIosHeartEmpty } from "react-icons/io";
import { IoIosHeart } from "react-icons/io";
import styles from './ProductCard.module.css'

function ProductCard({image, name, price}) {
     const [liked, setLiked] = useState(false);

    function handleFavourite() {
        setLiked(prev => !prev);
    }
  
  return (
    <div className={styles.productCard}>
      <button 
        className={styles.like_btn}
        onClick={handleFavourite}
      >
        {liked ? <IoIosHeartEmpty /> : <IoIosHeart />}
      </button>
      
      <div className={styles.img_box}>
          <img
            src={image || "/placeholder.jpg"}
            alt={name}
            loading="lazy"
          />
      </div>

      <div className="content">
        <p>{name}</p>
        <p>AUD ${Number(price).toFixed(2)}</p>
      </div>
    </div>
  )
}

export default ProductCard
