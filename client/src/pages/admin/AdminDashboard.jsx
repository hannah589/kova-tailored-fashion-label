import { useState, useEffect } from "react";
import ProductForm from "./ProductForm";
import ProductTable from "./ProductTable";
import styles from "./dashboard.module.css";
import productAPI from "../../api/productAPI";

const initialFormData = {
  name: "",
  description: "",
  price: "",
  salePrice: "",
  gender: "",
  category: "",
  sku: "",
  size: "",
  color: "",
  stock: "",
};

function AdminDashboard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  // GET ALL PRODUCTS
  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      setLoading(true);
      setError("");

      const result = await productAPI.getAllProducts();
      setData(result.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  // HANDLE FORM INPUTS
  function handleChange(e) {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  }

  // HANDLE IMAGE PREVIEW
  function handleImageChange(e) {
    const file = e.target.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Image must be smaller than 5MB.");
      return;
    }

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
    setError("");
  }

  // RESET FORM
  function resetForm() {
    setFormData(initialFormData);
    setImageFile(null);
    setImagePreview("");
    setCurrentId(null);
    setIsEditing(false);
    setShowForm(false);
  }

  // ADD PRODUCT
  function handleAddNew() {
    resetForm();
    setShowForm(true);
  }

  // EDIT PRODUCT
  function handleEditClick(item) {
    setIsEditing(true);
    setCurrentId(item.id);

    setFormData({
      name: item.name || "",
      description: item.description || "",
      price: item.price ?? "",
      salePrice: item.salePrice ?? "",
      gender: item.gender || "",
      category: item.category || "",
      sku: item.sku || "",
      size: item.size || "",
      color: item.color || "",
      stock: item.stock ?? "",
    });

    setImagePreview(item.image || "");
    setShowForm(true);
  }

  // CREATE OR UPDATE PRODUCT
 
async function handleSubmit(e) {
  e.preventDefault();

  console.log("HANDLE SUBMIT FIRED");
  console.log("IS EDITING:", isEditing);
  console.log("PRODUCT DATA:", formData);


  try {
    setError("");
    setSuccess("");

    // Convert numeric fields before sending to backend
    const productData = {
      ...formData,
      price: Number(formData.price),
      salePrice: formData.salePrice === "" ? null : Number(formData.salePrice),
      stock: Number(formData.stock),
    };

    // Send product to backend.
    if (isEditing) {
      await productAPI.updateProduct(currentId, productData);
      setSuccess(`Product ID: ${currentId} updated`);
    } else {
      await productAPI.createProduct(productData);
      setSuccess("Product created successfully");
    }

    await loadData();

    resetForm();

  } catch (err) {
    console.error("Product submission failed:", err);
    setError(err.response?.data?.message || err.message);
  }
}


  // DELETE PRODUCT
  async function handleDelete(id) {
    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }

    try {
      setError("");
      setSuccess("");

      await productAPI.deleteProduct(id);

      setData(data.filter((item) => item.id !== id));

      setSuccess(`Product ID: ${id} deleted`);
    } catch (err) {
      setError(err.message);
    }
  }

  if (loading) return <p>Loading dashboard...</p>;

  return (
    <div className={styles.dashboardContainer}>

      <div className={styles.dashboardHeader}>
        <h1>Admin Dashboard</h1>

        <button onClick={handleAddNew} className={styles.btnPrimary}>
          + Add New Product
        </button>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {showForm && (
        <ProductForm
          formData={formData}
          onChange={handleChange}
          onSubmit={handleSubmit}
          onCancel={resetForm}
          onImageChange={handleImageChange}
          imagePreview={imagePreview}
          isEditing={isEditing}
        />
      )}
      
      {success && <p style={{ color: "green" }}>{success}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <ProductTable
        data={data}
        onEdit={handleEditClick}
        onDelete={handleDelete}
      />

    </div>
  );
}

export default AdminDashboard;
