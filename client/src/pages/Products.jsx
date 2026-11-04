import { Link, useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { getAllProducts } from '../api/products';
//import { products } from "../data/products";
import { Dropdown, DropdownItem } from "flowbite-react";
import Container from '../components/common/Container'
import ProductCard from '../components/features/ProductCard'

function Products() {
  const { filter } = useParams();

  const navigate = useNavigate();

  const [productsList, setProductsList] = useState([]);

  useEffect(() => {
    async function fetchAllProducts(){
      try {
        const data = await getAllProducts();
        setProductsList(data);
      } catch (err) {
        console.error(err);
        navigate("/500")
      }
    }

    fetchAllProducts();
  },[navigate])

  let filteredProducts = productsList;
  let heading = "Shop All";

  //create a date var for 30 days ago
  const thirtyDaysAgo = new Date();
  //set thirtyDaysAgo as = (today's date - 30 days)
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  //check url for new
  if (filter === "new") {
    //change "Shop All" heading to "New"
    heading = "New";

    //go through every product in the products array
    filteredProducts = productsList.filter(
      //.toDate() converts the Firestore Timestamp into a JavaScript Date object.
      (product) => product.createdAt?.toDate() >= 
      //filter out the product created on or after the date from 30 days ago
      thirtyDaysAgo
    );
  }

  if (filter === "sale") {
    heading = "Sale";
    filteredProducts = productsList.filter(
      (product) => product.salePrice > 0
    );
  }

  if (filter === "mens") {
    heading = "Mens";
    filteredProducts = productsList.filter(product => product.gender === "men");
  }

  if (filter === "womens") {
    heading = "Womens";
    filteredProducts = productsList.filter(product => product.gender === "women");
  }

  return (
    <>
      <section className='pageHeader'>
        <h2>{heading}</h2>
        <div>
          <button>FILTER</button>
          <Dropdown label="SORT" inline className='flex'>
            <DropdownItem>Featured</DropdownItem>
            <DropdownItem>New In</DropdownItem>
            <DropdownItem>Best Selling</DropdownItem>
            <DropdownItem>Price: Low to High</DropdownItem>
            <DropdownItem>Price: High to Low</DropdownItem>
          </Dropdown>
  
        </div>
      </section>
  
      <section>
        <Container>
          {filteredProducts.map((product) => (
            <Link
              to={`/products/${product.id}`}
              key={product.id}
              style={{display: "block", width: "100%"}}
            >
              <ProductCard
                image={product.image}
                name={product.name}
                price={product.price}
              />
            </Link>
          ))}
        </Container>
      </section>
    </>
  )
}

export default Products
