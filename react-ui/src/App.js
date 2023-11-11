import { Route, BrowserRouter, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import Protected from "./components/Protected";
import Login from "./components/login/Login";
import BackOffice from "./pages/backOffice/BackOffice";
import ProductList from "./components/sidePanelBackOffice/objectsList/ProductList";
import ProductForm from "./components/sidePanelBackOffice/objectsForm/ProductForm";
import UserList from "./components/sidePanelBackOffice/objectsList/UserList";
import UserForm from "./components/sidePanelBackOffice/objectsForm/UserForm";
import ReviewList from "./components/sidePanelBackOffice/objectsList/ReviewList";
import ReviewForm from "./components/sidePanelBackOffice/objectsForm/ReviewForm";
import CategoryList from "./components/sidePanelBackOffice/objectsList/CategoryList";
import CategoryForm from "./components/sidePanelBackOffice/objectsForm/CategoryForm";
import OrderList from "./components/sidePanelBackOffice/objectsList/OrderList";
import OrderForm from "./components/sidePanelBackOffice/objectsForm/OrderForm";
import Home from "./pages/home/Home";
import Product from "./pages/product/Product";
import ProductDetails from "./pages/productDetails/ProductDetails";
import Footer from "./components/footer/Footer";
import Welcome from "./pages/backOffice/Welcome";
import NotFound from "./pages/NotFound";

function App() {
  const expirationTimeToken = localStorage.getItem("site-token-expiration");
  const currentTime = new Date().getTime();

  if (currentTime > parseInt(expirationTimeToken, 10)) {
    localStorage.clear();
  }

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        {" "}
        <Route path="*" element={<NotFound />} />{" "}
        {/* Catch-all route for 404 */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<UserForm />} />
        <Route
          path="/backoffice"
          element={
            <Protected>
              <BackOffice />
            </Protected>
          }
        >
          <Route path="product" element={<ProductList />} />
          <Route path="product/new" element={<ProductForm />} />
          <Route path="product/edit/:id" element={<ProductForm />} />
          <Route path="user" element={<UserList />} />
          <Route path="user/new" element={<UserForm />} />
          <Route path="user/edit/:id" element={<UserForm />} />
          <Route path="review" element={<ReviewList />} />
          <Route path="review/new" element={<ReviewForm />} />
          <Route path="review/edit/:id" element={<ReviewForm />} />
          <Route path="category" element={<CategoryList />} />
          <Route path="category/new" element={<CategoryForm />} />
          <Route path="category/edit/:id" element={<CategoryForm />} />
          <Route path="order" element={<OrderList />} />
          <Route path="order/new" element={<OrderForm />} />
          <Route path="order/edit/:id" element={<OrderForm />} />
          <Route path="welcome" element={<Welcome />} />
        </Route>
        <Route path="/" element={<Home />} />
        <Route path="/products/:categoryID" element={<Product />} />
        <Route
          path="/products/details/:productID"
          element={<ProductDetails />}
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
