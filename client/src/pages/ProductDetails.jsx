//import useParams to read URL parameters to get the id value
import { useParams } from "react-router-dom";
import { useCartStore } from "../store/useCartStore";
//import api function 
import { getProductById } from "../api/products";
// useEffect to run code when the page loads and use state to store the product data
import { useEffect, useState } from "react";
//import link to navigate to another page
import styles from './ProductDetails.module.css'
import Button from "../components/common/Button";

function ProductDetails() {
  //get the product id from the URL
  const { id } = useParams();

  //create state to store the product data
  const [product, setProduct] = useState();
  
  //useEffect to run when the page loads
    useEffect(() => {
      //create an async function because we need to wait for the product data to come back from the API.
      async function fetchProduct(){
        // Call the getProductById function from our API file. // Pass the ID from the URL so we know which product to get.
        const data = await getProductById(id);
        // Store the returned product data in state.
        setProduct(data);
      }
      // Run the function to get the product.
      fetchProduct();
    },[id])
    // Run the effect when the "id" changes. This means a different product URL will load a different product.

     const addToCart = useCartStore((state) => state.addToCart);

  return (
    <>
      <section className={styles.product_details}>
        <div className={styles.img_container}>
          <div className='img_box'>
            <img
              src={product?.image || "https://blocks.astratic.com/img/general-img-landscape.png"}
              alt={product?.name}
              loading="lazy"
            />
          </div>
        </div>
        
        <div className={styles.product_content}>
          <h1>{product?.name}</h1>
          <p>${product?.price}</p>
          <p><span>Color:</span> {product?.size}</p>
          <p><span>Size:</span> {product?.color}</p>
          <Button onClick={()=> addToCart(product)}>ADD TO CART </Button>

          <p>{product?.description}</p>
        </div>
      </section>
      
    </>
  )
}

export default ProductDetails
