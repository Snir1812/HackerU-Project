import { Route, BrowserRouter, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<div>Login</div>}></Route>
        <Route path="/backoffice" element={<div>back office</div>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
