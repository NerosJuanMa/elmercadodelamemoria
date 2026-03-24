import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Pedido from "./pages/Pedido";
import Items from "./pages/Items";
import Admin from "./pages/Admin";


export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="Pedido" element={<Pedido />} />
        <Route path="Items" element={<Items />} />
        <Route path="Admin" element={<Admin />} />
      </Route>
    </Routes>
  );
}