import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
//import { getProducts } from "../api/products";
//import Container from '../components/Container'
import ProductCard from '../components/features/ProductCard'


function Products() {

  /*
  const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      const data = await getProducts();
      setProducts(data);
    };

    loadProducts();
  }, []);
*/

  
  const [products, setProducts] = useState([
    {id:1, image:"https://cdn.media.amplience.net/i/ArsenalDirect/mkb1843_f?$pdpMainImage$", name:"Adidas 25/26 Training Shirt", price: 89.99 },
    {id:2, image:"https://cdn.media.amplience.net/i/ArsenalDirect/mkb1843_f?$pdpMainImage$", price: 79.99 },
    {id:3, image:"https://cdn.media.amplience.net/i/ArsenalDirect/mkb1843_f?$pdpMainImage$", price: 79.99 },
  ])

  return (
    <>
      <h1>Shop</h1>
      {/*
      <Container>
        {products.map((p)=>(
          <Link  
            to={`/products/${products.id}`}
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
      */}
    </>
  )
}

export default Products
