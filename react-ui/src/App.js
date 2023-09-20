import { Route, BrowserRouter, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import Protected from "./components/Protected";
import Login from "./components/login/Login";
import BackOffice from "./pages/backOffice/BackOffice";
import ProductList from "./components/sidePanelBackOffice/objectsList/ProductList";
import ProductForm from "./components/sidePanelBackOffice/objectsForm/ProductForm";
import UserList from "./components/sidePanelBackOffice/objectsList/UserList";
import UserForm from "./components/sidePanelBackOffice/objectsForm/UserForm";

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
          <Route path="user" element={<UserList />} />
          <Route path="user/new" element={<UserForm />} />
          <Route path="user/edit/:id" element={<UserForm />} />
        </Route>
        <Route path="/" element={<div>Home</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
