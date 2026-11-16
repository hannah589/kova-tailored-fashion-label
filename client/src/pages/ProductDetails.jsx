//import useParams to read URL parameters to get the id value
import { useParams, useNavigate } from "react-router-dom";
import { useCartStore } from "../store/useCartStore";
import { useEffect, useState } from "react";
//import api function
//import { getProductById } from "../api/products";
import productAPI from "../api/productAPI";
import styles from "./ProductDetails.module.css";
import Button from "../components/common/Button";
import { priceFormatter } from "../utils/formatter";

function ProductDetails() {
  //get the product id from the URL
  const { id } = useParams();
  const navigate = useNavigate();

  //create state to store the individual product data
  const [product, setProduct] = useState();

  //get the addCartFunction from Zustand
  const addToCart = useCartStore((state) => state.addToCart);

  // Fetch the product when the page loads or ID changes
  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await productAPI.getProductById(id);
        setProduct(res.data);
      } catch (err) {
        console.log(err);

        // Navigate based on the HTTP error status
        if (err.response?.status === 404 || err.response?.status === 400) {
          navigate("/*");
        } else {
          navigate("/500");
        }
      }
    }
    fetchProduct();
  }, [id, navigate]);

  // Wait for the product to load
  if (!product) {
    return <p>Loading product...</p>;
  }

  /*
  //useEffect to fetch the product data when the page loads
  useEffect(() => {
    //create an async function because we need to wait for the product data to come back from the API.
    async function fetchProduct() {
      // Call the getProductById function from our API file. // Pass the ID from the URL so we know which product to get.
      const data = await getProductById(id);
      // Store the returned product data in state.
      setProduct(data);
    }
    // Run the function to get the product.
    fetchProduct();
  }, [id]);
  // Run the effect when the "id" changes. This means a different product URL will load a different product.
*/

  return (
    <>
      <section className={styles.product_details}>
        <div className={styles.img_container}>
          <div className="img_box">
            <img
              src={
                product?.image ||
                "https://blocks.astratic.com/img/general-img-landscape.png"
              }
              alt={product?.name}
              loading="lazy"
            />
          </div>
        </div>

        <div className={styles.product_content}>
          <h2>{product.name}</h2>
          <div className="flex gap-1">
            <p>
              {" "}
              {product.salePrice > 0 ? (
                <div className="flex gap-2">
                  <p className="!line-through">
                    {priceFormatter(product.price)}
                  </p>
                  <p className="!text-red-500">
                    {priceFormatter(product.salePrice)}
                  </p>
                </div>
              ) : (
                <p>{priceFormatter(product.price)}</p>
              )}
            </p>
          </div>
          <p>{product.description}</p>
          <p>
            <span>Color:</span> {product.size}
          </p>
          <p>
            <span>Size:</span> {product.color}
          </p>

          <Button onClick={() => addToCart(product)}>ADD TO CART </Button>
        </div>
      </section>
    </>
  );
}

export default ProductDetails;
