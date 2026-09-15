import { useParams } from "react-router-dom";

function ProductDetails() {
  const { id } = useParams();

  return (
    <>
      <h1>Product details</h1>
      <p>{id}</p>
    </>
  )
}

export default ProductDetails
