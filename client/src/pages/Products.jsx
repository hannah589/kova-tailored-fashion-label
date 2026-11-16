import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
//import { getAllProducts } from "../api/products";
import productAPI from "../api/productAPI";
import { Dropdown, DropdownItem } from "flowbite-react";
import Container from "../components/common/Container";
import ProductCard from "../components/features/ProductCard";

function Products() {
  const navigate = useNavigate();
  const { filter } = useParams();
  const [productsList, setProductsList] = useState([]);

  /*----*/
  useEffect(() => {
    async function fetchProducts() {
      try {
        let res;

        switch (filter) {
          case "sale":
            res = await productAPI.getSaleProducts();
            break;

          case "new":
          case "mens":
          case "womens":
          default:
            res = await productAPI.getAllProducts();
            break;
        }

        setProductsList(res.data);
        console.log(res.data);
      } catch (err) {
        console.log(err);
        navigate("/500");
      }
    }

    fetchProducts();
  }, [filter, navigate]);

  /*----*/

  /*
  useEffect(() => {
    async function fetchAllProducts() {
      try {
        const data = await getAllProducts();
        console.log(data)
        setProductsList(data);
      } catch (err) {
        navigate("/500");
      }
    }

    fetchAllProducts();
  }, [navigate]);
  */

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
      (product) => new Date(product.createdAt) >= thirtyDaysAgo,
    );
  }

  if (filter === "sale") {
    heading = "Sale";
  }

  if (filter === "mens") {
    heading = "Mens";
    filteredProducts = productsList.filter(
      (product) => product.gender === "Mens",
    );
  }

  if (filter === "womens") {
    heading = "Womens";
    filteredProducts = productsList.filter(
      (product) => product.gender === "Womens",
    );
  }

  return (
    <>
      <div className="pageHeader">
        <h2>{heading}</h2>
        <div className="flex justify-between btnlink">
          <button>FILTER</button>
          <Dropdown label="SORT" inline className="relative z-50">
            <DropdownItem>Featured</DropdownItem>
            <DropdownItem>New In</DropdownItem>
            <DropdownItem>Best Selling</DropdownItem>
            <DropdownItem>Price: Low to High</DropdownItem>
            <DropdownItem>Price: High to Low</DropdownItem>
          </Dropdown>
        </div>
      </div>

      <section>
        <Container>
          {filteredProducts.map((product) => (
            <Link
              to={`/products/${product.id}`}
              key={product.id}
              style={{ display: "block", width: "100%" }}
            >
              <ProductCard
                name={product.name}
                description={product.description}
                price={product.price}
                salePrice={product.salePrice}
                image={product.image}
              />
            </Link>
          ))}
        </Container>
      </section>
    </>
  );
}

export default Products;
