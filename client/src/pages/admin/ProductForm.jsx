import styles from "./productForm.module.css";
import Button from "../../components/common/Button";

function ProductForm({
  formData,
  onChange,
  onSubmit,
  onCancel,
  onImageChange,
  imagePreview,
  isEditing,
}) {

  function handlePriceChange(e) {
  const { name, value } = e.target;

  if (value !== "") {
    onChange({
      target: {
        name,
        value: Number(value).toFixed(2),
      },
    });
  }
}

  return (
    <div className={styles.form}>

      <h2>{isEditing ? "Edit Product" : "Create New Product"}</h2>

      <form onSubmit={onSubmit}>
        <div className={styles.formGrid}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Name*</label>
            <input
              type="text"
              id="name"
              placeholder="Name"
              name="name"
              value={formData.name}
              onChange={onChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label>Gender*</label>
            <select name="gender" value={formData.gender} onChange={onChange}>
              <option value="">Select Gender</option>
              <option value="Mens">Mens</option>
              <option value="Womens">Womens</option>
              <option value="Unisex">Unisex</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label>Category*</label>
              <select name="category" value={formData.category} onChange={onChange}>
                <option value="">Select Category</option>
                <option value="Clothing">Clothing</option>
                <option value="Shoes">Footwear</option>
                <option value="Accessories">Accessories</option>
            </select>
          </div>

          <div className={styles.priceGroup}>
            <div className={styles.formGroup}>
              <label>Price*</label>
              <div className={styles.priceInput}>
                <span>$</span>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={onChange}
                  min="0"
                  step="0.01"
                  onBlur={handlePriceChange}
                  required
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label>Sale Price</label>
              <div className={styles.priceInput}>
                <span>$</span>
                <input
                  type="number"
                  name="salePrice"
                  value={formData.salePrice}
                  onChange={onChange}
                  min="0"
                  step="0.01"
                  onBlur={handlePriceChange}
                />
              </div>
            </div>
          </div>


          <div className={styles.formGroup}>
            <label>SKU*</label>
            <input
              type="text"
              name="sku"
              value={formData.sku}
              onChange={onChange}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Size</label>
            <select name="size" value={formData.size} onChange={onChange}>
              <option value="">Select Size</option>
              <option value="XS">XS</option>
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label>Color</label>
            <input
              type="text"
              name="color"
              value={formData.color}
              onChange={onChange}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Stock*</label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={onChange}
              min="0"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label>Description</label>
            <textarea
              name="description"
              rows="5"
              value={formData.description}
              onChange={onChange}
            />
          </div>

          <div className={styles.formGroup}>
            <h3>Product Image</h3>

            <input
              type="file"
              onChange={onImageChange}
            />

            <small>Maximum file size: 5MB</small>

            {imagePreview &&
              <img
                src={imagePreview}
                alt="Product preview"
                className={styles.imagePreview}
              />
            }
          </div>
        </div>

        <div className={styles.formActions}>
          <Button type="submit" className={styles.btnSuccess}>
            {isEditing ? "Save Changes" : "Create Product"}
          </Button>

          <Button
            type="button"
            onClick={onCancel}
            className={styles.btnSecondary}
          >
            Cancel
          </Button>
        </div>

      </form>
    </div>
  );
}

export default ProductForm;
