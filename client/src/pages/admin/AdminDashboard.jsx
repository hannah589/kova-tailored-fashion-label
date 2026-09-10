import { useState, useEffect } from "react"
import { getAllProducts, deleteProduct, updateProduct } from "../../api/products"
import ProductForm from "../../components/features/ProductForm";

function AdminDashboard() {
 
  //Get All Product
  const [products, setProducts] = useState([]);

  useEffect(()=>{
    async function fetchAllProducts(){
      const data = await getAllProducts();
      setProducts(data);
    }
    fetchAllProducts();
  },[])

  return (
    <>
      <h1>Admin Dashboard</h1>
      <ProductForm />

      
      <section>
        <h2>Products</h2>
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>${product.price}</td>
              <td>{product.stock}</td>
              <td>
                <button onClick={() => deleteProduct(product.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </section>
      
    </>
  )
}

export default AdminDashboard
