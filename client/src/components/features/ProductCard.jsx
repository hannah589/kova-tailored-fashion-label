import { useState } from "react"
import { IoIosHeartEmpty } from "react-icons/io";
import { priceFormatter } from "../../utils/formatter";
//import { IoIosHeart } from "react-icons/io";
import styles from './ProductCard.module.css'

function ProductCard({image, name, price, salePrice}) {
  /*
    const [liked, setLiked] = useState(false);

    function handleFavourite() {
        setLiked(prev => !prev);
    }
  */
  return (
    <>
        <div className={styles.card}>
          {/*
          <button 
            className={styles.like_btn}
            onClick={handleFavourite}
          >
            {liked ? <IoIosHeartEmpty /> : <IoIosHeart />}
          </button>
          */}

          <div className={styles.img_box}>
              <img
                src={image || "https://blocks.astratic.com/img/general-img-landscape.png"}
                alt={name}
                loading="lazy"
              />
          </div>
        <div className={styles.product_card_content}>
          <p>{name}</p>
          <div className="flex gap-2">
            {
              salePrice > 0 ? 
                (
                  <div className="flex gap-2">
                    <p className="!line-through">{priceFormatter(price)}</p>
                    <p className="!text-red-500">{priceFormatter(salePrice)}</p>
                  </div>
                )
                :
                <p>{priceFormatter(price)}</p> 
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductCard
