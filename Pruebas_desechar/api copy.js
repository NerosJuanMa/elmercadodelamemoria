const API_URL = "http://localhost:3000/api";

export const getProductos = async () => {
  const res = await fetch(`${API_URL}/productos`);
  return res.json();
};