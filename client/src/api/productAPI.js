//Server side api calls
//custom axios set up in the api file
import api from "./api";

function createProduct(data){
  return api.post('/products', data);
};

function getAllProducts(){
  return api.get('/products');
};

function getSaleProducts(){
  return api.get('/products/sale');
};

function getProductById(id) {
  return api.get(`/products/${id}`);
}

function updateProduct(id, data) {
  return api.put(`/products/${id}`, data);
}

function deleteProduct(id) {
  return api.delete(`/products/${id}`);
}

const productAPI = {
  createProduct, 
  getAllProducts,
  getSaleProducts,
  getProductById,
  updateProduct,
  deleteProduct,
}

export default productAPI;

