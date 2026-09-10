import { useState } from "react";
import { createProduct, updateProduct } from "../../api/products";

function ProductForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    const productData = {
      name: name,
      description: description,
      category: category,
      price: Number(price),
      stock: Number(stock)
    };

    try {
      const id = await createProduct(productData);

      console.log("Product created:", id);

      // Clear form
      setName("");
      setDescription("")
      setCategory("")
      setPrice("");
      setStock("");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <form onSubmit={handleSubmit}>

      <div className="input-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          required
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="input-group">
        <label htmlFor="description">Description</label>
        <input
          type="text"
          id="description"
          placeholder="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="input-group">
        <label htmlFor="price">Price</label>
        <input
          type="number"
          id="price"
          required
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>

      <div className="input-group">
        <label htmlFor="category">Category</label>
        <input
          type="text"
          id="category"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      </div>

      <div className="input-group">
        <label htmlFor="stock">Stock</label>
        <input
          type="number"
          id="stock"
          required
          placeholder="Stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
        />
      </div>

    <div>
      <button type="submit">Create Product</button>
      <button type="submit">Update Product</button>
    </div>

    </form>
  );
}

export default ProductForm;