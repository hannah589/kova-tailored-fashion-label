import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getAllProducts } from '../api/products'
import Button from "../components/common/Button"
import ProductCard from '../components/features/ProductCard'
import HeroSection from '../components/features/HeroSection'
import Container from '../components/common/Container'
import styles from './Home.module.css'

function Home() {

  //State to hold all product data 
  const [productsList, setProductsList] = useState([]);

  //mount products from api, when page mounts
  useEffect(()=>{
    async function fetchAllProducts(){
      const data = await getAllProducts();
      setProductsList(data);
    }
    fetchAllProducts();
  },[])

  return (
    <>
      <HeroSection 
        subtitle="Release two"
        title="Spring Summer 2026"
        bgImage="https://friendswithfrank.com/cdn/shop/files/SS26_Release_Two_Homepage.jpg?v=1788747787&width=2400"
      /> 

      <section className="New Arrivals">
        <div className="section-heading">
          <span>NEW ARRIVALS</span>
          <h2>Spring Summer 26</h2>
        </div>
        <Container>
          {/*Map through products state/array */}
          {productsList.map((p)=>(
            <Link  
              to={`/products/${productsList.id}`}
              key={p.id}
              className="link"
            >
              <ProductCard 
                image={p.image}
                name={p.name}
                price={p.price}
              />
            </Link>
          ))}
        </Container>
        <Link to="/shop">
          <Button>View All Products</Button>
        </Link>
      </section>

      <div className={styles.shopWomensOrMens}>
        <Link to="/shop/womens">
          <div className="img_box">
            <img
              src="https://blocks.astratic.com/img/general-img-landscape.png"
              alt="women's clothing"
              loading="lazy"
            />
            <Button className='btn'>Shop Womens</Button>
          </div>
        </Link>
        <Link to="/shop/mens">
          <div className="img_box">
            <img
              src="https://blocks.astratic.com/img/general-img-landscape.png"
              alt="women's clothing"
              loading="lazy"
            />
            <Button className='btn'>Shop Mens</Button>
          </div>
        </Link>
      </div>

       <div className="section-heading">
          <h2 style={{paddingBottom: "1em"}}>Follow Us</h2>
          <p>Shop your favourite styles from Instagram  
            <a
              href="https://www.instagram.com/clothes"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              style={{paddingLeft: "8px"}}
            >
               @auralabel
            </a>
          </p>
      </div>


    </>
  )
}

export default Home