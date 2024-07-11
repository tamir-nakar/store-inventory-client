import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Inventory from "./pages/inventory";
import Products from "./pages/products";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Inventory />} />
        <Route path="/products" element={<Products />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
 