import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CartProvider } from "../../context/CartContext";
import Layout from "../../layout/Layout";
import Cart from "../../pages/Cart";
import Home from "../../pages/Home";
import Login from "../../pages/Login";
import Product from "../../pages/Product";
import Profile from '../../pages/Profile';
import ProtectedRoute from "../../pages/ProtectedRoute";
import SearchResults from "../../pages/SearchResults";
import CategoryPage from '../../pages/CategoryPage';
import PurchaseOrder from "../../pages/PurchaseOrder";
import WishList from "../../pages/WishList";
import Settings from "../../pages/Settings";

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/product/:productId" element={<Product />} />
            <Route path="/category/:categoryId" element={<CategoryPage />} />
            <Route path="/profile"
              element={
                <ProtectedRoute redirectTo="/login" allowedRoles={["admin", "customer", "Cliente"]}>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route path="/orders"
              element={
                <ProtectedRoute>
                  <PurchaseOrder></PurchaseOrder>
                </ProtectedRoute>
              }
            />
            <Route path="/wishlist"
              element={
                <ProtectedRoute>
                  <WishList></WishList>
                </ProtectedRoute>
              }
            />
            <Route path="/settings"
              element={
                <ProtectedRoute>
                  <Settings></Settings>
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<div>Ruta no encontrada</div>} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </CartProvider>
  );
};

export default App;
