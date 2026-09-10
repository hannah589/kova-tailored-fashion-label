import { Routes, Route } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import Layout from "./layouts/Layout";
import Home from './pages/Home'
import Products from './pages/Products'
import ProductDetails from './pages/ProductDetails'
import Wishlist from "./Wishlist";
import Login from './pages/SignIn'
import SignUp from './pages/SignUp'
import NotFound from './pages/NotFound'
import AdminDashboard from "./pages/admin/AdminDashboard";
import ProtectedRoute from "./components/features/ProtectedRoute"

function AuthStatus(){
  const {isLoggedIn, user, logout} = useAuth();

  if (!isLoggedIn){
    return <span className='authStatus'>You are not logged in</span>;
  }

  return (
    <span className='authStatus'>
      Logged in as {user.name}
      <button onClick={logout}>Log Out</button>
    </span>
  )
}

function App() {

  return (
    <Routes>
      {/*Wrap Layout component around route pages */}
      <Route element={<Layout />}> 
        <Route path="/" element={<Home />} /> 
        <Route path="/shop" element={<Products />} />
        <Route path="/shop/:id" element={<ProductDetails />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/admin" element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        } />
      </Route>
    </Routes>
  )
}

export default App