import styles from './dashboard.module.css';

function ProductTable({ data, onEdit, onDelete }) {
  if (!data || data.length === 0) {
    return <p className={styles.textMuted}>No records found.</p>;
  }

  return (
    <div className={styles.tableContainer}>
      <table className={styles.dataTable}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Image</th>
            <th>Description</th>
            <th>Price</th>
            <th>Sale Price</th>
            <th>Gender</th>
            <th>Category</th>
            <th>SKU</th>
            <th>Size</th>
            <th>Color</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td style={{ fontWeight: 500 }}>{item.name}</td>
              <td>
                {item.image ? (
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} 
                  />
                ) : (
                  <span className={styles.textMuted}>No imageY</span>
                )}
              </td>
              <td 
                className={styles.textMuted} 
                style={{ maxWidth: '150px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                title={item.description}
              >
                {item.description || '—'}
              </td>
              <td>${item.price}</td>
              <td>{item.salePrice ? `$${item.salePrice}` : '—'}</td>
              <td>{item.gender || '—'}</td>
              <td>{item.category || '—'}</td>
              <td>{item.sku || '—'}</td>
              <td>{item.size || '—'}</td>
              <td>{item.color || '—'}</td>
              <td>{item.stock}</td>
              <td className={styles.textRight}>
                <button onClick={() => onEdit(item)} className={styles.actionBtnEdit}>
                  Edit
                </button>
                <button onClick={() => onDelete(item.id)} className={styles.actionBtnDelete}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductTable;