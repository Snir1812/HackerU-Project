import { Route, BrowserRouter, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import Protected from "./components/Protected";
import Login from "./components/login/Login";
import BackOffice from "./pages/backOffice/BackOffice";
import ProductList from "./components/sidePanelBackOffice/ObjectLists/ProductList";
import ProductForm from "./components/ProductForm";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
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
        </Route>
        <Route path="/" element={<div>Home</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
