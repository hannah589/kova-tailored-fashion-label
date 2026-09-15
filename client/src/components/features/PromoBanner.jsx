import { useEffect, useState } from "react"; 
import { Link } from "react-router-dom"; 
import styles from "./PromoBanner.module.css";

const banners = [ 
  { 
    text: "Free Shipping On Orders Over $100", 
    link: "/returns", 
  }, 
  { 
    text: "Click & Collect Now Available", 
    link: "/products?filter=sale", 
  },
  { 
    text: "Shop Sale",
    link: "/shop?filter=sale"
  }, 
];

function PromoBanner() {
  const [current, setCurrent] = useState(0); 
  
  useEffect(() => { 
    const timer = setInterval(() => { 
      setCurrent((prev) => (prev + 1) % banners.length); }, 5000); //5secs
      
      return () => clearInterval(timer); 
  }, []); 
  
  const banner = banners[current];

  return (
    <div className={styles.banner}>
      <Link to={banner.link}> 
        {banner.text} 
      </Link>
    </div>
  )
}

export default PromoBanner
