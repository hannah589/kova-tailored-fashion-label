import { Routes, Route } from 'react-router-dom'
import Layout from "./layouts/Layout";
import Home from './pages/Home'
import Products from './pages/Products'
import ProductDetails from './pages/ProductDetails'
import Login from './pages/SignIn'
import SignUp from './pages/SignUp'
import NotFound from './pages/NotFound'
import ServerError from './pages/ServerError';
import AdminDashboard from "./pages/admin/AdminDashboard";
import Wishlist from "./pages/Wishlist";
import Returns from "./pages/Returns";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}> 
        <Route path="/" element={<Home />} /> 
        <Route path="/shop" element={<Products />} />
        <Route path="/shop/:filter" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/500" element={<ServerError />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/returns" element={<Returns />} />
      </Route>
    </Routes>
  )
}

export default App