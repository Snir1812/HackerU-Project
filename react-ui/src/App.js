import { Route, BrowserRouter, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import Protected from "./components/Protected";
import Login from "./components/login/Login";

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
              <div>back office</div>
            </Protected>
          }
        ></Route>
        <Route path="/" element={<div>Home</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
